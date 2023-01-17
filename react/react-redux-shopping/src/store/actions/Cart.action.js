import { createAction } from 'redux-actions'

// 获取购物车列表信息
export const getCartProducts = createAction('getCartProducts')
// 将购物车商品信息存储到 state 中
export const saveCartProducts = createAction('saveCartProducts')

// 将商品添加到购物车
export const addProductToCart = createAction('addProductToCart')
// 将商品同步到 state 中
export const addProductToCartState = createAction('addProductToCartState')

// 更改商品数量
export const changeProductNumber = createAction('changeProductNumber')
// 将更改同步到 state
export const changeProductNumberToState = createAction('changeProductNumberToState')

// 删除商品
export const deleteProduct = createAction('deleteProduct')
export const deleteProductInState = createAction('deleteProductInState')