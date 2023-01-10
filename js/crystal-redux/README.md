## Redux 实现分析

> createStore(reducer, preloadedState, enhancer)
>
> 接收三个参数：
>
> - **reducer**: 根据 action 的类型对store 中的状态进行更改
> - **preloadedState**：state 的初始值
> - **enhancer**：对 store 的功能进行增加
> 
>  返回一个对象，包含：
>  
> - **getState**: 获取状态
> - **dispatch**: 用来触发 action
> - **subscribe**: 订阅 store

### 1. getState - preloadedState

定义 store 状态，接收初始值，处理部分暂时不考虑，将状态值进行返回

```js
function createStore(reducer, preloadedState) {
    // 状态值
    var currentState = preloadedState;
   
    // 获取状态
    function getState () {
        return currentState
    }
}
```



### 2. dispatch

触发 action 并传递给 reducer 进行对 action 进行处理后返回新的 state 给 store

当 state 发生更改之后需要告知 `订阅者` 状态发生了改变

```js
function createStore(reducer, preloadedState) {
    // 订阅者函数
    var currentListeners = []
		……
    
    // 触发 action
    function dispatch (action) {
        currentState = reducer(currentState, action)
        // 调用订阅者 通知订阅者状态发生了改变
        for (var i = 0; i < currentListeners.length; i++) {
            // 获取订阅者
            var listener = currentListeners[i];
            // 调用订阅者
            listener();
        }
    }
}
```

**reducer**

reducer 必须是一个函数

```js
function createStore(reducer, preloadedState) {
    if (typeof reducer !== 'function') throw new Error("reducer must be a function")
  	...
}
```

**action**

action 必须是一个含有 type 属性的对象

```js
// 判断参数是否是对象类型
// 判断对象的当前原型对象是否和顶层原型对象相同
function isPlainObject (obj) {
    // 排除基本类型 和 null
    if (typeof obj !== 'object' || obj === null) return false;
    // 区分数组和对象 原型对象对比的方式
    var proto = obj;
    while (Object.getPrototypeOf(proto) != null) {
      proto = Object.getPrototypeOf(proto)
    }
    return Object.getPrototypeOf(obj) === proto;
}

function createStore(reducer, preloadedState) {
		...

    // 触发 action
    function dispatch (action) {
        // 判断action是否是一个对象
        if (!isPlainObject(action)) throw new Error('action must be a object');
        // 判断action中的type属性是否存在
        if (typeof action.type === 'undefined') throw new Error('action对象中必须有type属性');
				...
    }
}
```



### 3. subscribe 订阅状态

状态的订阅者可能有多个，也可能会被多次调用，所以需要一个数组进行存储

```js
function createStore(reducer, preloadedState) {
    // 订阅者函数
    var currentListeners = []

    // 订阅状态
    function subscribe (listener) {
        currentListeners.push(listener)
    }
}
```



### 4. enhancer

> 通过 `enhancer` 可以让 `createStore` 的调用者对返回的 store 对象进行功能上的增强

规定 `enhancer` 必须是一个函数。在调用 `enhancer` 函数的时候，将 `createStore` 方法本身，`preloadedState` 和`reducer` 都传递出去。

```js
function createStore(reducer, preloadedState, enhancer) {
    // 判断是否传递了 enhancer 函数 && enhancer 是一个函数
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
          throw new Error('enhancer must be a function')
        }
        return enhancer(createStore)(reducer, preloadedState);
    }
}
```



------------

