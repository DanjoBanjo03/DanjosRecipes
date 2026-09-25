"use client"
import Link from "next/link"
import { DifficultyMeter } from "@/components/DifficultyMeter"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { pickSurpriseRecipe } from "@/lib/surprise-recipe"
import { useRecipeLibrary } from "@/lib/use-recipe-library"
import { clearRecent } from "@/lib/recipe-library-store"
import { recipes } from "@/data/recipes"
import { useChefsChoice } from "@/lib/chefs-choice"
const categories = ["All recipes", "Mains", "Soups", "Sauces & sides", "Desserts", "Meal prep", "Favorites"]
import { Icon, CategoryIcon } from "@/components/Icon"
export default function Home() {
  const router = useRouter()
  const { choice } = useChefsChoice()
  const favorites = useRecipeLibrary("favorites")
  const recent = useRecipeLibrary("recent")
  const recentRecipes = recent.flatMap(slug => recipes.filter(recipe => recipe.slug === slug))
  
  const [query,setQuery] = useState("")
  
  const [category,setCategory] = useState("All recipes")
  
  const visible = recipes
    .filter(r => {
      const matchesCategory =
        category === "All recipes" ||
        (category === "Favorites" ? favorites.includes(r.slug) : category === "Meal prep"
          ? r.mealPrep === true
          : r.category === category)

      const matchesSearch =
        `${r.title} ${r.ingredients.map(i => i.name).join(" ")} ${r.steps.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase())

      return matchesCategory && matchesSearch
    })
    .sort(
      (a, b) =>
        Number(b.slug === choice) - Number(a.slug === choice)
    )

  function surpriseMe() {
    const recipe = pickSurpriseRecipe(visible, recent)
    if (recipe) router.push(`/recipes/${recipe.slug}`)
  }

  return <main className="container">
    <section className="hero"><div><p className="eyebrow">THE PERSONAL RECIPE COLLECTION </p><h1>Good food.<br/><em>Kept close.</em></h1><p className="intro">A little collection of things found and taught.<br/>From everyday favourites to something sweet.</p><a className="primary" href="#collection">Find something to cook <Icon name="arrow"/></a></div><div className="heroArt" aria-hidden="true"><div className="orbit"><span className="orbitText">FROM THE RECIPE NOTEBOOK</span><div className="plate"><div className="plateInner"><span>Made<br/><i>to be shared.</i></span><Icon className="plateIcon"/></div></div><span className="artTag">{recipes.length} recipes & counting</span></div></div></section>
    
    {recentRecipes.length > 0 && <section className="recentRecipes" aria-labelledby="recent-title">
      <div className="recentHeading"><h2 id="recent-title">Recently viewed</h2><button type="button" onClick={clearRecent}>Clear history</button></div>
      <p className="libraryNote">Your last six recipes, saved in this browser.</p>
      <ul>{recentRecipes.map(recipe => <li key={recipe.slug}><Link href={`/recipes/${recipe.slug}`}><span>{recipe.title}</span><Icon name="arrow"/></Link></li>)}</ul>
    </section>}

    <section id="collection" className="collection"><div className="sectionHead"><div><p className="eyebrow">YOUR KITCHEN, COLLECTED</p><h2>The recipe notebook<span>{recipes.length}</span></h2></div><label className="search"><Icon name="search"/><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search recipes or ingredients" aria-label="Search recipes or ingredients"/></label></div>
    
    <div className="filterRow"><div className="filters" aria-label="Recipe categories">{categories.map(c=><button key={c} aria-pressed={category===c} className={category===c?"active":""} onClick={()=>setCategory(c)}>{c}</button>)}</div><span className="count" aria-live="polite">{visible.length} recipes</span></div>
    
    <div className="surpriseRow">
      <button className="surpriseButton" type="button" onClick={surpriseMe} disabled={visible.length === 0} aria-describedby="surprise-help">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="16" cy="8" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="8" cy="16" r="1" fill="currentColor"/><circle cx="16" cy="16" r="1" fill="currentColor"/></svg>
        Surprise me
      </button>
      <p id="surprise-help">{visible.length === 0 ? "Try another filter to find a surprise." : visible.length === 1 ? "One recipe matches — let’s make it." : "A random pick from these recipes, favoring ones you haven’t viewed recently."}</p>
    </div>
    <div className="recipeGrid">{visible.map(r=><Link key={r.slug} href={`/recipes/${r.slug}`} className={`recipeCard tone${categories.indexOf(r.category)} ${r.slug===choice?"chefSelected":""}`} >{r.slug===choice&&<span className="chefRibbon">Chef’s choice</span>}<div className="cardVisual" aria-hidden="true"><span className="cardIndex">NO. {String(r.number).padStart(2,"0")}</span><div className="foodSymbol"><CategoryIcon category={r.category}/></div><span className="visualLabel">THE RECIPE COLLECTION</span></div><div className="cardBody"><p className="eyebrow">{r.category}</p><h3>{r.title}</h3><DifficultyMeter level={r.difficulty} /><div className="cardBottom"><span>{r.note ? "Suggested details" : "From the notebook"}</span><Icon name="arrow" className="arrow"/></div></div></Link>)}</div>
    
    {visible.length===0&&<div className="empty"><h3>{category === "Favorites" && favorites.length === 0 ? "No favorites yet" : "No recipes found"}</h3><p>{category === "Favorites" && favorites.length === 0 ? "Open a recipe and choose Save to favorites. Your favorites stay in this browser." : "Try a different ingredient or category."}</p><button className="primary" onClick={()=>{setQuery("");setCategory("All recipes")}}>Show all recipes</button></div>}
    
    </section>
    <aside className="notebookNote"><Icon className="notebookIcon"/><div><h3>A notebook that grows with you.</h3><p>These recipes come from your Food recipes collection. Missing details have been filled in with practical suggestions. Choose how many people you’re cooking for in each recipe.</p></div></aside>
  </main>
}
