/**
 * Traverses an object and executes a callback
 * with the following signature (path[], value)
 *
 * @param value
 * @param fn
 */
export default function fnMap (value, fn) {
  (function traverse (obj, path = []) {
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
          if (typeof obj[i] === 'object' && obj[i] !== null) {
            const newPath = path.concat(i)
            if (fn(newPath, obj[i])) {
              traverse(obj[i], newPath)
            }
          }
        }
      } else {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
          if (typeof obj[keys[i]] === 'object' && obj[keys[i]] !== null) {
            const newPath = path.concat(keys[i])
            if (fn(newPath, obj[keys[i]])) {
              traverse(obj[keys[i]], newPath)
            }
          }
        }
      }
    }
  })(value)
}
