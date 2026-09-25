import type { Ingredient } from "../data/recipes"
import { ingredientText } from "./servings"
export type UnitSystem = "imperial" | "metric"
// US customary recipe volumes; volume remains volume, including dry ingredients.
const millilitres: Record<string,number> = {cup:236.5882365,cups:236.5882365,tsp:4.92892159375,tbsp:14.78676478125,ml:1,l:1000}
const grams: Record<string,number> = {lb:453.59237,oz:28.349523125,g:1,kg:1000}
function decimal(value:number) {
 return value.toLocaleString("en",{maximumFractionDigits:2,useGrouping:false})
}
export function convertedIngredient(ingredient:Ingredient,multiplier:number,system:UnitSystem) {
 if(ingredient.amount===undefined || !ingredient.unit)return ingredientText(ingredient,multiplier)
 const unit=ingredient.unit.toLowerCase()
 const mass=grams[unit], volume=millilitres[unit]
 if(!mass&&!volume)return ingredientText(ingredient,multiplier)
 if(system==="imperial") {
  if(!["g","kg","ml","l"].includes(unit))return ingredientText(ingredient,multiplier)
  const factor=mass?mass/grams.oz:volume/millilitres.cup
  return ingredientText({...ingredient,amount:ingredient.amount*factor,maximum:ingredient.maximum===undefined?undefined:ingredient.maximum*factor,unit:mass?"oz":"cups"},multiplier)
 }
 const factor=mass||volume
 let low=ingredient.amount*multiplier*factor
 let high=ingredient.maximum===undefined?undefined:ingredient.maximum*multiplier*factor
 const large=low>=1000
 if(large){low/=1000;if(high!==undefined)high/=1000}
 const displayUnit=mass?(large?"kg":"g"):(large?"L":"mL")
 return `${decimal(low)}${high===undefined?"":`–${decimal(high)}`} ${displayUnit} ${ingredient.name}`
}
