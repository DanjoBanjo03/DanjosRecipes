"use client"
import Link from "next/link"
import { useState } from "react"
import { recipes } from "@/data/recipes"
import { useChefsChoice } from "@/lib/chefs-choice"
const categories = ["All recipes", "Mains", "Soups", "Sauces & sides", "Desserts"]
const symbols: Record<string,string> = { Mains: "◒", Soups: "◡", "Sauces & sides": "✳", Desserts: "✺" }
export default function Home() {
  const { choice } = useChefsChoice()
  const [query,setQuery] = useState("")
  const [category,setCategory] = useState("All recipes")
  const visible = recipes.filter(r => (category === "All recipes" || r.category === category) && `${r.title} ${r.ingredients.map(i=>i.name).join(" ")} ${r.steps.join(" ")}`.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>Number(b.slug===choice)-Number(a.slug===choice))
  return <main className="container">
    <section className="hero"><div><p className="eyebrow">THE PERSONAL RECIPE COLLECTION</p><h1>Good food.<br/><em>Kept close.</em></h1><p className="intro">A little collection of things worth making.<br/>From everyday favourites to something sweet.</p><a className="primary" href="#collection">Find something to cook <span>↗</span></a></div><div className="heroArt" aria-hidden="true"><div className="orbit"><span className="orbitText">FROM THE RECIPE NOTEBOOK</span><div className="plate"><div className="plateInner"><span>Made<br/><i>to be shared.</i></span><b>✳</b></div></div><span className="artTag">15 recipes & counting</span></div></div></section>
    <section id="collection" className="collection"><div className="sectionHead"><div><p className="eyebrow">YOUR KITCHEN, COLLECTED</p><h2>The recipe notebook<span>15</span></h2></div><label className="search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search recipes or ingredients" aria-label="Search recipes or ingredients"/></label></div>
    <div className="filterRow"><div className="filters" aria-label="Recipe categories">{categories.map(c=><button key={c} aria-pressed={category===c} className={category===c?"active":""} onClick={()=>setCategory(c)}>{c}</button>)}</div><span className="count" aria-live="polite">{visible.length} recipes</span></div>
    <div className="recipeGrid">{visible.map(r=><Link key={r.slug} href={`/recipes/${r.slug}`} className={`recipeCard tone${categories.indexOf(r.category)} ${r.slug===choice?"chefSelected":""}`} >{r.slug===choice&&<span className="chefRibbon">Chef’s choice</span>}<div className="cardVisual" aria-hidden="true"><span className="cardIndex">NO. {String(r.number).padStart(2,"0")}</span><div className="foodSymbol">{symbols[r.category]}</div><span className="visualLabel">THE RECIPE COLLECTION</span></div><div className="cardBody"><p className="eyebrow">{r.category}</p><h3>{r.title}</h3><div className="cardBottom"><span>{r.note ? "Suggested details" : "From the notebook"}</span><span className="arrow" aria-hidden="true">↗</span></div></div></Link>)}</div>
    {visible.length===0&&<div className="empty"><h3>No recipes found</h3><p>Try a different ingredient or category.</p><button className="primary" onClick={()=>{setQuery("");setCategory("All recipes")}}>Show all recipes</button></div>}
    </section><aside className="notebookNote"><span aria-hidden="true">✳</span><div><h3>A notebook that grows with you.</h3><p>These recipes come from your Food recipes collection. Missing details have been filled in with practical suggestions. Choose how many people you’re cooking for in each recipe.</p></div></aside>
  </main>
}
