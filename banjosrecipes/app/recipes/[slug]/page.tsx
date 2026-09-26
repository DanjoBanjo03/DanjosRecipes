import type { Metadata } from "next"
import { recipeUrl, recipeShareImageUrl } from "@/lib/site-url"
import { notFound } from "next/navigation"
import { recipes } from "@/data/recipes"
import RecipeView from "./RecipeView"
import { recipeJsonLd } from "@/lib/recipe-schema"

type RecipePageProps = { params: Promise<{ slug: string }> }

function getRecipe(slug: string) {
  const recipe = recipes.find((recipe) => recipe.slug === slug)
  if (!recipe) notFound()
  return recipe
}

export function generateStaticParams() {
  return recipes.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const recipe = getRecipe((await params).slug)
  const title = `${recipe.title} Recipe | Danjo Recipes`
  const description = recipe.description
  const image = { url: recipeShareImageUrl(recipe.slug), width: 1200, height: 630, alt: `${recipe.title} — Danjo Recipes`, type: "image/png" }

  return {
    title,
    description,
    openGraph: { title, description, type: "article", siteName: "Danjo Recipes", url: recipeUrl(recipe.slug), images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [{ url: image.url, alt: image.alt }] },
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = getRecipe((await params).slug)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: recipeJsonLd(recipe) }}
      />
      <RecipeView key={recipe.slug} recipe={recipe} />
    </>
  )
}
