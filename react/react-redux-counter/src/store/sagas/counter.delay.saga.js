import { takeEvery, put, delay } from 'redux-saga/effects'
import { delay_increment, delay_decrement } from '../actions/counter.delay.action'
import { ASYNC_INCREMENT, ASYNC_DECREMENT } from '../../constants/counter.const'

function* delay_increment_fun (action) {
    yield delay(2000)
    yield put(delay_increment(action.payload))
}

function* delay_decrement_fun (action) {
    yield delay(1000)
    yield put(delay_decrement(action.payload))
}

export default function* CounterSaga () {
    yield takeEvery(ASYNC_INCREMENT, delay_increment_fun)
    yield takeEvery(ASYNC_DECREMENT, delay_decrement_fun)
  }