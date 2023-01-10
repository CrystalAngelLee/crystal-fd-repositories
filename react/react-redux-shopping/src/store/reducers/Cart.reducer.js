import { handleActions as createReducer } from 'redux-actions'
import { 
    addProductToCartState, 
    saveCartProducts, 
    changeProductNumberToState, 
    deleteProductInState 
} from '../actions/Cart.action'

const initalState = []

// 初始商品列表
const handleSaveCartProducts = (state, { payload }) => payload

// 添加商品
const handleAddProductToCartState = (state, { payload }) => {
    // 将原有的购物车数据拷贝一份
    const newState = JSON.parse(JSON.stringify(state));
    // 查找商品 如果找到 返回商品 如果没有找到 返回undefined
    const product = newState.find(product => product.id === payload.id);
    if (product) {
        // 商品已经存在于购物车中
        product.count = product.count + 1;
    } else {
        // 商品没有在购物车中
        newState.push(payload);
    }
    return newState;
}

// 修改商品数量
const handleChangeProductNumberToState = (state, { payload }) => {
    // 将原有的购物车数据拷贝一份
    const newState = JSON.parse(JSON.stringify(state));
    const product = newState.find(product => product.id === payload.id);
    product.count = payload.count;
    return newState
}

// 删除商品
const handleDeleteProductInState = (state, { payload }) => {
    // 将原有的购物车数据拷贝一份
    let newState = JSON.parse(JSON.stringify(state));
    newState = newState.filter(p => p.id !== payload.cid)
    return newState;
}

export default createReducer({
    [addProductToCartState]: handleAddProductToCartState,
    [saveCartProducts]: handleSaveCartProducts,
    [changeProductNumberToState]: handleChangeProductNumberToState,
    [deleteProductInState]: handleDeleteProductInState
}, initalState)