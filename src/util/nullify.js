/**
 * Nullifies a value by path
 *
 * @param obj
 * @param path
 * @returns {undefined}
 */
export default function nullify (obj, path) {
  let index = -1
  const length = path.length

  while (obj !== null && index < length) {
    index++

    if (index === (length - 1)) {
      obj[path[index]] = null
    }

    obj = obj[path[index]]
  }
}
