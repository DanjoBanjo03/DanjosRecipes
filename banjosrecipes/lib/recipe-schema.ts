import type { Recipe } from "@/data/recipes"
import { macroValues, nutrition } from "@/data/nutrition"
import { convertedIngredient } from "@/lib/units"
import { RECIPE_SITE_URL } from "@/lib/site-url"

export function recipeSchema(recipe: Recipe) {
  const url = `${RECIPE_SITE_URL}/recipes/${recipe.slug}`
  const macros = macroValues(recipe.slug, recipe.baseServings, recipe.baseServings, false)
  const grams = (value: number) => `${value > 0 && value < 1 ? "<1" : Math.round(value)} g`

  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "@id": `${url}#recipe`,
    url,
    mainEntityOfPage: url,
    name: recipe.title,
    description: recipe.description,
    recipeCategory: recipe.category,
    recipeYield: `${recipe.baseServings} servings`,
    prepTime: `PT${recipe.prepMinutes}M`,
    cookTime: `PT${recipe.cookMinutes}M`,
    // Include marinating, chilling and other resting time in the total.
    totalTime: `PT${recipe.prepMinutes + recipe.cookMinutes + recipe.restMinutes}M`,
    recipeIngredient: recipe.ingredients
      .filter((ingredient) => !ingredient.heading)
      .map((ingredient) => convertedIngredient(ingredient, 1, "imperial")),
    recipeInstructions: recipe.steps.map((step) => ({
      "@type": "HowToStep",
      text: step.replace(/^\d+\)\s*/, ""),
    })),
    ...(macros ? {
      nutrition: {
        "@type": "NutritionInformation",
        servingSize: "1 serving",
        calories: `${Math.round(macros.calories / 5) * 5} calories`,
        carbohydrateContent: grams(macros.carbs),
        fatContent: grams(macros.fat),
        proteinContent: grams(macros.protein),
        description: `Estimated nutrition per serving. ${nutrition[recipe.slug].assumptions}`,
      },
    } : {}),
  }
}

export function recipeJsonLd(recipe: Recipe) {
  // Prevent recipe text containing HTML from closing the JSON-LD script element.
  return JSON.stringify(recipeSchema(recipe)).replace(/</g, "\\u003c")
}
