import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Main from './main';
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);