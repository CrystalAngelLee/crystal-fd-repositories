import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'

/**
 * 第一版： 原生态处理
 */

// 3. 存储默认状态
var initalState = {
  count: 0
}

// 2. 创建 reducer 函数
function reducer(state = initalState, action) {
  switch (action.type) {
      case 'increment': 
          return { count: state.count + 1 }
      case 'decrement':
          return { count: state.count - 1 }
      default:
          return state
  }
}

// 1. 创建 store 对象
var store = createStore(reducer)

// 4. 定义 action
var increment = { type: 'increment' }
var decrement = { type: 'decrement' }

// 7. 订阅 store 同步视图
store.subscribe(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
})

function App() {
  return (
    <div className="App">
      <button id='plus' onClick={() => store.dispatch(increment)}>+</button>
      <span id='count'>{store.getState().count}</span>
      <button id='minus' onClick={() => store.dispatch(decrement)}>-</button>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);