import test from 'tape'

import {
  createDetectors,
  createRefMapper,
  deRef,
  fnMap,
  nullify
} from '../src/util'

test('createRefMapper', (t) => {
  const a = {a: {b: {}}}

  const refMap = new Map()
  const refMapper = createRefMapper(refMap)

  t.true(refMapper(['a'], a))
  t.deepEqual(refMap.get(a), [['a']])

  t.equal(refMapper(['a', 'b'], a), false)
  t.deepEqual(refMap.get(a), [['a', 'b'], ['a']])
  t.end()
})

test('deRef', (t) => {
  const obj = {
    a: {
      b: {
        c: 1
      }
    }
  }

  const refMap = new Map()
  refMap.set(obj.a.b, [['a', 'b']])

  deRef(obj, refMap)

  t.deepEqual(obj, {a: {b: null}})
  t.equal(refMap.size, 0)

  refMap.set(obj.a, [['a']])

  deRef(obj, refMap)

  t.equal(refMap.size, 0)

  t.deepEqual(obj, {a: null})
  t.end()
})

test('fnMap', (t) => {
  const obj = {
    a: {
      b: {
        c: 1
      }
    }
  }

  const collect = []

  fnMap(obj, (value, path) => {
    collect.push([value, path])
  })

  t.ok(collect, [
    [obj.a, ['a']],
    [obj.a.b, ['a', 'b']]
  ])
  t.end()
})

test('nullify', (t) => {
  const obj = {
    a: {
      b: {
        c: {}
      }
    }
  }

  nullify(obj, ['a', 'b', 'c'])
  t.deepEqual(obj, {a: {b: {c: null}}})

  nullify(obj, ['a', 'b'])
  t.deepEqual(obj, {a: {b: null}})

  nullify(obj, ['a'])
  t.deepEqual(obj, {a: null})

  nullify(obj, ['a', 'b', 'c'])
  t.deepEqual(obj, {a: null})
  t.end()
})

test('createDetectors', (t) => {
  t.ok(createDetectors)
  t.end()
})
