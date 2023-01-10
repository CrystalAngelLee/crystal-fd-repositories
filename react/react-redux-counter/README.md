## React + Redux 实现简单计数器

一、安装依赖

`npm install redux react-redux redux-thunk redux-saga redux-actions`

二、原生化处理

详见：`.src/index.native.js`

三、简易计数器

使用技术：
react-redux + bindActionCreators

四、指定增减数值计数器

比 `简易计数器` 多了加入方法参数的功能

五、 延迟执行计数

加入异步方法处理，使用 redux-saga/ redux-thunk 中间件完成

并自行实现了 redux-thunk 处理

六、CreactAction counter

使用 redux-actions 中间件简化 action 和 reducer 的处理