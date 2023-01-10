import App from 'next/app';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import MyContext from '../lib/my-context';
import testHoc from '../lib/with-redux';

class CustomApp extends App {
  // 每次页面切换都会执行
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        <MyContext.Provider value={'test'}>
          <Component {...pageProps} />
        </MyContext.Provider>
      </Provider>
    );
  }
}

// 覆盖Nextjs 的APP组件
export default testHoc(CustomApp);
