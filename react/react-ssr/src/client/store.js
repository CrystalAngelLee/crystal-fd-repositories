import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducer from "../share/store/reducers";

const store = createStore(
  reducer,
  window.INITIAL_STATE,
  applyMiddleware(thunk)
);

export default store;
