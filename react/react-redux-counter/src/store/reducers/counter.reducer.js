import { INCREMENT, DECREMENT } from '../../constants/counter.const'

const initalState = {
    count: 0
}

export default function CounterReducer (state = initalState, action) {
    switch (action.type) {
        case INCREMENT: 
            return { 
                ...state, 
                count: state.count + 1 
            }
        case DECREMENT:
            return { 
                ...state, 
                count: state.count - 1
            }
        default:
            return state
    }
}