const { Map, List } = require("immutable");

const map = Map({ x: 1, y: 2 })
// console.log(map.entries())

/**
 * set
 * 设定值
 * key、value 可以是任意类型
 */
const m = Map({ x: 1, y: 2 })
const m1 = m.set('z', 3)
const m2 = m.set(List([1]), { user: 'w' })
// console.log(m1, m2)

/**
 * get
 * 取值
 */
// console.log(m1.get('z'))

/**
 * delete
 * 删除值
 */
const d = Map({ x: 1, y: 2 })
const d1 = d.delete('x')
// console.log(d1)

/**
 * deleteAll
 * 批量删除
 */
const da = Map({ x: 1, y: 2, z: 3, u: 2 })
const da1 = da.deleteAll(['x', 'z'])
// console.log(da1)

/**
 * clear 
 * 清除所有返回新Map
 */
const cl = da.clear();
// console.log(cl)

/**
 * update
 * 更新
 */
const up = Map({
    name: 'a',
    salary: 1000
})
const up1 = up.update("salary", x => x * 2)
// console.log(up1.get('salary'))

/**
 * merge
 * 合成 N 个 Map 为一个 Map
 */
const m_1 = Map({ x: 1, y: 2 })
const m_2 = Map({ y: 33, z: 3 })
const _m = m_1.merge(m_2)
// console.log(_m)

/**
 * mergeWith
 * 类似于 merge, 但是指定了 merge 的具体规则
 */
const m_3 = m_1.mergeWith((oldVal, newVal) => (newVal + '!!!'), m_2)
// console.log(m_3)

/**
 * setIn
 * 对于嵌套解构来进行设置值
 * setIn([层次1key, 层次2key, ...层次Nkey], key)
 * 同样的嵌套层次的操作还有 deleteIn, updateIn, mergeIn
 */
const deep = Map({
    l1: Map({
        l2: Map({
            l3: Map({
                l4: 'w'
            })
        })
    })
})
const deep1 = deep.setIn(['l1', 'l2', 'l3', 'l4'], 'h')
// console.log(deep1)

/**
 * toJS
 * 把 map 转换成原生 object, 深转换
 */
// console.log(deep.toJS())

/**
 * toJSON
 * 把 map 转换成原生 object, 浅转换
 */
// console.log(deep.toJSON())

/**
 * toObject
 * 转换成 object, 浅转换
 */
//  console.log(deep.toObject())

/**
 * toArray
 * 转换成数组, 浅转换
 */
const arr = Map({ x: 1, y: 2, z: 3 })
const arr1 = arr.toArray()
// console.log(arr1)

/**
 * equals 
 * 判断两个map的值是否相等
 */
const _m1 = Map({ x: 1, y: 2, z: 3 })
const _m2 = Map({ x: 1, y: 2, z: 3 })
// console.log(_m1.equals(_m2))

/**
 * find
 * 查找，匹配到的第一个
 */
const f1 = Map({ x: 1, y: 2, z: 3, u: 'zhang', u1: 'li' })
const f2 = f1.find(v => typeof v === 'string')
// console.log(f2)
/**
 * findLast
 * 查找，匹配到的第二个
 */

/**
 * flatten
 * 拉平 Map
 * 把有值的那一层拉出来
 */
// console.log(deep.flatten(false))

/**
 * has
 * 判断是否有指定的key
 */
const h = Map({ x: 1, y: 2, z: 3 })
console.log(h.has('x'))

/**
 * includes
 * 判断是否有指定的value
 */
console.log(h.includes(1))

/**
 * 迭代
 * forEach
 */
h.forEach((v, k) => console.log(v, k))