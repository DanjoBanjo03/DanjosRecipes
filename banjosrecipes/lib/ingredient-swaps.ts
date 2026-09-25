import type { Ingredient } from "@/data/recipes"
import { convertedIngredient, type UnitSystem } from "@/lib/units"

type Swap = { name: string; note: string; ratio?: number }
// Conservative suggestions for these recipes, not a general baking conversion table.
function matchSwap(name: string, recipeSlug: string): Swap | undefined {
  const n = name.toLowerCase()
  if (/^(water|salt|kosher salt|sea salt|pinch of salt|salt and pepper)/.test(n)) return undefined
  if (/egg|flour|yeast|baking soda|baking powder|ladyfinger|mascarpone|whipping cream|heavy cream/.test(n)) return undefined
  if (/^(olive oil|canola oil|oil|neutral oil|cooking spray)/.test(n)) return { name: "neutral cooking oil (such as canola)", note: "Use the same quantity. Olive oil adds more flavor; use an oil suited to the cooking method." }
  if (/sesame.*oil/.test(n)) return { name: "neutral cooking oil", note: "Use the same quantity; the sauce will lose its toasted sesame flavor." }
  if (/mayonnaise/.test(n)) return { name: "plain Greek yogurt", note: "Use the same quantity in this sauce. Expect a tangier, less rich result; thin with a little water if needed." }
  if (/greek yogurt/.test(n)) return { name: "sour cream", note: "Use the same quantity; the sauce will be richer and less protein-rich." }
  if (/low-fat cheese|reduced-fat cheddar|mozzarella|shredded.*cheese/.test(n)) return { name: "another grated melting cheese", note: "Use the same weight, such as cheddar or Monterey Jack. Choose low-fat cheese if that matters for your recipe." }
  if (/lemon|lime/.test(n)) return { name: n.includes('lemon') ? "lime" : "lemon", note: "Use the same measured amount of juice or zest. If counting whole fruit, start with less juice and taste: fruit sizes and acidity vary." }
  if (/rice vinegar|white wine vinegar|cider vinegar|white vinegar/.test(n)) return { name: "another mild vinegar (rice, white wine or cider)", note: "Start with the same quantity, then taste. Use unseasoned rice vinegar to avoid extra sugar and salt." }
  if (/soy sauce/.test(n)) return { name: "tamari", note: "Use the same quantity. Salt levels vary, so taste before adding more salt." }
  if (/shaoxing/.test(n)) return { name: "dry sherry", note: "Use the same quantity. This is an alcohol-containing substitute." }
  if (/mirin/.test(n)) return { name: "water", note: "Use the same quantity plus a small pinch of sugar, then taste. This replaces liquid and some sweetness, not mirin’s full flavor." }
  if (/^(fresh )?(cilantro|coriander)|chopped fresh cilantro|fresh coriander/.test(n)) return { name: "fresh parsley", note: "Use the same loosely packed volume. The result will be milder and will lack cilantro’s distinctive flavor." }
  if (/fresh basil|fresh mint|fresh parsley/.test(n)) return { name: "another fresh leafy herb you enjoy", note: "Use the same loosely packed volume of parsley or basil. The sauce’s flavor will change; add gradually and taste." }
  if (/green chard|sturdy green/.test(n)) return { name: "spinach", note: "Use the same quantity. Stir it in near the end because it wilts faster than chard." }
  if (/green onion|scallions/.test(n)) return { name: "chives", note: "Use the same chopped volume as a finishing garnish. Add at the end rather than frying them like onion whites." }
  if (/^(medium brown onion|white onion|red onion|large yellow onion|onion peeled)/.test(n)) return { name: "another onion variety of similar size", note: "Use the same quantity. Yellow onions are sweeter when cooked; red or white onions are sharper when raw." }
  if (/garlic cloves|clove garlic|small garlic clove/.test(n)) return { name: "jarred minced garlic", note: "Use about ½ teaspoon per fresh clove. Add gradually; strength differs between brands." }
  if (/bell pepper/.test(n)) return { name: "another color of bell pepper", note: "Use the same quantity. Green peppers are less sweet than red, yellow or orange." }
  if (/jalapeño/.test(n)) return { name: "mild green chili or green bell pepper", note: "Use a similar amount, then taste. Bell pepper removes most of the heat; hotter chilies should be added sparingly." }
  if (/smoked paprika/.test(n)) return { name: "sweet paprika", note: "Use the same quantity. You’ll keep the color but lose the smoky flavor." }
  if (/red pepper flakes|cayenne/.test(n)) return { name: "another ground chili or chili flakes", note: "Start with much less and taste. Heat varies too much for a reliable one-to-one swap." }
  if (/ground beef/.test(n)) return { name: "ground turkey", note: "Use the same weight. It is usually leaner, so avoid overcooking and cook it fully according to its package instructions." }
  if (/flank steak/.test(n) && recipeSlug === "mongolian-beef") return { name: "boneless chicken breast, thinly sliced", note: "Use the same weight. Daniel has tried and enjoyed this variation. Keep the marinade and sauce, but cook the chicken fully through; cooking time and nutrition will differ." }
  if (/flank steak/.test(n)) return { name: "sirloin steak, thinly sliced across the grain", note: "Use the same weight and stir-fry in small batches." }
  if (/boneless.*chicken|chicken breasts/.test(n)) return { name: n.includes('thigh') ? "boneless chicken breast" : "boneless chicken thighs", note: "Use the same weight. Breast is leaner; cooking time changes with cut and thickness. Cook the replacement fully." }
  if (/cornstarch/.test(n) && ['sweet-and-sour-chicken', 'mongolian-beef'].includes(recipeSlug)) return { name: "potato starch", note: "Use the same quantity for this coating. The texture may be slightly different." }
  if (/potato starch/.test(n)) return { name: "cornstarch", note: "Use the same quantity for the chicken coating. It may be slightly less crisp." }
  if (/chicken stock|vegetable broth|dashi/.test(n)) return { name: "another broth or stock", note: "Use the same quantity. Vegetable broth is milder than dashi or chicken stock; adjust salt at the end." }
  if (/low-carb tortillas/.test(n)) return { name: "small flour tortillas of similar size", note: "Use the same count. Warm before rolling; regular tortillas change the carbohydrate estimate." }
  if (/dried ramen noodles/.test(n)) return { name: "dried wheat noodles", note: "Use the same dry weight and follow the replacement noodles’ cooking time." }
  if (/honey/.test(n) && !n.includes('sugar')) return { name: "maple syrup", note: "Use the same quantity in this sauce; expect a slightly different flavor." }
  return undefined
}

export function ingredientSwap(ingredient: Ingredient, recipeSlug: string, multiplier: number, units: UnitSystem) {
  const swap = matchSwap(ingredient.name, recipeSlug)
  if (!swap) return {
    title: "No reliable quick swap listed",
    note: "This ingredient needs a recipe-specific adjustment. Use the original or a recipe designed around what you have.",
  }
  // Only offer computed amounts where the suggestion explicitly uses the same quantity.
  const sameAmount = /Use the same (quantity|weight|count|dry weight|loosely packed volume|chopped volume|measured amount)/.test(swap.note)
  return {
    title: sameAmount && ingredient.amount !== undefined
      ? convertedIngredient({ ...ingredient, name: swap.name }, multiplier, units)
      : swap.name,
    note: swap.note,
  }
}
