import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Counter from '../pages/counter'
import * as CounterActions from '../store/actions/counter.action'

function mapStateToProps({ counter }) {
    return {
      count: counter.count
    }
}
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);