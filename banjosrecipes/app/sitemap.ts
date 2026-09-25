import type { MetadataRoute } from "next"
import { recipes } from "@/data/recipes"
import { RECIPE_SITE_URL } from "@/lib/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: RECIPE_SITE_URL },
    { url: `${RECIPE_SITE_URL}/recipes` },
    ...recipes.map(({ slug }) => ({
      url: `${RECIPE_SITE_URL}/recipes/${slug}`,
    })),
  ]
}
