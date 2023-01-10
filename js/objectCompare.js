/* 深度比较两对象是否相等 */
export const compareParams = (a, b) => {
  let aProps = Object.getOwnPropertyNames(a)
  let bProps = Object.getOwnPropertyNames(b)
  let flag = true
  if (aProps.length !== bProps.length) return false
  for (let i in a) {
    if (a[i] !== b[i]) {
      if (typeof a[i] === 'object') {
        if (!compareParams(a[i], b[i])) {
          flag = false
          break
        }
      } else {
        flag = false
        break
      }
    }
  }

  return flag
}

/* 
  适用情况：
  propA 作为基准比较对象，propB 作为动态变化对象
*/
export const CompareObject = (propA = {}, propB = {}) => {
  let flag = true
  // 如果需要把A对象拆分，需要该方法 -- 重塑A对象
  for (let a in propA) {
    if (a.includes('__')) {
      let splitItem = a.split('__')
      if (splitItem.length > 0) {
        splitItem.map((item) => {
          if (!propA[item]) propA[item] = propA[a]
        })
      }
    }
  }

  for (let b in propB) {
    if (propA[b]) {
      if (propB[b] !== propA[b]) {
        flag = false
        break
      }
    }
  }

  return flag
}
