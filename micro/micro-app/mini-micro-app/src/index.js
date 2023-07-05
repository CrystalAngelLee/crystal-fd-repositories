import { defineElement } from './micro_app_element'
import { isPlainObject } from './libs/utils'

const MicroApp = {
  start(options) {
    if (isPlainObject(options)) {
      this.options = options
      isPlainObject(options.plugins) && (this.plugins = options.plugins)
    }

    defineElement()
  }
}

export default MicroApp
