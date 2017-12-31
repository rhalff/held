import v8 from 'v8'
import vm from 'vm'

export default function gc () {
  const exposed = Boolean(global.gc)

  if (!exposed) {
    v8.setFlagsFromString('--expose-gc')
  }

  vm.runInNewContext('gc')()

  if (!exposed) {
    v8.setFlagsFromString('--no-expose-gc')
  }
}
