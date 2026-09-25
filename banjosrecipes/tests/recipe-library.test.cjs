const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')

function setup({ failWrites = false, failReads = false } = {}) {
  const values = new Map()
  const listeners = new Map()
  const window = {
    localStorage: {
      getItem(key) { if (failReads) throw Error('blocked'); return values.get(key) ?? null },
      setItem(key, value) { if (failWrites) throw Error('quota'); values.set(key, value) },
    },
    addEventListener(name, fn) { listeners.set(name, fn) },
    removeEventListener(name) { listeners.delete(name) },
    dispatchEvent(event) { listeners.get(event.type)?.() },
  }
  const exports = {}
  const code = ts.transpileModule(fs.readFileSync('lib/recipe-library-store.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText
  vm.runInNewContext(code, { exports, window, Event })
  return { store: exports, values, listeners }
}
const list = (store, name) => JSON.parse(store.readLibrary(name))

test('favorites persist, toggle off, notify and read changes from another tab', () => {
  const { store, values, listeners } = setup()
  let updates = 0
  const cleanup = store.subscribeLibrary(() => updates++)
  store.toggleFavorite('pizza')
  assert.deepEqual(list(store, 'favorites'), ['pizza'])
  assert.equal(values.get('danjo-favorites'), '["pizza"]')
  store.toggleFavorite('pizza')
  assert.deepEqual(list(store, 'favorites'), [])
  values.set('danjo-favorites', '["ramen"]')
  listeners.get('storage')()
  assert.deepEqual(list(store, 'favorites'), ['ramen'])
  assert.equal(updates, 3)
  cleanup()
  assert.equal(listeners.size, 0)
})
test('history is newest first, deduplicated, limited to six and clearable', () => {
  const { store } = setup()
  for (let i = 0; i < 8; i++) store.recordView(String(i))
  store.recordView('4')
  assert.deepEqual(list(store, 'recent'), ['4', '7', '6', '5', '3', '2'])
  store.recordView('4')
  assert.equal(list(store, 'recent').length, 6)
  store.clearRecent()
  assert.deepEqual(list(store, 'recent'), [])
})
test('malformed data is tolerated and duplicate/non-string entries are removed', () => {
  const { store, values } = setup()
  values.set('danjo-favorites', '{broken')
  store.toggleFavorite('pizza')
  assert.deepEqual(list(store, 'favorites'), ['pizza'])
  assert.equal(JSON.stringify(store.parseLibrary('["pizza", null, 42, "pizza", ""]')), '["pizza"]')
  assert.equal(JSON.stringify(store.parseLibrary('{}')), '[]')
})
test('blocked or full storage falls back to memory for the visit', () => {
  for (const options of [{ failWrites: true }, { failWrites: true, failReads: true }]) {
    const { store } = setup(options)
    store.toggleFavorite('pizza')
    assert.deepEqual(list(store, 'favorites'), ['pizza'])
    store.recordView('ramen')
    assert.deepEqual(list(store, 'recent'), ['ramen'])
    store.toggleFavorite('pizza')
    assert.deepEqual(list(store, 'favorites'), [])
  }
})
