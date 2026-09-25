import { cookies } from "next/headers"
import { NextResponse } from "next/server"
export const OWNER_EMAIL = "bajenovdan@gmail.com"
export const SESSION_COOKIE = "danjo_owner_session"
export const cookieOptions = { httpOnly:true, secure:process.env.NODE_ENV === "production", sameSite:"strict" as const, path:"/recipe" }
export function configured() { return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) }
export function json(body: unknown, status = 200) {
 return NextResponse.json(body,{status,headers:{"Cache-Control":"private, no-store, max-age=0"}})
}
export function allowedOrigin(request: Request) {
 const origin=request.headers.get("origin")
 const allowed = new Set(["https://danielbajenov.com","https://www.danielbajenov.com","https://danjos-recipes-tvu4.vercel.app"])
 if(process.env.NODE_ENV !== "production") {
  allowed.add(new URL(request.url).origin)
  allowed.add("http://127.0.0.1:3017")
  allowed.add("http://localhost:3000")
 }
 return !!origin && allowed.has(origin) && request.headers.get("content-type")?.includes("application/json")
}
export async function backend(path: string, init: RequestInit = {}, token?: string) {
 if(!configured())throw new Error("Setup required")
 const key=process.env.SUPABASE_ANON_KEY!
 return fetch(`${process.env.SUPABASE_URL!.replace(/\/$/,"")}${path}`,{
  ...init,cache:"no-store",signal:AbortSignal.timeout(10000),
  headers:{apikey:key,Authorization:`Bearer ${token || key}`,"Content-Type":"application/json",...init.headers}
 })
}
export async function ownerSession() {
 const token=(await cookies()).get(SESSION_COOKIE)?.value
 if(!token || !configured()) return null
 const response=await backend("/auth/v1/user",{},token)
 if(!response.ok)return null
 const user=await response.json()
 return user.email?.toLowerCase()===OWNER_EMAIL && user.email_confirmed_at ? token : null
}
export function unavailable() { return json({error:"The shared pick is not connected yet. Please finish the owner setup."},503) }
