import { Component } from 'react'
import { Provider } from 'mobx-react';
import * as stores from './store';

import './styles/index.less'

class App extends Component {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <Provider {...stores}>{this.props.children}</Provider>
    )
  }
}

export default App
