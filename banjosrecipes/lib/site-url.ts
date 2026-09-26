// Public recipe location, including the Next.js base path.
export const RECIPE_SITE_URL = "https://www.danielbajenov.com/recipe"

export function recipeUrl(slug: string) {
  return `${RECIPE_SITE_URL}/recipes/${encodeURIComponent(slug)}`
}

export function recipeShareImageUrl(slug: string) {
  return `${recipeUrl(slug)}/share-image`
}
