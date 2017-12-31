import nullify from './nullify'

/**
 * deRef
 *
 * Removes each and every value held by the refMap.
 *
 * @param refMap
 */
export default function deRef (obj, refMap) {
  for (let [value, paths] of refMap) {
    paths.forEach((path) => {
      nullify(obj, path)
    })

    refMap.delete(value)
  }
}
