import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Counter from '../pages/counter.delay'
import * as CounterActions from '../store/actions/counter.delay.action'

function mapStateToProps({ delay_counter: counter }) {
    return {
      count: counter.count
    }
}
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators(CounterActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);