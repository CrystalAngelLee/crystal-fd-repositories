import { Provider } from 'react-redux';
import App from 'next/app';
import Router from 'next/router';
import withRedux from '../lib/appWithRedux';
import LoadingPage from '../components/PageLoading';
import 'antd/dist/antd.min.css';
import '../styles/globals.css';
import 'github-markdown-css';

import Layout from '../components/Layout';

class MyApp extends App {
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

  startLoading = () => {
    this.setState({ loading: true });
  };
  stopLoading = () => {
    this.setState({ loading: false });
  };

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Layout>
          {this.state.loading ? <LoadingPage /> : null}

          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}

export default withRedux(MyApp);
