"use client"
import Link from "next/link"
import { useEffect, useState, type FormEvent } from "react"
import { recipes } from "@/data/recipes"
async function api(path:string,method="GET",body?:unknown) {
 const response=await fetch(`/recipe/api/${path}`,{method,cache:"no-store",headers:{"Content-Type":"application/json"},...(body===undefined?{}:{body:JSON.stringify(body)})})
 const data=await response.json()
 if(!response.ok)throw new Error(data.error||"Something went wrong. Please try again.")
 return data
}
export default function AdminPage() {
 const [loading,setLoading]=useState(true)
 const [ready,setReady]=useState(false)
 const [signedIn,setSignedIn]=useState(false)
 const [password,setPassword]=useState("")
 const [busy,setBusy]=useState(false)
 const [selected,setSelected]=useState("")
 const [saved,setSaved]=useState("")
 const [message,setMessage]=useState("")
 const [error,setError]=useState("")
 const [pickLoaded,setPickLoaded]=useState(false)
 useEffect(()=>{
  let active=true
  api("admin/session").then(async session=>{
   if(!active)return
   setReady(session.configured);setSignedIn(session.authenticated)
   if(session.authenticated){const data=await api("chef-choice");if(active){setSelected(data.choice);setSaved(data.choice);setPickLoaded(true)}}
  }).catch(e=>{if(active)setError(e.message)}).finally(()=>{if(active)setLoading(false)})
  return ()=>{active=false}
 },[])
 async function run(action:()=>Promise<void>) {
  setBusy(true);setError("");setMessage("")
  try{await action()}catch(e){setError(e instanceof Error?e.message:"Please try again.")}
  finally{setBusy(false)}
 }
 async function signIn(event:FormEvent) {
  event.preventDefault()
  await run(async()=>{
   await api("admin/login","POST",{password});setSignedIn(true);setPassword("")
   const data=await api("chef-choice");setSelected(data.choice);setSaved(data.choice);setPickLoaded(true)
  })
 }
 return <main className="container adminPage"><Link className="back" href="/recipes">← Back to the collection</Link><p className="eyebrow">FOR THE COOK BEHIND THE COLLECTION</p><h1>Chef’s desk.</h1><p className="intro">One pick, shared with everyone. Only the owner can change it.</p>
  <section className="adminCard">
   {loading?<p role="status">Checking your sign-in…</p>:!ready?<><h2>One last setup step.</h2><p>Owner sign-in and the shared pick aren’t connected yet. Finish the Supabase setup and add the project settings to Vercel, then reload this page.</p></>:signedIn?<><h2>Your Chef’s choice</h2><p>Choose a recipe to put first for every visitor.</p><label className="adminLabel" htmlFor="pick">Featured recipe</label><select id="pick" disabled={busy||!pickLoaded} value={selected} onChange={e=>setSelected(e.target.value)}><option value="">No featured recipe</option>{recipes.map(r=><option key={r.slug} value={r.slug}>{r.title}</option>)}</select><p className="muted">Currently featured: {recipes.find(r=>r.slug===saved)?.title||"None"}</p><button className="primary" disabled={busy||!pickLoaded} onClick={()=>run(async()=>{const data=await api("chef-choice","PUT",{slug:selected});setSaved(data.choice);setMessage("Saved. New visits see your pick immediately; open pages refresh within 30 seconds.")})}>{busy?"Please wait…":"Save for everyone"}</button>{!pickLoaded&&<button className="primary" disabled={busy} onClick={()=>run(async()=>{const data=await api("chef-choice");setSelected(data.choice);setSaved(data.choice);setPickLoaded(true)})}>Retry loading the pick</button>}<button className="adminTextButton" disabled={busy} onClick={()=>run(async()=>{await api("admin/session","DELETE");setSignedIn(false);setPickLoaded(false);setMessage("Signed out.")})}>Sign out</button></>:<form onSubmit={signIn}><h2>Owner sign-in</h2><p>Enter the password for your recipe owner account.</p><input type="text" name="username" autoComplete="username" value="bajenovdan@gmail.com" readOnly hidden/><label className="adminLabel" htmlFor="password">Password</label><input id="password" name="password" type="password" autoComplete="current-password" required maxLength={1024} value={password} disabled={busy} onChange={e=>setPassword(e.target.value)}/><button type="submit" className="primary" disabled={busy}>{busy?"Signing in…":"Sign in"}</button></form>}
   {error&&<p role="alert" className="adminError">{error}</p>}{message&&<p role="status" className="adminMessage">{message}</p>}
  </section><p className="muted">Visitors can browse freely. Sign-in sessions last up to one hour.</p>
 </main>
}
