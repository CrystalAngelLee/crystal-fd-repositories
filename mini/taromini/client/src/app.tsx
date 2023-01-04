import Taro from '@tarojs/taro';
import { Component } from 'react';
import { Provider } from 'mobx-react';
import * as stores from './store';
import './app.scss';

class App extends Component {
  componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      // 初始化云开发
      Taro.cloud.init({
        // 环境id
        env: 'crystal-miniproject-xtkpr',
        traceUser: true,
      });
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 就是要渲染的页面
  render() {
    return <Provider {...stores}>{this.props.children}</Provider>;
  }
}

export default App;
