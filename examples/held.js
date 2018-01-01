import held from '../src'

let obj = {
  a: 1
}

let b = {}

obj.b = b

const heldObj = held(obj)

obj = null

console.log(JSON.stringify(heldObj.destroy()))

b = null

console.log(JSON.stringify(heldObj.destroy()))
