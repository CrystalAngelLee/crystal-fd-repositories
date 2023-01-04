import { DEF_INCOME } from '../../constants'
import { fixpointer } from '../common'

export const curValue = (opt, rule, income = DEF_INCOME, rest = DEF_INCOME) => {
  let cur = 0
  switch (opt) {
    case '0':
      // 定量
      cur = parseFloat(rule)
      rest -= cur
      break
    case '1': {
      // 定量计算
      const calcArr = ['+', '-', '*', '/']
      const calc = rule.replace(/[0-9]*/g, '').trim()
      if (calcArr.includes(calc)) {
        let [before, after] = rule.split(calc)
        before = parseFloat(before.trim())
        after = parseFloat(after.trim())
        switch (calcArr.indexOf(calc)) {
          case 0:
            cur = before + after
            rest -= cur
            break
          case 1:
            cur = before - after
            rest -= cur
            break
          case 2:
            cur = before * after
            rest -= cur
            break
          case 3:
            cur = before / after
            rest -= cur
            break
          default:
            break
        }
      }
      break
    }
    case '2':
      // 收入百分比
      cur = income * (parseFloat(rule) * 0.01)
      rest -= cur
      break
    case '3':
      // 剩余百分比
      cur = rest * (parseFloat(rule) * 0.01)
      rest -= cur
      break
    case '4':
      // 前面计算百分比
      cur = (income - rest) * (parseFloat(rule) * 0.01)
      rest -= cur
      break
    default:
      break
  }

  return {
    rest: fixpointer(income - rest),
    curVal: fixpointer(cur)
  }
}
