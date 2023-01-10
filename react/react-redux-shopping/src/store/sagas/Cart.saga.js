import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios';
import { 
    addProductToCart, 
    addProductToCartState, 
    getCartProducts,
    saveCartProducts,
    changeProductNumber,
    changeProductNumberToState,
    deleteProduct,
    deleteProductInState
} from '../actions/Cart.action'

// 获取购物车列表信息
function* handleGetCartProducts() {
    const { data } = yield axios.get('http://localhost:3005/cart')
    yield put(saveCartProducts(data))
}

// 将商品添加到购物车中
function* handleAddProductToCart({ payload }) {
    const { data } = yield axios.post('http://localhost:3005/cart/add', { gid: payload })
    // 将商品同步到 state 中
    yield put(addProductToCartState(data))
}

// 更新商品数量
function* handleChangeProductNumber({ payload }){
    if (payload.count === '0') {
        yield put(deleteProduct(payload.cid))
    } else {
        const { data } = yield axios.put('http://localhost:3005/cart', payload)
        yield put(changeProductNumberToState(data))
    }
}

// 删除商品
function* handleDeleteProduct({ payload }) {
    const params = { cid: payload }
    const { data } = yield axios.delete('http://localhost:3005/cart/delete', { params })
    yield put(deleteProductInState({data, ...params}))
}

export default function* cartSaga () {
    yield takeEvery(getCartProducts, handleGetCartProducts)
    yield takeEvery(addProductToCart, handleAddProductToCart)
    yield takeEvery(changeProductNumber, handleChangeProductNumber)
    yield takeEvery(deleteProduct, handleDeleteProduct)
}