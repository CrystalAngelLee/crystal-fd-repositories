import { uuid } from '../utils'

export const DEF_INCOME = 10000

export type default_configDataProps = {
  uniqueId: string
  name: string
  rule: string
  rule_opt: string
  checked: boolean
  configs?: Array<default_configDataProps>
}

export const default_configData: default_configDataProps = {
  uniqueId: uuid(),
  name: '',
  rule: '',
  rule_opt: '',
  checked: false
}

export type default_templateProps = {
  _id?: string
  name: string
  configs?: default_configDataProps[]
  active?: boolean
  taxbefore?: boolean
  begintime?: string
  endtime?: string
}

export const default_template: default_templateProps = {
  name: '',
  configs: [default_configData],
  active: true, // 启用
  taxbefore: false, // 税前
  begintime: '', // 生效时间
  endtime: '' // 失效时间
}

export const DEF_MANAGE = {
  0: {
    key: 'expend',
    data: [
      {
        key: 'food',
        name: '餐饮',
        icon: ''
      },
      {
        key: 'shopping',
        name: '购物',
        icon: ''
      },
      {
        key: 'pet',
        name: '宠物',
        icon: ''
      }
    ]
  },
  1: {
    key: 'income',
    data: [
      { key: 'salary', name: '工资', icon: '' },
      { key: 'redenvelope', name: '红包', icon: '' }
    ]
  }
}
