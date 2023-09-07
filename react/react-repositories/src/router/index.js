import { LOCATION } from '../utils'
import { default as pcrouter } from './index.pc.js'
import { default as mbrouter } from './index.m.js'

let router = pcrouter
if (LOCATION.isMobile()) {
  router = mbrouter
}

export default router
