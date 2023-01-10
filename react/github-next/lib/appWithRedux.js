import React, { Component } from 'react';
import stores from '../stores';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';
function getOrCreateStore(initialState) {
  if (isServer) {
    return stores(initialState);
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = stores(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

const AppWithRedux = (Comp) => {
  return class App extends Component {
    static async getInitialProps(ctx) {
      let store;

      if (isServer) {
        const { req } = ctx.ctx;
        const session = req.session;
        if (session && session.userInfo) {
          store = getOrCreateStore({
            user: session.userInfo,
          });
        } else {
          store = getOrCreateStore();
        }
      } else {
        store = getOrCreateStore();
      }

      ctx.store = store;
      let appProps = {};
      if (
        typeof Comp.getInitialProps(ctx) === 'function' ||
        Object.prototype.toString.call(Comp.getInitialProps(ctx)) ===
          '[object Promise]'
      ) {
        appProps = await Comp.getInitialProps(ctx);
      }

      return {
        ...appProps,
        reduxState: store.getState(),
      };
    }

    constructor(props) {
      super(props);

      this.store = getOrCreateStore(props.reduxState);
    }

    render() {
      const { Component, pageProps, ...rest } = this.props;
      return (
        <Comp
          Component={Component}
          pageProps={pageProps}
          {...rest}
          store={this.store}
        />
      );
    }
  };
};

export default AppWithRedux;
