import { INCREMENT, DECREMENT } from '../../constants/counter.const'

export const increment = () => ({ type: INCREMENT })
export const decrement = () => ({ type: DECREMENT })