/* promise test */
/* 1. 完成一个最简单的Promise */
const Promise = require('./index');

// const res_1 = new Promise(function(resolve, reject) {
//   // resolve('最简单的Promise:resolve');
//   reject('最简单的Promise:reject')
// })
// res_1.then(res => {
//   console.log('success', res)
// }, err => {
//   console.log('rejected', err)
// })

/* 2. 异步Promise */
// const res_2 = new Promise(function(resolve, reject) {
//   setTimeout(() => {
//     // resolve('异步Promise:resolve');
//     reject('异步Promise:reject')
//   }, 100)
// })
// res_2.then(res => {
//   console.log('success', res)
// }, err => {
//   console.log('rejected', err)
// })

/* 3. then 方法多次调用添加多个处理函数 */
// const res_3 = new Promise(function(resolve, reject) {
//   // resolve('同步Promise:resolve');
//   // reject('同步Promise:reject')
//   setTimeout(() => {
//     // resolve('异步Promise:resolve');
//     reject('异步Promise:reject')
//   }, 100)
// })

// res_3.then(val => {
//   console.log('one', val)
// }, err => {
//   console.log('one', err)
// })

// res_3.then(val => {
//   console.log('two', val)
// }, err => {
//   console.log('two', err)
// })

/* 4. promise 的链式调用 */
// const res_4 = new Promise(function(resolve, reject) {
//   // resolve('同步Promise:resolve');
//   // reject('同步Promise:reject')
//   setTimeout(() => {
//     // resolve('异步Promise:resolve');
//     reject('异步Promise:reject')
//   }, 100)
// })
// const res_4_test = new Promise(function(resolve, reject) {
//   // resolve('testPromise:resolve');
//   // // reject('testPromise:reject')
//   setTimeout(() => {
//     resolve('test异步Promise:resolve');
//     // reject('test异步Promise:reject')
//   }, 100)
// })

// res_4.then(val => {
//   return 'first'
//   // return res_4_test
// }, err => {
//   return 'first-err'
// }).then(val => {
//   console.log('two', val)
// }, err => {
//   console.log('two', err)
// })

/* 5. 识别对象自返回 */
// const res_5 = new Promise(function(resolve, reject) {
//   resolve('同步Promise:resolve');
//   // reject('同步Promise:reject')
//   // setTimeout(() => {
//   //   // resolve('异步Promise:resolve');
//   //   reject('异步Promise:reject')
//   // }, 100)
// })

// const p = res_5.then((res) => {
//   console.log(res);
//   return p;
// });

/* 6. 错误捕获 */
// const res_6 = new Promise(function(resolve, reject) {
//   // resolve(new TypeError('哈哈，你错了'));
//   setTimeout(() => {
//     resolve(new TypeError('哈哈，异步你也错了'));
//   }, 100)
// })
// res_6.then((res) => {
//   console.log(res);
// });

/* 7. promise.all 方法实现 */
// const test_1 = new Promise((resolve) => {resolve('test_1')})
// const test_2 = new Promise((resolve, reject) => {resolve('test_2')})
// const test_3 = new Promise((resolve, reject) => {setTimeout(() => {resolve('test_3')}, 100)})
// const test_4 = new Promise((resolve, reject) => {setTimeout(() => {reject('test_4')}, 100)})
// Promise.all(['1', test_1, test_2, test_3, '2', test_4]).then(res => {
//   console.log("all",res)
// }, err => {
//   console.log('all-err', err)
// })

/* 8. promise.resolve 方法实现 */
// Promise.resolve('res_8').then((value) => {
//   console.log(value)
// })

/* 9. catch finally 方法实现 */
const res_9 = new Promise(function(resolve, reject) {
  resolve(new TypeError('哈哈，你错了'));
  setTimeout(() => {
    resolve(new TypeError('哈哈，异步你也错了'));
  }, 100)
})
res_9.then(val => {
  console.log('9:', val)
}).catch(err => {
  console.log('9-err', err)
}).finally(() => {
  console.log('finally')
})