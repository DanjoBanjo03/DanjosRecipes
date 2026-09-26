import { ImageResponse } from "next/og"
import { recipes } from "@/data/recipes"
import { RECIPE_SITE_URL } from "@/lib/site-url"

export const dynamic = "force-static"
export function generateStaticParams() { return recipes.map(({ slug }) => ({ slug })) }

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const recipe = recipes.find(recipe => recipe.slug === slug)
  if (!recipe) return new Response("Recipe not found", { status: 404 })
  const total = recipe.prepMinutes + recipe.cookMinutes + recipe.restMinutes
  const duration = total < 60 ? `${total} min` : `${Math.floor(total / 60)} hr${total % 60 ? ` ${total % 60} min` : ""}`
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#f8f5ee", color: "#263c2e", padding: "56px 64px", fontFamily: "sans-serif", borderTop: "12px solid #ad302b" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}><span>Danjo Recipes</span><span style={{ color: "#aa4c32" }}>THE RECIPE NOTEBOOK</span></div>
      <div style={{ display: "flex", marginTop: 54, fontSize: 22, color: "#646a5f" }}>{recipe.category.toUpperCase()}</div>
      <div style={{ display: "flex", marginTop: 18, fontSize: recipe.title.length > 30 ? 66 : 82, fontWeight: 700, lineHeight: 1.08, maxWidth: 1050 }}>{recipe.title}</div>
      <div style={{ display: "flex", gap: 28, marginTop: "auto", fontSize: 24 }}>
        <span>{duration} total · estimated</span><span>{recipe.baseServings} servings</span><span>{["Easy", "Medium", "Hard"][recipe.difficulty - 1]}</span>
      </div>
      <div style={{ display: "flex", marginTop: 24, paddingTop: 20, borderTop: "1px solid #d9dccf", fontSize: 20, color: "#646a5f" }}>{RECIPE_SITE_URL.replace("https://", "")}</div>
    </div>,
    { width: 1200, height: 630 },
  )
}
