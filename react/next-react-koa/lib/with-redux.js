import React, { Component } from 'react';
import createStore from '../store/store';
const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
  if (isServer) {
    return createStore(initialState);
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

const TestHoc = (Comp) => {
  class TestHocComp extends Component {
    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      const { Component, pageProps, ...rest } = this.props;
      if (pageProps) {
        pageProps.test = '123';
      }
      return (
        <Comp
          Component={Component}
          pageProps={pageProps}
          {...rest}
          reduxStore={this.reduxStore}
        />
      );
    }
  }
  TestHocComp.getInitialProps = async (ctx) => {
    let reduxStore;

    if (isServer) {
      const { req } = ctx.ctx;
      const session = req.session;
      if (session && session.userInfo) {
        reduxStore = getOrCreateStore({
          user: session.userInfo,
        });
      } else {
        reduxStore = getOrCreateStore();
      }
    } else {
      reduxStore = getOrCreateStore();
    }

    ctx.reduxStore = reduxStore;

    let appProps = {};
    if (typeof Comp.getInitialProps(ctx) === 'function') {
      appProps = await Comp.getInitialProps(ctx);
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState(),
    };
  };
  return TestHocComp;
};

export default TestHoc;
