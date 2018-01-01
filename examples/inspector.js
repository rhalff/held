import Inspector from '../src/Inspector'

let a = {
  a: {
    c: '3'
  },
  q: new ArrayBuffer()
}

let c = {
  p: []
}

let b = {
  a: a
}

b.a.d = c
b.a.e = c

const bInspector = new Inspector(b)

const leak = a.q // eslint-disable-line no-unused-vars

console.log('==== Internal References ===')
bInspector.crossed()
  .forEach((object) => {
    if (object.paths.length > 1) {
      console.log(
        `Object ${object.type}`,
        'is referenced by:',
        object.paths.map((path) => path.join('.'))
      )
    }
  })

console.log(`==== Leaked Objects ===`)

a = null
b = null
c = null

let totalLeaked = 0
bInspector.destroy()

bInspector.leaked()
  .forEach((object) => {
    totalLeaked++
    console.log(
      `Object ${object.type}`,
      'which was held by:',
      object.paths.map((path) => '`.' + path.join('.') + '`').join(', '),
      'has leaked'
    )
  })

console.log(`==== Leaked(${totalLeaked}) ===`)
