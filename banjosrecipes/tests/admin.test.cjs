/* CommonJS harness intentionally emulates modules for isolated route tests. */
/* eslint-disable @typescript-eslint/no-require-imports, @next/next/no-assign-module-variable */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const cache = new Map();
let token = '', fetches = 0, mode = 'owner';
const env = {NODE_ENV:'production',SUPABASE_URL:'https://example.supabase.co',SUPABASE_ANON_KEY:'public-anon-key'};
const email = 'bajenovdan@gmail.com';
function mockFetch(url, init) {
 fetches++;
 let body;
 if(url.endsWith('/user')) body = {email:mode==='visitor'?'visitor@example.com':email,email_confirmed_at:'2026-01-01'};
 else if(url.endsWith('/token?grant_type=password')) body = {access_token:'verified-token',expires_in:3600,user:{email,email_confirmed_at:'2026-01-01'}};
 else if(url.endsWith('/otp')) body = {};
 else body = [{slug: init.method==='PATCH'?JSON.parse(init.body).slug:'pizza'}];
 return Promise.resolve(Response.json(body));
}
function load(file) {
 file = path.resolve(root,file);
 if(cache.has(file))return cache.get(file).exports;
 const module={exports:{}};cache.set(file,module);
 const js=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 const req=name=>{
  if(name==='next/headers')return {cookies:async()=>({get:()=>token?{value:token}:undefined})};
  if(name==='next/server')return {NextResponse:{json:(body,options)=>{const result=Response.json(body,options);result.savedCookies=[];result.cookies={set:(...args)=>result.savedCookies.push(args)};return result}}};
  if(name.startsWith('@/'))return load(name.slice(2)+'.ts');
  return require(name);
 };
 vm.runInNewContext(js,{require:req,module,exports:module.exports,process:{env},fetch:mockFetch,AbortSignal,URL,Response,Request,console});
 return module.exports;
}
const request=(body,origin='https://danielbajenov.com')=>new Request('https://internal.vercel.app/recipe/api/chef-choice',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(body)});
(async()=>{
 const choice=load('app/api/chef-choice/route.ts');
 assert.equal((await choice.PUT(request({slug:'pizza'}))).status,401);
 assert.equal(fetches,0,'Unauthenticated writes must not reach the backend');
 assert.equal((await choice.PUT(request({slug:'pizza'},'https://evil.example'))).status,403);
 assert.equal(fetches,0,'Cross-origin writes must not reach the backend');
 token='visitor-token';mode='visitor';
 assert.equal((await choice.PUT(request({slug:'pizza'}))).status,401);
 token='owner-token';mode='owner';
 assert.equal((await choice.PUT(request({slug:'not-a-recipe'}))).status,400);
 assert.equal((await choice.PUT(request({slug:'pizza'}))).status,200);
 assert.equal((await (await choice.GET()).json()).choice,'pizza');
 assert.equal((await (await choice.PUT(request({slug:''}))).json()).choice,'');
 const code=load('app/api/admin/code/route.ts');
 const before=fetches;
 assert.equal((await code.POST(request({email}))).status,410);
 assert.equal(fetches,before,'Retired endpoints must not trigger email delivery');
 const login=load('app/api/admin/login/route.ts');
 assert.equal((await login.POST(request({password:''}))).status,400);
 assert.equal((await login.POST(request({password:'test'},'https://evil.example'))).status,403);
 const signed=await login.POST(request({password:'test-only-password'}));
 assert.equal(signed.status,200);
 const options=signed.savedCookies[0][2];
 assert.equal(options.httpOnly,true);assert.equal(options.secure,true);assert.equal(options.sameSite,'strict');assert.equal(options.path,'/recipe');assert.equal(options.maxAge,3600);
 const session=load('app/api/admin/session/route.ts');
 const out=await session.DELETE(request({}));assert.equal(out.savedCookies[0][2].maxAge,0);
 delete env.SUPABASE_URL;
 assert.equal((await choice.GET()).status,503);
 assert.equal((await login.POST(request({password:'test'}))).status,503);
 console.log('Passed: anonymous/non-owner rejection, origin validation, slug validation, shared read/write/clear, retired email endpoint, password input, secure cookie, sign-out, missing-config handling. External Supabase and SQL policies still require live validation.');
})().catch(error=>{console.error(error);process.exitCode=1});
