const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const ts = require('typescript')
function load(filename) {
 const exports = {}
 vm.runInNewContext(ts.transpileModule(fs.readFileSync(filename,'utf8'), {
  compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020},
 }).outputText,{exports,require:(name)=>load((name.startsWith('@/') ? path.resolve(name.slice(2)) : path.resolve(path.dirname(filename),name))+'.ts')})
 return exports
}
const {ingredientSwap:swap}=load(path.resolve('lib/ingredient-swaps.ts'))
test('same-quantity substitutions track servings and metric conversion',()=>{
 const result=swap({name:'mayonnaise',amount:1,unit:'cup'},'green-sauce',2,'metric')
 assert.equal(result.title,'473.18 mL plain Greek yogurt')
})
test('coating starch swaps are scoped to suitable recipes',()=>{
 assert.match(swap({name:'cornstarch',amount:1,unit:'cup'},'sweet-and-sour-chicken',1,'imperial').title,/potato starch/)
 assert.equal(swap({name:'cornstarch',amount:1,unit:'cup'},'cream-puffs',1,'imperial').title,'No reliable quick swap listed')
})
test('structural baking ingredients and unknown names never receive guessed swaps',()=>{
 for(const name of ['large eggs','all-purpose flour','instant yeast','heavy cream','mystery ingredient']) {
  assert.equal(swap({name},'cream-puffs',1,'imperial').title,'No reliable quick swap listed')
 }
})
test('garlic conversion does not incorrectly carry the clove count into teaspoons',()=>{
 const result=swap({name:'garlic cloves',amount:4},'ramen',2,'imperial')
 assert.equal(result.title,'jarred minced garlic')
 assert.match(result.note,/½ teaspoon per fresh clove/)
})
test('the original ingredient stays unchanged',()=>{
 const ingredient={name:'low-fat cheese',amount:400,unit:'g'}
 swap(ingredient,'crispy-beef-taquitos',2,'metric')
 assert.deepEqual(ingredient,{name:'low-fat cheese',amount:400,unit:'g'})
})
