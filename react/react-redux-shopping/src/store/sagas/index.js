import { all } from 'redux-saga/effects'
import productSaga from './Product.saga'
import cartSaga from './Cart.saga'

export default function* rootSaga() {
    yield all([
        productSaga(),
        cartSaga()
    ])
};