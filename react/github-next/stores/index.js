import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import allReducer from './reducers';

const middleware = [thunk];

const createReduxStore = (state = {}) => {
  const stores = createStore(
    allReducer,
    state,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return stores;
};

export default createReduxStore;
