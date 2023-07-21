import { pathExistsSync } from 'path-exists'

// module.exports = function () {
//   console.log("I'm util")
// }

export function exists(p) {
  return pathExistsSync(p)
}
