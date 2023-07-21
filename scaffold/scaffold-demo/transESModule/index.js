import path from 'path'
import { exists } from './utils'

console.log(path.resolve('.'), exists(path.resolve('.')))
;(async function () {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log('setTimeout end')
})()
