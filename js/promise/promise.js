/* 手写promise实现 */
/**
 * 1. 完成一个最简单的Promise
 * 2. 异步Promise
 * 3. then 方法多次调用添加多个处理函数
 * 4. promise 的链式调用
 * 5. 识别对象自返回
 * 6. 错误捕获
 * 7. promise.all 方法实现
 * 8. promise.resolve 方法实现
 * 9. finally 方法实现
 */
// 三种状态
const PENDING = 'pending', FULFILLED = 'fulfilled', REJECTED = 'rejected'
class MyPromise {
  constructor(excutor) {
    try {
      excutor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e)
    }
  }

  status = PENDING;         // 当前的状态
  value = undefined;        // 成功的值
  reason = undefined;       // 失败的值
  onFulfilled = [];         // 存储成功后的回调
  onRejected = [];          // 存储失败后的回调

  resolve = (value) => {
    // must not transition to any other state
    if (this.status !== PENDING) return
    this.status = FULFILLED;
    this.value = value;
    while(this.onFulfilled.length) this.onFulfilled.shift()()
  }

  reject = (reason) => {
    // must not transition to any other state
    if (this.status !== PENDING) return
    this.status = REJECTED;
    this.reason = reason
    while(this.onRejected.length) this.onRejected.shift()()
  }

  then(onFulfilled = val => val, onRejected = err => {throw err}) {
    const promise = new MyPromise((resolve, reject) => {
      let func = undefined;
      switch (this.status) {
        case FULFILLED:
          setTimeout(() => {
            try {
              func = onFulfilled(this.value);
              resolvePromise(promise, func, resolve, reject)
            } catch (e) {
              reject(e);
            }
          }, 0)
          break;
        case REJECTED:
          setTimeout(() => {
            try {
              func = onRejected(this.reason);
              resolvePromise(promise, func, resolve, reject)
            } catch (e) {
              reject(e);
            }
          }, 0)
          break;
        default: // pending状态
          this.onFulfilled.push(() => {
            setTimeout(() => {
              try {
                func = onFulfilled(this.value)
                resolvePromise(promise, func, resolve, reject)
              } catch (e) {
                reject(e);
              }
            }, 0)
          })
          this.onRejected.push(() => {
            setTimeout(() => {
              try {
                func = onRejected(this.reason)
                resolvePromise(promise, func, resolve, reject)
              } catch (e) {}
            }, 0)
          })
      }
    })

    return promise
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(cb) {
    this.then(val => MyPromise.resolve(cb()).then(() => val), err => MyPromise.resolve(cb()).then(() => {throw err}))
  }

  static all (array) {
    let res = [];
    return new MyPromise((resolve, reject) => {
      const addData = (key, val) => {
        res[key] = val;
        if (res.length === array.length) {
          resolve(res)
        }
      }
      for (let i = 0, len = array.length; i < len; i++) {
        let cur = array[i];
        if (cur instanceof MyPromise) {
          cur.then((val) => addData(i, val), err => reject(err))
        } else {
          addData(i, cur)
        }
      }
    })
  } 
  
  static resolve(val) {
    if (val instanceof MyPromise) return val;
    return new MyPromise(resolve => resolve(val))
  }
}

function resolvePromise(promise, func, resolve, reject) {
  // 识别对象自返回
  if (func === promise) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    )
  }
  // 返回promise
  if (func instanceof MyPromise) {
    func.then(resolve, reject)
  } else {
    resolve(func)
  }
}

module.exports = MyPromise