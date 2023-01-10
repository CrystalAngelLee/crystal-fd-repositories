import { handleActions as createReducer } from 'redux-actions'
import { create_increment, create_decrement } from '../actions/couter.createaction.action'

const initalState = {
    count: 0
}

// 无参
// const handleIncrement = state => ({ count: state.count + 1 })
// const handleDecrement = state => ({ count: state.count - 1 })

// 传参写法
const handleIncrement = (state, action) => ({ count: state.count + action.payload })
const handleDecrement = (state, action) => ({ count: state.count - action.payload })

export default createReducer({
    [create_increment]: handleIncrement,
    [create_decrement]: handleDecrement
}, initalState);