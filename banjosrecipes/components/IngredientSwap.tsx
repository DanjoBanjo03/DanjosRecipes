import type { Ingredient } from "@/data/recipes"
import type { UnitSystem } from "@/lib/units"
import { ingredientSwap } from "@/lib/ingredient-swaps"

export function IngredientSwap({ ingredient, recipeSlug, multiplier, units }: {
  ingredient: Ingredient; recipeSlug: string; multiplier: number; units: UnitSystem
}) {
  const swap = ingredientSwap(ingredient, recipeSlug, multiplier, units)
  return <details className="ingredientSwap">
    <summary aria-label={`Need a swap for ${ingredient.name}?`}>Need a swap?</summary>
    <div><strong>{swap.title}</strong><p>{swap.note}</p></div>
  </details>
}
