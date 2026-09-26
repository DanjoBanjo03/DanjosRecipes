export type TimedRecipe = { slug: string; prepMinutes: number; cookMinutes: number; restMinutes: number }
export function recipeMinutes(recipe: TimedRecipe) {
  return recipe.prepMinutes + recipe.cookMinutes + recipe.restMinutes
}
export function dinnerTimeline<T extends TimedRecipe>(recipes: readonly T[], finishAt: number) {
  return recipes.map(recipe => ({ recipe, startAt: finishAt - recipeMinutes(recipe) * 60_000 }))
    .sort((a, b) => a.startAt - b.startAt || a.recipe.slug.localeCompare(b.recipe.slug))
}
export function countdown(milliseconds: number) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000))
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor(seconds % 3600 / 60)
  return `${hours ? `${hours}h ` : ""}${minutes}m ${String(seconds % 60).padStart(2, "0")}s`
}
