"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { recipes, type Recipe } from "@/data/recipes"
import { ingredientText, validServings, MIN_SERVINGS, MAX_SERVINGS } from "@/lib/servings"

import { useChefsChoice } from "@/lib/chefs-choice"

function CookingView({recipe}:{recipe:Recipe}) {
 const { choice, choose } = useChefsChoice()
 const [choiceError,setChoiceError]=useState(false)
 const isChoice=choice===recipe.slug
 const [servings,setServings]=useState(recipe.baseServings)
 const [draft,setDraft]=useState(String(recipe.baseServings))
 const [checked,setChecked]=useState<number[]>([])
 const update=(n:number)=>{setServings(n);setDraft(String(n))}
 const multiplier=servings/recipe.baseServings
 const invalid=validServings(draft)===null
 return <main className="container detail">
  <Link className="back" href="/recipes">← Back to the collection</Link>
  <div className="detailTitle"><p className="eyebrow">RECIPE {String(recipe.number).padStart(2,"0")} / {recipe.category}</p><h1>{recipe.title}</h1><p className="intro">From the personal recipe notebook.</p></div>
  <div className="chefControls"><button className={`chefButton ${isChoice?"chosen":""}`} aria-pressed={isChoice} onClick={()=>setChoiceError(!choose(isChoice?"":recipe.slug))}>{isChoice?"★ Chef’s choice · Remove pick":"☆ Make this Chef’s choice"}</button><p aria-live="polite">{choiceError?"Couldn’t save your pick. Please enable browser storage and try again.":isChoice?"Your pick appears first in the collection. Saved in this browser.":"Pick one favourite to feature first in your collection."}</p></div>
  {recipe.note&&<aside className="notice"><b>Completed with suggested details</b><p>{recipe.note}</p></aside>}
  <section className="servingsPanel" aria-labelledby="servings-title">
   <div><p className="eyebrow">MAKE ENOUGH FOR EVERYONE</p><h2 id="servings-title">How many people?</h2><p>Base recipe: {recipe.baseServings} people. {recipe.servingNote}</p></div>
   <div className="servingsControls"><div className="stepper"><button aria-label="One fewer person" disabled={servings===MIN_SERVINGS} onClick={()=>update(servings-1)}>−</button><label><span className="srOnly">Number of people</span><input type="number" min={MIN_SERVINGS} max={MAX_SERVINGS} step="1" value={draft} aria-invalid={invalid} aria-describedby="servings-help" onChange={e=>{setDraft(e.target.value);const n=validServings(e.target.value);if(n!==null)setServings(n)}} onBlur={()=>{if(invalid)setDraft(String(servings))}}/></label><button aria-label="One more person" disabled={servings===MAX_SERVINGS} onClick={()=>update(servings+1)}>+</button></div><button className="resetServings" onClick={()=>update(recipe.baseServings)}>Reset to base recipe</button></div>
   <p id="servings-help" className="servingsHelp">{invalid?"Enter a whole number from 1 to 48. Quantities keep the last valid value.":"Ingredients scale automatically. Keep the cooking times and temperatures; use more pans or cook in batches for larger amounts."}</p>
  </section>
  <div className="cookingGrid"><section className="ingredients"><p className="eyebrow">THE STARTING POINT</p><h2>Ingredients</h2><p className="muted" aria-live="polite">For {servings} {servings===1?"person":"people"} · check off as you go</p><ul>{recipe.ingredients.map((ing,i)=><li key={i}>{ing.heading?<h3>{ing.name}</h3>:<label><input type="checkbox" checked={checked.includes(i)} onChange={()=>setChecked(prev=>prev.includes(i)?prev.filter(n=>n!==i):[...prev,i])}/><span>{ingredientText(ing,multiplier)}</span></label>}</li>)}</ul><p className="muted ingredientHint">For part of an egg, beat it first and measure the fraction. Seasonings listed “to taste” and frying oil stay flexible.</p></section>
  <section className="method"><p className="eyebrow">LET’S MAKE IT</p><h2>The method</h2><ol>{recipe.steps.map((step,i)=><li key={i}><span className="stepNumber">{String(i+1).padStart(2,"0")}</span><p>{step.replace(/^\d+\)\s*/,"")}</p></li>)}</ol>{recipe.source&&<a className="sourceLink" href={recipe.source} target="_blank" rel="noreferrer">Video link from the original notes ↗</a>}{recipe.references.length>0&&<details className="references"><summary>Recipe references</summary>{recipe.references.map(ref=><a key={ref.url} className="sourceLink" href={ref.url} target="_blank" rel="noreferrer">{ref.title} ↗</a>)}</details>}</section></div>
  <div className="detailEnd"><Link href="/recipes">← Explore more recipes</Link><button onClick={()=>window.print()}>Print recipe ↗</button></div>
 </main>
}
export default function RecipePage(){
 const {slug}=useParams<{slug:string}>();const recipe=recipes.find(r=>r.slug===slug)
 if(!recipe)return <main className="container empty"><h1>Recipe not found</h1><Link className="primary" href="/recipes">Back to the collection</Link></main>
 return <CookingView key={recipe.slug} recipe={recipe}/>
}
