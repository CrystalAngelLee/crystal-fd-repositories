import { C_INCREMENT, C_DECREMENT } from '../../constants/counter.const'

const initalState = {
    count: 0
}

export default function CounterReducer (state = initalState, action) {
    switch (action.type) {
        case C_INCREMENT: 
            return { ...state, count: state.count + action.payload }
        case C_DECREMENT:
            return { ...state, count: state.count - action.payload }
        default:
            return state
    }
  }