const {test}=require('node:test')
const assert=require('node:assert/strict')
const fs=require('node:fs')
const vm=require('node:vm')
const ts=require('typescript')
function load(name){const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync(name,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,{exports});return exports}
const {dinnerTimeline,countdown}=load('lib/dinner-timeline.ts')
const {parsePlan}=load('lib/dinner-plan.ts')
test('schedules longest first and includes rest time across dates',()=>{
 const end=Date.parse('2026-09-27T01:00:00Z')
 const recipes=[{slug:'sauce',prepMinutes:10,cookMinutes:0,restMinutes:0},{slug:'dessert',prepMinutes:20,cookMinutes:0,restMinutes:240}]
 const result=dinnerTimeline(recipes,end)
 assert.equal(result[0].recipe.slug,'dessert')
 assert.equal(result[0].startAt,end-260*60000)
 assert.equal(result[1].startAt,end-10*60000)
 assert.equal(recipes[0].slug,'sauce')
})
test('countdown handles hours, rounding and expired timers',()=>{
 assert.equal(countdown(3661000),'1h 1m 01s')
 assert.equal(countdown(1),'0m 01s')
 assert.equal(countdown(-1),'0m 00s')
})
test('restores a plan and rejects corrupted storage',()=>{
 assert.equal(parsePlan('{broken'),null)
 assert.equal(parsePlan('{"slugs":["pizza"],"finishAt":null}'),null)
 const p=parsePlan(JSON.stringify({slugs:['pizza','pizza'],finishAt:100000,started:['pizza','unknown'],done:[]}))
 assert.equal(p.slugs.length,1)
 assert.equal(p.started.join(','),'pizza')
})
