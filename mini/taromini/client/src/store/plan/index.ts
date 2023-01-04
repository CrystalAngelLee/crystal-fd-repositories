import { observable, action } from 'mobx'

export type AnyObj = { [_: string]: unknown }

export type finaceDataType = {
  active?: boolean
  income?: string
  taxbefore?: string
  templateId?: string | number
  date?: string
  _id?: string
  _openid?: string
  templateInfo?: any
}

export interface PlanStoreProps {
  templateList: null | AnyObj
  setState: (params: AnyObj) => void
}

export class PlanStore {
  @observable templateList = null

  @action setState = (params: { [_: string]: any }) => {
    for (let key in params) {
      if (this.hasOwnProperty(key)) {
        this[key] = params[key]
      }
    }
  }
}

const instance = new PlanStore()
export default instance
