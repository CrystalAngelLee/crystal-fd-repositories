import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import axios from 'axios';

const userInitialState = {};
const LOGOUT = 'LOGOUT';

function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case 'LOGOUT':
      return {};

    default:
      return state;
  }
}

const allReducers = combineReducers({
  user: userReducer,
});

// action creactors
export function logout() {
  return (dispatch) => {
    axios
      .post('/logout')
      .then((resp) => {
        if (resp.status === 200) {
          dispatch({ type: LOGOUT });
        } else {
          console.log('logout failed', resp);
        }
      })
      .catch((err) => console.error(err));
  };
}

export default function initialStore(state) {
  const store = createStore(
    allReducers,
    Object.assign({}, { user: userInitialState }, state),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );
  return store;
}
