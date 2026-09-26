export type DinnerPlan = { slugs: string[]; finishAt: number; started: string[]; done: string[] }
const KEY = "danjo-dinner-plan-v1"
const EVENT = "danjo-dinner-plan-change"
let memory = ""
let memoryOnly = false
export function readPlan() {
  try { if (!memoryOnly) memory = window.localStorage.getItem(KEY) ?? "" } catch { /* Keep this visit’s plan. */ }
  return memory
}
export function parsePlan(raw: string): DinnerPlan | null {
  try {
    const p = JSON.parse(raw)
    if (!p || !Array.isArray(p.slugs) || !p.slugs.length || !p.slugs.every((s: unknown) => typeof s === "string") || !Number.isFinite(p.finishAt) || p.finishAt <= 0 || p.finishAt > 8.64e15) return null
    const valid = (list: unknown): string[] => Array.isArray(list) ? list.filter(s => typeof s === "string" && p.slugs.includes(s)) : []
    return { slugs: [...new Set<string>(p.slugs)], finishAt: p.finishAt, started: valid(p.started), done: valid(p.done) }
  } catch { return null }
}
export function savePlan(plan: DinnerPlan | null) {
  memory = plan ? JSON.stringify(plan) : ""
  try { window.localStorage.setItem(KEY, memory) } catch { memoryOnly = true }
  window.dispatchEvent(new Event(EVENT))
}
export function subscribePlan(update: () => void) {
  window.addEventListener("storage", update)
  window.addEventListener(EVENT, update)
  return () => { window.removeEventListener("storage", update); window.removeEventListener(EVENT, update) }
}
