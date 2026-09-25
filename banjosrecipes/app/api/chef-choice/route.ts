import { recipes } from "@/data/recipes"
import { allowedOrigin, backend, configured, json, ownerSession, unavailable } from "@/lib/admin-server"
export async function GET() {
 if(!configured())return unavailable()
 try {
  const response=await backend("/rest/v1/chef_choice?id=eq.1&select=slug")
  if(!response.ok)return unavailable()
  const rows=await response.json()
  if(!Array.isArray(rows)||rows.length!==1)return unavailable()
  return json({choice:recipes.some(r=>r.slug===rows[0].slug)?rows[0].slug:""})
 }catch{return unavailable()}
}
export async function PUT(request: Request) {
 if(!allowedOrigin(request))return json({error:"Request not allowed."},403)
 try {
  const token=await ownerSession()
  if(!token)return json({error:"Sign in as the owner to change the pick."},401)
  const {slug}=await request.json()
  if(typeof slug!=="string" || (slug!=="" && !recipes.some(r=>r.slug===slug)))return json({error:"Choose a recipe from the collection."},400)
  const response=await backend("/rest/v1/chef_choice?id=eq.1",{method:"PATCH",headers:{Prefer:"return=representation"},body:JSON.stringify({slug:slug||null})},token)
  if(!response.ok)return json({error:"Couldn’t save the pick. Please try again."},502)
  const rows=await response.json()
  if(!Array.isArray(rows)||rows.length!==1)return json({error:"Couldn’t save the pick. Check the database setup."},503)
  return json({choice:rows[0].slug||""})
 }catch{return json({error:"Couldn’t save the pick. Please try again."},502)}
}
