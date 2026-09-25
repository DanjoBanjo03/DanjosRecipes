import type { MetadataRoute } from "next"
import { RECIPE_SITE_URL } from "@/lib/site-url"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/recipe/api/" },
    sitemap: `${RECIPE_SITE_URL}/sitemap.xml`,
  }
}
