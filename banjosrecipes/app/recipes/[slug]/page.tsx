import type { Metadata } from "next"
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

  return {
    title,
    description,
    openGraph: { title, description, type: "article", siteName: "Danjo Recipes" },
    twitter: { card: "summary", title, description },
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
