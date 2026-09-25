import { allowedOrigin, configured, json, ownerSession, SESSION_COOKIE, cookieOptions } from "@/lib/admin-server"
export async function GET() {
 try{return json({configured:configured(),authenticated:Boolean(await ownerSession())})}
 catch{return json({error:"Couldn’t check your sign-in. Please try again."},503)}
}
export async function DELETE(request:Request) {
 if(!allowedOrigin(request))return json({error:"Request not allowed."},403)
 const response=json({ok:true});response.cookies.set(SESSION_COOKIE,"",{...cookieOptions,maxAge:0});return response
}
