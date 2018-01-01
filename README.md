# Held

Determines which objects are cross referenced by an arbitrary set of objects.

Determines within the set which objects are prevented from garbage collection.

The entries within this set are considered candidates for causing memory leaks.

In order to determine whether these objects really cause memory leaks a destructive method can be used,
which will destroy all the objects being inspected.

After this destructive operation you can retrieve a report which tells you the leaking objects and their original paths within the inspected set.

The devtools memory inspector can be used to see which containers are still holding references.

### Installation

`yarn add held --dev`

### Usage:

```js
import held from 'held'

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
```
