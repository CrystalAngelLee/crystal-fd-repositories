import { combineReducers } from 'redux-immutablejs'
import counter from './counter.reducer'

export default combineReducers({
    counter,
})