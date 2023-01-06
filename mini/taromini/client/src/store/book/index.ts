import { action, observable } from 'mobx'

export type AnyObj = { [_: string]: unknown }
export interface BookStoreProps {
  bookMap: null | { [_: string | number]: any }
  setState: (params: AnyObj) => void
}

export class BookStore {
  @observable bookMap = null
  @action setState = (params: AnyObj) => {
    for (let key in params) {
      if (this.hasOwnProperty(key)) {
        this[key] = params[key]
      }
    }
  }
}

export default new BookStore()
