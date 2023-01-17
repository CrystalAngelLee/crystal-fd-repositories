import { DELAY_INCREMENT, DELAY_DECREMENT, ASYNC_INCREMENT, ASYNC_DECREMENT } from '../../constants/counter.const'

// const increment = () => ({ type: DELAY_INCREMENT })
// const decrement = () => ({ type: DELAY_DECREMENT })

// thunk 使用方式
// export const delay_increment = () => (dispatch) => {
//     setTimeout(() => {
//         dispatch(increment())
//     }, 2000)
// }
// export const delay_decrement = () => (dispatch) => {
//     setTimeout(() => {
//         dispatch(decrement())
//     }, 2000)
// }


export const delay_increment = (payload) => ({ type: DELAY_INCREMENT, payload })
export const delay_decrement = (payload) => ({ type: DELAY_DECREMENT, payload })

// saga 使用方式
// 用来触发异步 Action
export const asnyc_increment = (payload) => ({ type: ASYNC_INCREMENT, payload })
export const asnyc_decrement = (payload) => ({ type: ASYNC_DECREMENT, payload })