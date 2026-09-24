"use client"
import { useSyncExternalStore } from "react"
const KEY = "danjo-chefs-choice"
const EVENT = "danjo-chefs-choice-change"
function read() {
  try { return window.localStorage.getItem(KEY) || "" } catch { return "" }
}
function subscribe(listener: () => void) {
  window.addEventListener("storage", listener)
  window.addEventListener(EVENT, listener)
  return () => {
    window.removeEventListener("storage", listener)
    window.removeEventListener(EVENT, listener)
  }
}
export function useChefsChoice() {
  const choice = useSyncExternalStore(subscribe, read, () => "")
  function choose(slug: string) {
    try {
      if (slug) window.localStorage.setItem(KEY, slug)
      else window.localStorage.removeItem(KEY)
      window.dispatchEvent(new Event(EVENT))
      return true
    } catch { return false }
  }
  return { choice, choose }
}
