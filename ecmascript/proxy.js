/**
 * 基本语法：const p = new Proxy(target, handler)
 * @target 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）
 * @handler 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为
 */

const person = {
  name: 'crystal',
  age: 3,
}

const obj = new Proxy(
  {},
  {
    get: function (target, propKey, receiver) {
      console.log(`getting ${propKey}!`)
      return Reflect.get(target, propKey, receiver)
    },
    set: function (target, propKey, value, receiver) {
      console.log(`setting ${propKey}!`)
      return Reflect.set(target, propKey, value, receiver)
    },
  }
)

obj.count = 1
console.log(obj)
