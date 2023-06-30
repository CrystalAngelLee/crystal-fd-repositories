export function isPlainObject(target) {
  return toString.call(target) === '[object Object]'
}

export function isFunction(target) {
  return typeof target === 'function'
}
