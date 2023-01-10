import { all } from 'redux-saga/effects'
import CounterSaga from './counter.delay.saga';

export default function* rootSaga() {
    yield all([
        CounterSaga(),
    ])
};
