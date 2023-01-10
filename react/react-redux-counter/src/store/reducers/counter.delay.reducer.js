import { DELAY_INCREMENT, DELAY_DECREMENT } from '../../constants/counter.const'

const initalState = {
    count: 0
}

export default function CounterReducer (state = initalState, action) {
    switch (action.type) {
        case DELAY_INCREMENT: 
            return { 
                ...state, 
                count: state.count + action.payload
            }
        case DELAY_DECREMENT:
            return { 
                ...state, 
                count: state.count - action.payload
            }
        default:
            return state
    }
  }