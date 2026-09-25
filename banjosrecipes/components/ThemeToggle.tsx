"use client"
import { useSyncExternalStore } from "react"
import { Icon } from "./Icon"
const KEY = "danjo-theme"
function subscribe(update:()=>void) {
 const sync=()=>{
  try{document.documentElement.dataset.theme=localStorage.getItem(KEY)==="dark"?"dark":"light"}catch{/* Retain the current theme if storage is unavailable. */}
  update()
 }
 window.addEventListener("storage",sync)
 window.addEventListener("danjo-theme-change",update)
 return ()=>{window.removeEventListener("storage",sync);window.removeEventListener("danjo-theme-change",update)}
}
export function ThemeToggle() {
 const dark=useSyncExternalStore(subscribe,()=>document.documentElement.dataset.theme==="dark",()=>false)
 function toggle() {
  const theme=dark?"light":"dark"
  document.documentElement.dataset.theme=theme
  try{localStorage.setItem(KEY,theme)}catch{/* The toggle still works for this visit. */}
  window.dispatchEvent(new Event("danjo-theme-change"))
 }
 return <button type="button" className="themeToggle" aria-label={dark?"Switch to light mode":"Switch to dark mode"} aria-pressed={dark} title={dark?"Light mode":"Dark mode"} onClick={toggle}><Icon name="moon"/></button>
}
