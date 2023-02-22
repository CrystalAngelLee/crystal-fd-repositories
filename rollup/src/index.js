// import _ from 'lodash-es'
// import { log } from './logger'
// import message from './message'
// import { name, version } from '../package.json'
// import cjs from './cjs.module'

// const msg = message.hi

// log(msg)
// console.log(name, version)
// log(_.camelCase('hello world'))
// log(cjs)

import('./logger').then(({ log }) => {
  log('woo~')
})
