// History reflects views in this browser, not when someone last cooked a recipe.
export function pickSurpriseRecipe<T extends { slug: string }>(
  recipes: readonly T[], recent: readonly string[], random: () => number = Math.random,
): T | undefined {
  if (recipes.length === 0) return undefined
  // Avoid the most recently viewed recipe when another matching option exists.
  const alternatives = recipes.filter(recipe => recipe.slug !== recent[0])
  const candidates = alternatives.length > 0 ? alternatives : recipes
  const weights = candidates.map(recipe => recent.includes(recipe.slug) ? 1 : 3)
  let draw = random() * weights.reduce((sum, weight) => sum + weight, 0)
  for (let i = 0; i < candidates.length; i++) {
    draw -= weights[i]
    if (draw < 0) return candidates[i]
  }
  return candidates[candidates.length - 1]
}
