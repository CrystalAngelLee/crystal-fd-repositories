import { createReducer } from 'redux-immutablejs'

const initalState = {
    count: 0
}

export default createReducer(initalState, {
    'increment': (state, { payload = 1 }) => state.set('count', state.get('count') + payload),
    'decrement': (state, { payload = 1 }) => state.set('count', state.get('count') - payload)
})