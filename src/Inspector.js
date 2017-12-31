import { deRef, fnMap, createDetectors, createRefMapper } from './util'

function inspect (value, refMap) {
  return fnMap(value, createRefMapper(refMap))
}
/**
 * Inspects a value for memory leaks.
 *
 * ```
 *   let value = { ... }
 *
 *   const inspector = new Inspector(value);
 *
 *   value = null
 * ```
 *
 * If you want to check for cross references among several objects pass in an object like so:
 * ```
 *  const inspector = new Inspector({
 *     obj1,
 *     obj2,
 *     obj3.
 *     ...etc.
 *  });
 * ```
 *
 * Note: If you use destroy() each and every object reference within will be nullified.
 */
export default class Inspector {
    _refMap = new Map();
    _detectors;

    constructor (value) {
      this._value = value;
      inspect(this._value, this._refMap)
      this._detectors = createDetectors(this._refMap)
    }

    leaked () {
      const detected = []

      this._detectors.forEach((detector) => {
        if (detector.isLeaking()) {
          detected.push({
            type: detector.type,
            paths: detector.paths
          })
        }
      })

      return detected
    }

    crossed () {
      return this.leaked()
        .filter((object) => object.paths.length > 1)
    }

    destroy () {
      deRef(this._value, this._refMap)

      this._value = null
    }

    static held(object) {
      const inspector = new Inspector(object)

      inspector.destroy()

      return inspector.leaked()
    }
}
