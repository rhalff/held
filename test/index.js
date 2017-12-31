import assert from 'assert'

import {
  createDetectors,
  createRefMapper,
  deRef,
  fnMap,
  nullify,
  LeakDetector
} from '../src/index.js'

describe('held', () => {
  it('createRefMapper', () => {
    const a = {a: {b: {}}}

    const refMap = new Map()
    const refMapper = createRefMapper(refMap)

    assert(refMapper.name, 'createRefMapper')

    assert(refMapper(['a'], a), true)
    assert.deepEqual(refMap.get(a), [['a']])

    assert.equal(refMapper(['a', 'b'], a), false)
    assert.deepEqual(refMap.get(a), [['a'], ['a', 'b']])
  })
  it('deRef', () => {
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

    assert.deepEqual(obj, {a: {b: null}})
    assert.equal(refMap.size, 0)

    refMap.set(obj.a, [['a']])

    deRef(obj, refMap)

    assert.equal(refMap.size, 0)

    assert.deepEqual(obj, {a: null})
  })
  it('fnMap', () => {
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

    assert.ok(collect, [
      [obj.a, ['a']],
      [obj.a.b, ['a', 'b']]
    ])
  })
  describe('nullify', () => {
    const obj = {
      a: {
        b: {
          c: {}
        }
      }
    }

    nullify(obj, ['a', 'b', 'c'])
    assert.deepEqual(obj, {a: {b: {c: null}}})

    nullify(obj, ['a', 'b'])
    assert.deepEqual(obj, {a: {b: null}})

    nullify(obj, ['a'])
    assert.deepEqual(obj, {a: null})

    nullify(obj, ['a', 'b', 'c'])
    assert.deepEqual(obj, {a: null})
  })
  it('LeakDetector', () => {
    assert.ok(LeakDetector)
  })
  it('createDetectors', () => {
    assert.ok(createDetectors)
  })
})
