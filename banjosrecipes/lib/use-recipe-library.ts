"use client"
import { useMemo, useSyncExternalStore } from "react"
import { recipes } from "@/data/recipes"
import { parseLibrary, readLibrary, subscribeLibrary, type LibraryList } from "./recipe-library-store"

export function useRecipeLibrary(list: LibraryList) {
  const snapshot = useSyncExternalStore(subscribeLibrary, () => readLibrary(list), () => "[]")
  return useMemo(() => parseLibrary(snapshot).filter((slug) => recipes.some((recipe) => recipe.slug === slug)), [snapshot])
}
