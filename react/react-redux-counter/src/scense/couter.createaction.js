import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Counter from '../pages/couter.createaction'
import * as CounterActions from '../store/actions/couter.createaction.action'

function mapStateToProps({ create_couter: counter }) {
    return {
      count: counter.count
    }
}
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);