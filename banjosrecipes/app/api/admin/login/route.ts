import { allowedOrigin, backend, configured, json, OWNER_EMAIL, unavailable, SESSION_COOKIE, cookieOptions } from "@/lib/admin-server"
export async function POST(request: Request) {
 if(!allowedOrigin(request))return json({error:"Request not allowed."},403)
 if(!configured())return unavailable()
 try {
  const {password}=await request.json()
  if(typeof password!=="string" || password.length===0 || password.length>1024)return json({error:"Enter your password."},400)
  const response=await backend("/auth/v1/token?grant_type=password",{method:"POST",body:JSON.stringify({email:OWNER_EMAIL,password})})
  if(!response.ok)return json({error:response.status===429?"Too many attempts. Please wait and try again.":"Couldn’t sign in. Check your owner account password."},response.status===429?429:401)
  const session=await response.json()
  if(!session.access_token || !session.user?.email_confirmed_at || session.user?.email?.toLowerCase()!==OWNER_EMAIL)return json({error:"Owner access required."},403)
  const result=json({ok:true})
  result.cookies.set(SESSION_COOKIE,session.access_token,{...cookieOptions,maxAge:Math.max(1,Math.min(Number(session.expires_in)||3600,3600))})
  return result
 }catch{return json({error:"Couldn’t sign in. Please try again."},502)}
}
