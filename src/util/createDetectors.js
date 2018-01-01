import fragile from 'fragile'

/**
 * Receives a reference map and returns a list of leak detectors
 * Which can be used to test each of these references for leaks.
 *
 * In order not to be considered a leak no other variables must
 * point to the value tested by the detector.
 *
 * Some metadata is attached, the paths which pointed to this value.
 * And the type of the object.
 *
 * @param refMap
 * @returns {Array}
 */
export default function createDetectors (refMap) {
  const detectors = []

  for (let [value, paths] of refMap) {
    detectors.push({
      type: value.toString ? value.toString() : typeof value,
      paths,
      isLeaking: fragile(value)
    })
  }

  return detectors
}
