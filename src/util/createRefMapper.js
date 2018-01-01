/**
 * createRefMapper
 *
 * Receives an empty reference map.
 *
 * And returns a function which can be used by fnMap.
 *
 * Which in turn traverses the object to be inspected.
 *
 * @param refMap
 * @returns {refMapper}
 */
export default function createRefMapper (refMap) {
  function refMapper (path, value) {
    if (refMap.has(value)) {
      refMap.set(value, [path].concat(refMap.get(value)))
      return false
    }

    refMap.set(value, [path])

    return true
  }

  return refMapper
}

module.exports = createRefMapper
