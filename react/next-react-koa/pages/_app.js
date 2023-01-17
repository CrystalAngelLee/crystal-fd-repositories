import App from 'next/app';
import Router from 'next/router';
import axios from 'axios';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';

import testHoc from '../lib/with-redux';
import Layout from '../components/Layout';
import PageLoading from '../components/PageLoading';

class CustomApp extends App {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    Router.events.on('routeChangeStart', this.startLoading);
    Router.events.on('routeChangeComplete', this.stopLoading);
    Router.events.on('routeChangeError', this.stopLoading);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.startLoading);
    Router.events.off('routeChangeComplete', this.stopLoading);
    Router.events.off('routeChangeError', this.stopLoading);
  }

  // 每次页面切换都会执行
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  startLoading = () => {
    this.setState({ loading: true });
  };
  stopLoading = () => {
    this.setState({ loading: false });
  };
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Provider store={reduxStore}>
        {this.state.loading ? <PageLoading /> : null}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}

// 覆盖Nextjs 的APP组件
export default testHoc(CustomApp);
