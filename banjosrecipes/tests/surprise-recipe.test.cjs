const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
const api = {}
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/surprise-recipe.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, { exports: api })
const { pickSurpriseRecipe: pick } = api
const recipes = ['pizza', 'ramen', 'chili'].map(slug => ({ slug }))
test('handles empty results and a single matching recipe', () => {
  assert.equal(pick([], []), undefined)
  assert.equal(pick([recipes[0]], ['pizza']), recipes[0])
})
test('only chooses provided filter results and avoids last viewed when possible', () => {
  for (const draw of [0, .2, .5, .99]) {
    assert.equal(pick(recipes.slice(0, 2), ['pizza'], () => draw), recipes[1])
  }
})
test('unseen recipes receive three times the weight of older recently viewed recipes', () => {
  const recent = ['chili', 'pizza'] // chili excluded, pizza weight 1, ramen weight 3
  assert.equal(pick(recipes, recent, () => .249), recipes[0])
  assert.equal(pick(recipes, recent, () => .25), recipes[1])
  assert.equal(pick(recipes, recent, () => .999), recipes[1])
})
test('new visitors get equal odds and every matching recipe is reachable', () => {
  assert.equal(pick(recipes, [], () => 0), recipes[0])
  assert.equal(pick(recipes, [], () => .5), recipes[1])
  assert.equal(pick(recipes, [], () => .999), recipes[2])
})
