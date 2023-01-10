import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Counter from '../pages/counter.custom'
import * as CounterActions from '../store/actions/counter.custom.action'

function mapStateToProps({ custom_counter: counter }) {
    return {
      count: counter.count
    }
}
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);