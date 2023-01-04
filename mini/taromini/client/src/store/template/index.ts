import { action } from 'mobx'

export type AnyObj = { [_: string]: unknown }
export interface TemplateStoreProps {
  setState: (params: AnyObj) => void
}

export class TemplateStore {
  @action setState = (params: AnyObj) => {
    for (let key in params) {
      if (this.hasOwnProperty(key)) {
        this[key] = params[key]
      }
    }
  }
}

export default new TemplateStore()
