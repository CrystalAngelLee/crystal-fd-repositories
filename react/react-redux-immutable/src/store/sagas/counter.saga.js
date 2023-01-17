import { takeEvery, put, delay } from 'redux-saga/effects'

// TODO: 异步加载
function increment () {

}

export default function* CounterSaga() {
    yield takeEvery('increment_sync', increment)
}