----- store 基础测试 demo ------

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>redux 实现部分测试 demo</title>
</head>
<body>
    <button id="increment">+1</button>
    <span id="box">0</span>
    <button id="decrement">-1</button>

    <script src="../redux/index.js"></script>
    <script>
        function reducer(state, action) {
            switch (action.type) {
                case "increment":
                    return state + 1;
                case "decrement":
                    return state - 1;
                default:
                    return state;
            }
        }

        function enhancer (createStore) {
            return function (reducer, preloadedState) {
                var store = createStore(reducer, preloadedState);
                var dispatch = store.dispatch;
                // 对 dispatch 的增强：模拟实现 redux-thunk
                function _dispatch (action) {
                    if (typeof action === 'function') {
                        return action(dispatch)
                    }
                    dispatch(action);
                }
                return {
                    ...store,
                    dispatch: _dispatch
                }
            }
        }

        const store = createStore(reducer, 0, enhancer);
        
        // 获取最新状态
        store.subscribe(function () {
            document.getElementById("box").innerHTML = store.getState();
        });
      
      	/* action 及 action 的触发 */

        function increment () {
            return {type: "increment"}
        }

        function decrement () {
            return {type: "decrement"};
        }
      
        document.getElementById("increment").onclick = function () {
            store.dispatch({ type: "increment" });
        };

        document.getElementById("decrement").onclick = function () {
            store.dispatch({ type: "decrement" });
        };
    </script>
</body>
</html>
```

-------------------------------------------



### 5.  applyMiddleware

- 核心：增强 `dispatch` 函数
- 作用：通过增强 `dispatch` 方法，让多个中间件函数进行组合已达到我们在触发 `action` 的时候让多个中间件按照顺序进行执行
- next 参数：下一个中间件函数（最里层的函数）；最后一个中间件的next 指向 `dispatch` 方法

```js
function applyMiddleware (...middlewares) {
    return function (createStore) {
        return function (reducer, preloadedState) {
            // 创建 store: 拿到 store 后给中间件传递参数
            var store = createStore(reducer, preloadedState);
            // 简化版的 store
            var middlewareAPI = {
                getState: store.getState,
                dispatch: store.dispatch
            }
            // 返回 中间件 函数的第二层函数
            var chain = middlewares.map(middleware => middleware(middlewareAPI));
            // 最里层函数   
            var dispatch = compose(...chain)(store.dispatch);
            return {
                ...store,
                dispatch
            }
        }
    }
}

function compose () {
    var funcs = [...arguments];
    // 想要拿到 next 函数，需要倒序执行获取
    return function (dispatch) {
        for (var i = funcs.length - 1; i >= 0; i--) {
            // 执行第二层函数，返回最里层的函数
            dispatch = funcs[i](dispatch);
        }
        // 返回的最里层的函数
        return dispatch;
    }
}
```



### 6. bindActionCreators

- 作用：将 `actionCreator` 函数转换成能够触发 `action` 的函数
- 用法：`bindActionCreators({actions...}, dispatch)`
- 返回一个对象

```js
function bindActionCreators (actionCreators, dispatch) {
    var boundActionCreators = {};
    for (var key in actionCreators) {
      (function (key) {
        boundActionCreators[key] = function () {
          dispatch(actionCreators[key]())
        }
      })(key)
    }
    return boundActionCreators;
}
```



### 7. combineReducers

- 作用：将小的reducer 通过该方法组合成一个大的reducer
- 第一个参数是一个包含 store 中状态的对象，所对应的值就是处理值的状态所对应的 reducer
- 返回值是一个 `reducer` 函数

```js
function combineReducers (reducers) {
    // 1. 检查reducer类型 它必须是函数
    var reducerKeys = Object.keys(reducers);
    for (var i = 0; i < reducerKeys.length; i++) {
        var key = reducerKeys[i];
        if (typeof reducers[key] !== 'function') throw new Error('reducer must be a function');
    }
    // 2. 调用一个一个的小的reducer 将每一个小的reducer中返回的状态存储在一个新的大的对象中
    return function (state, action) {
        var nextState = {};
        for (var i = 0; i < reducerKeys.length; i++) {
            var key = reducerKeys[i];
            var reducer = reducers[key];
            var previousStateForKey = state[key];
            nextState[key] = reducer(previousStateForKey, action)
        }
        return nextState;
    }
}
```

