import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import Cart from "../pages/Cart";
import * as cartActions from '../store/actions/Cart.action'

const mapStateToProps = ({ cart }) => ({ cart })
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(cartActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Cart)