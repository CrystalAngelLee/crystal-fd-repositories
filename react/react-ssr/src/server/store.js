import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "../share/store/reducers";

// 服务端在接收到请求后创建store，所以先放到一个函数中
export default () => createStore(reducer, {}, applyMiddleware(thunk));
