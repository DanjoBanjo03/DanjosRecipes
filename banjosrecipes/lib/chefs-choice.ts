"use client"
import { useEffect, useState } from "react"
// Read-only public view. Editing is only available through the authenticated API.
export function useChefsChoice() {
 const [choice,setChoice]=useState("")
 useEffect(()=>{
  let active=true
  async function refresh() {
   try {
    const response=await fetch("/recipe/api/chef-choice",{cache:"no-store"})
    if(response.ok){const data=await response.json();if(active)setChoice(data.choice||"")}
   }catch{/* Keep the last confirmed pick during a temporary connection failure. */}
  }
  void refresh()
  const interval=window.setInterval(()=>{if(document.visibilityState==="visible")void refresh()},30000)
  window.addEventListener("focus",refresh)
  return ()=>{active=false;window.clearInterval(interval);window.removeEventListener("focus",refresh)}
 },[])
 return {choice}
}
