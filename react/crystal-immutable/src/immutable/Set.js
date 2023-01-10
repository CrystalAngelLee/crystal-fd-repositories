const { Set } = require("immutable");

// set 是无序的数据结构
const set = Set([1, 2, 3, 4, 5, 5, 5, 5, 1])
// console.info(set.toJS()) // [ 1, 2, 3, 4, 5 ]

/**
 * add
 * 添加值
 */
const ad = set.add(6)
// console.log(ad.toJS())

/**
 * delete
 * 删除值
 * 删除的是值，而不是下标
 */
const de = set.delete(2)
// console.log(de.toJS())

/**
 * clear
 * 清空并返回新的Set
 */
const cl = set.clear()
// console.log(cl.toJS())

/**
 * union N 个 set 合并成一个 set
 */
const u1 = Set([1, 2, 3])
const u2 = Set(['3', '4', '5'])
const u3 = u1.union(u2)
// console.log(u3.toJS()) // [ 1, 2, 3, '3', '4', '5' ]

/**
 * intersect
 * 取 N 个set的交集
 */
const in1 = Set([1, 2, 3])
const in2 = Set([3, 4, 5])
const in3 = in1.intersect(in2)
// console.log(in3.toJS()) // [ 3 ]

/**
 * subtract
 * 从 set 除去一些值
 */
const su1 = Set([1, 2, 3])
const su2 = su1.subtract([1, 3])
// console.log(su2.toJS()) // [ 2 ]

/**
 * forEach
 * 循环
 */
const fe = Set(['x', 'y', 'z'])
fe.forEach((v, k) => console.log(k, v))

/**
 * get
 * 取值
 * key 和 value 是一样的
 */

/**
 * has
 * 判断是否包含指定的Key
 */

/**
 * includes
 * 判断是否包含指定的 value
 */

/**
 * rest
 * 除了第一个的其余元素
 */

/**
 * butLast
 * 除了最后一个的其余元素
 */

/**
 * skip(number)
 * 略过前 N 个元素，取得其余元素
 */

/**
 * skipLast(number)
 * 略过最后 N 个元素，取得其余元素
 */

/**
 * skipWhile((value: T, key: T, iter: this) => boolean)
 * 当判断条件为 false 时，取得当前以及后面的元素
 */
const sk = Set(['hello', 'world', 'good', 'bad', 'just', 'little'])
//略掉包含o 的元素
const sk1 = sk.skipWhile(s => s.includes('o'))
// console.log(sk1.toJS()) // [ 'bad', 'just', 'little' ]

/**
 * skipUntil((value: T, key: T, iter: this) => boolean)
 * 当判断条件为 true 时，取得当前以及后面的元素
 */
const sk2 = sk.skipUntil(s => s.includes('o'))
// console.log(sk2.toJS()) // [ 'hello', 'world', 'good', 'bad', 'just', 'little' ]

/**
 * take(number)
 * 取得前 N 个元素
 */

/**
 * takeLast(number)
 * 取得最后N个元素
 */

/**
 * takeWhile((value: T, key: T, iter: this) => boolean)
 * 从前向后取元素，当判断条件为 false 时为止
 */
const tw = Set([2, 4, 6, 8, 1, 3, 5, 7, 9])
const tw1 = tw.takeWhile(t => t % 2 === 0)
console.log(tw.toJS()) // 这里取到的是空，原因是Set是一个无序存储的数据结构，在当前的需求中就出现了问题

/**
 * takeUntil((value: T, key: T, iter: this) => boolean)
 * 从前向后取元素，当判断条件为 true 时为止
 */
