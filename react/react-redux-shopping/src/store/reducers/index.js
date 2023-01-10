import { combineReducers } from "redux"
import products from './Product.reducer'
import cart from './Cart.reducer'

const reducers = combineReducers({
    products,
    cart
});

export default reducers