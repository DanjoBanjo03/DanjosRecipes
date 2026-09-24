import type { Ingredient } from "../data/recipes"
export const MIN_SERVINGS = 1
export const MAX_SERVINGS = 48
export function validServings(value: string): number | null {
  const n = Number(value)
  return value.trim() && Number.isInteger(n) && n >= MIN_SERVINGS && n <= MAX_SERVINGS ? n : null
}
export function formatAmount(n: number): string {
  const whole = Math.floor(n)
  const fraction = n - whole
  const common: [number,string][] = [[0,""],[1/8,"⅛"],[1/4,"¼"],[1/3,"⅓"],[3/8,"⅜"],[1/2,"½"],[5/8,"⅝"],[2/3,"⅔"],[3/4,"¾"],[7/8,"⅞"]]
  const match = common.find(([value])=>Math.abs(fraction-value)<0.00001)
  if(match) return `${whole || (match[1] ? "" : "0")}${match[1]}`
  return n.toLocaleString("en",{maximumFractionDigits:3, useGrouping:false})
}
export function ingredientText(ingredient: Ingredient, multiplier: number): string {
  if(ingredient.amount===undefined) return ingredient.name
  const amount=formatAmount(ingredient.amount*multiplier)
  const range=ingredient.maximum===undefined?"":`–${formatAmount(ingredient.maximum*multiplier)}`
  return `${amount}${range}${ingredient.unit?` ${ingredient.unit}`:""} ${ingredient.name}`
}
