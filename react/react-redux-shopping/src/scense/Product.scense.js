import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import Product from "../pages/Product";
import * as productActions from '../store/actions/Product.action'
import * as cartActions from '../store/actions/Cart.action'

const mapStateToProps = ({ products }, ownProps) => ({
    products
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ...bindActionCreators(productActions, dispatch),
        ...bindActionCreators(cartActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)