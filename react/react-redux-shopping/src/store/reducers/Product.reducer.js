import { handleActions as createReducer } from 'redux-actions'
import { saveProducts } from '../actions/Product.action'

const initalState = []

// 将商品列表数据保存在本地的store对象中
const handleSaveProducts = (state, action) => action.payload

export default createReducer({
    // 将商品列表数据保存在本地的store对象中
    [saveProducts]: handleSaveProducts
}, initalState)