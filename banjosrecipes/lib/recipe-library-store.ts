export type LibraryList = "favorites" | "recent"
export const LIBRARY_EVENT = "danjo-library-change"
const keys = { favorites: "danjo-favorites", recent: "danjo-recent" }
const memoryOnly: Record<LibraryList, boolean> = { favorites: false, recent: false }
const memory: Record<LibraryList, string> = { favorites: "[]", recent: "[]" }

export function readLibrary(list: LibraryList): string {
  if (typeof window === "undefined") return "[]"
  if (memoryOnly[list]) return memory[list]
  try {
    memory[list] = window.localStorage.getItem(keys[list]) ?? "[]"
  } catch { /* Keep this visit usable when browser storage is disabled. */ }
  return memory[list]
}

export function parseLibrary(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw)
    return Array.isArray(value)
      ? [...new Set(value.filter((slug): slug is string => typeof slug === "string" && slug.length > 0))]
      : []
  } catch { return [] }
}

function writeLibrary(list: LibraryList, slugs: string[]) {
  memory[list] = JSON.stringify(slugs)
  try { window.localStorage.setItem(keys[list], memory[list]) } catch { memoryOnly[list] = true }
  window.dispatchEvent(new Event(LIBRARY_EVENT))
}

export function toggleFavorite(slug: string) {
  const current = parseLibrary(readLibrary("favorites"))
  writeLibrary("favorites", current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug])
}

export function recordView(slug: string) {
  const current = parseLibrary(readLibrary("recent"))
  const next = [slug, ...current.filter((item) => item !== slug)].slice(0, 6)
  if (JSON.stringify(current) !== JSON.stringify(next)) writeLibrary("recent", next)
}

export function clearRecent() { writeLibrary("recent", []) }

export function subscribeLibrary(update: () => void) {
  window.addEventListener("storage", update)
  window.addEventListener(LIBRARY_EVENT, update)
  return () => {
    window.removeEventListener("storage", update)
    window.removeEventListener(LIBRARY_EVENT, update)
  }
}
