"use client"
import { useState } from "react"
import { macroValues, nutrition } from "@/data/nutrition"
export function NutritionPanel({slug,baseServings,people}:{slug:string;baseServings:number;people:number}) {
 const [total,setTotal]=useState(false)
 const values=macroValues(slug,baseServings,people,total)
 if(!values)return null
 const grams=(n:number)=>n>0&&n<1?"<1":String(Math.round(n))
 return <section className="nutritionPanel" aria-labelledby="nutrition-title">
  <div className="nutritionHead"><div><p className="eyebrow">A ROUGH GUIDE</p><h2 id="nutrition-title">Estimated nutrition</h2></div><div className="nutritionToggle" aria-label="Nutrition amount"><button aria-pressed={!total} onClick={()=>setTotal(false)}>Per person</button><button aria-pressed={total} onClick={()=>setTotal(true)}>Whole recipe</button></div></div>
  <p className="nutritionBasis" aria-live="polite">{total?`Total for ${people} ${people===1?"person":"people"}`:"Per person · one serving"}</p>
  <dl className="macroGrid" aria-live="polite"><div><dt>Calories</dt><dd>~{Math.round(values.calories/5)*5}<small> kcal</small></dd></div><div><dt>Carbs</dt><dd>{grams(values.carbs)}<small> g</small></dd></div><div><dt>Fat</dt><dd>{grams(values.fat)}<small> g</small></dd></div><div><dt>Protein</dt><dd>{grams(values.protein)}<small> g</small></dd></div></dl>
  <p className="nutritionFootnote">Changing the people count scales the recipe total; nutrition per person stays the same.</p>
  <details className="nutritionNotes"><summary>What’s included in this estimate?</summary><p>{nutrition[slug].assumptions}</p><p>Approximate ingredient-based estimates, not verified nutrition labels. Brands, ingredient sizes and oil absorption change the results. Carbs include fibre; calories are approximated from protein, carbs and fat using the <a href="https://www.nal.usda.gov/programs/fnic" target="_blank" rel="noreferrer">general 4/4/9 method</a>.</p></details>
 </section>
}
