const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
const api = {}
vm.runInNewContext(ts.transpileModule(fs.readFileSync('data/dietary.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,{exports:api})
const { dietary, matchesDiets, dietLabels } = api
const recipes=JSON.parse(fs.readFileSync('data/recipes.ts','utf8').split('export const recipes: Recipe[] = ')[1])
test('every recipe has reviewed tags and allergen notes',()=>{
 assert.deepEqual(Object.keys(dietary).sort(),recipes.map(r=>r.slug).sort())
 for(const info of Object.values(dietary)) {
  assert.ok(info.checks.length)
  assert.ok(info.tags.every(tag=>dietLabels.includes(tag)))
  if(info.tags.includes('Vegan')) {
   assert.ok(info.tags.includes('Vegetarian'))
   assert.ok(info.tags.includes('Dairy-free'))
  }
 }
})
test('combined filters require every selected diet and unknown recipes fail closed',()=>{
 assert.equal(matchesDiets('guacamole',['Vegan','Gluten-free']),true)
 assert.equal(matchesDiets('shrimp-marinade',['Vegan','Gluten-free']),false)
 assert.equal(matchesDiets('unknown',['Dairy-free']),false)
 assert.equal(matchesDiets('ramen',[]),true)
})
test('conditional alternatives do not appear as unconditional dietary matches',()=>{
 for(const slug of ['miso-soup','sweet-and-sour-chicken','mongolian-beef','korean-popcorn-chicken','crispy-beef-taquitos'])assert.equal(matchesDiets(slug,['Gluten-free']),false)
 assert.equal(matchesDiets('miso-soup',['Vegan']),false)
 assert.equal(matchesDiets('pizza',['Dairy-free']),false)
 assert.equal(matchesDiets('green-sauce',['Dairy-free']),false)
 assert.equal(matchesDiets('green-salad-dressing',['Vegan']),false)
})
