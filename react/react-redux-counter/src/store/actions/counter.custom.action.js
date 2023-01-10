import { C_INCREMENT, C_DECREMENT } from '../../constants/counter.const'

export const c_increment = payload => ({ type: C_INCREMENT, payload })
export const c_decrement = payload => ({ type: C_DECREMENT, payload })