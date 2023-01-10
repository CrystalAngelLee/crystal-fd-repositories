import { createStore, applyMiddleware } from 'redux'
// import logger from './middlewares/logger'
// import thunk from './middlewares/thunk'
// import thunk from 'redux-thunk'
import reducer from './reducers'

// 使用 thunk 中间件
// export const store = createStore(reducer, applyMiddleware(logger, thunk))

import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/root.saga'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

console.log('store', store)
// 启动
sagaMiddleware.run(rootSaga)