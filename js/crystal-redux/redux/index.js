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

function createStore (reducer, preloadedState, enhancer) {
    // reducer 类型判断
    if (typeof reducer !== 'function') throw new Error("reducer must be a function")

    // 判断是否传递了 enhancer 函数 && enhancer 是一个函数
    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
          throw new Error('enhancer must be a function')
        }
        return enhancer(createStore)(reducer, preloadedState);
    }

    // 状态值
    var currentState = preloadedState;
    // 订阅者函数
    var currentListeners = []

    // 获取状态
    function getState () {
        return currentState
    }

    // 触发 action
    function dispatch (action) {
        // 判断action是否是一个对象
        if (!isPlainObject(action)) throw new Error('action must be a object');
        // 判断action中的type属性是否存在
        if (typeof action.type === 'undefined') throw new Error('action对象中必须有type属性');

        currentState = reducer(currentState, action)
        // 调用订阅者 通知订阅者状态发生了改变
        for (var i = 0; i < currentListeners.length; i++) {
            // 获取订阅者
            var listener = currentListeners[i];
            // 调用订阅者
            listener();
        }
    }

    // 订阅状态
    function subscribe (listener) {
        currentListeners.push(listener)
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}


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