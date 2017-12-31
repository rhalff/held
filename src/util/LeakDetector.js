import weak from 'weak'
import gc from './gc/node'

export default class LeakDetector {
  constructor (value) {
    if (typeof value !== 'object' || value === null) {
      throw new TypeError('value must be an object')
    }

    weak(value, () => {
      this._isHeld = false
    })

    this._isHeld = true

    value = null
  }

  isLeaking () {
    gc()

    return this._isHeld
  }
}
