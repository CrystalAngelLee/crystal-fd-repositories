const { List } = require("immutable");

/*******  创建 ********/
const list = List([1, 2, 3, 4])
// console.log(list)

/******* 静态方法 *******/
/**
 * List.isList 
 * 判断是否是 List 类型
 */ 
// console.log(List.isList(list), List.isList([1, 2, 3]))
/**
 * List.of
 * 创建新的List
 * 跟工厂方法类型不同的是工厂方法的参数类型是数组，List.of 的参数不需要加中括号
 */
const listarr = List.of(1, 2, 3)

/******* API *******/
/**
 * size
 * 获取list 的长度
 */
// console.log('size', listarr.size)

/**
 * set方法
 * 设定指定下标的值
 * 下标是可以超过最大长度的，会将中间没有值的坑位填为 undefined
 * 下标可以是负值 从右往左查
 */
const list_1 = listarr.set(0, 100)
const list_2 = listarr.set(10, 100)
const list_3 = listarr.set(-1, 100)
// console.log(list_1, list_2, list_3)

/**
 * delete
 * 删除指定下标的值
 * 下标可以是负值 从右往左查
 */
const deletarr = List([1, 2, 3, 4])
const deletarr_1 = deletarr.delete(0)
const deletarr_2 = deletarr.delete(-2)
// console.log(deletarr_1, deletarr_2)

/**
 * insert
 * 插入值
 * 会进行完整的拷贝
 * 下标可以是负值 从右往左查
 */
const insert = List([1, 2, 3])
const insert_1 = insert.insert(1, 666)
// console.log(insert_1)

/**
 * update
 * 更新指定下标的值
 */
const u = List([1, 2, 3, 4]);
const u1 = u.update(1, x => x + 100);
// console.log(u1)

/**
 * clear
 * 清空并返回一个长度为0的新数组
 */
const c = List([1, 2, 3, 4]);
const c1 = c.clear();
// console.log(c, c1)

/**
 * setSize
 * 重新设定数组长度，小于原数组长度会截断
 * 大于原数组长度会用 undefined 进行填充
 */
const s = List([1, 2, 3, 4]);
const s1 = s.setSize(2);
const s2 = s.setSize(10);
// console.log(s, s1, s2)

/**
 * setIn() 
 * 用来设定嵌套结构的值
 * ([第一层下标,第二层下标,...第N层下标], 值)
 * 同理还有 deleteIn, insertIn, updateIn
 */
const si = List([
    List([1, 2, 3, 4]),
    List([11, 22, 33, 44]),
    List([111, 222, 333, 444]),
])
const si1 = si.setIn([2, 1], 0)
// console.log(si1)

/**
 * concat 
 * 连接 List 
 * concat(List1, List2, ...ListN)
 */
const con1 = List([1, 2, 3, 4])
const con2 = List([2, 4, 6, 4])
const con3 = List([11, 22, 33])
const con = con1.concat(con2, con3)
// console.log(con)
const mer = con1.merge(con2, con3)
// console.log(mer)

/**
 * flatten
 * 扁平化 list
 */
const f = si.flatten(true);
// console.log(f)

/**
 * find
 * 查找，返回第一个符合的结果
 */
const f1 = List(['a', 'b', 'c', 'a1'])
const f2 = f1.find((v, k) => v.includes('a'))
// console.log(f2)

/**
 * findLast 
 * 查找，返回最后一个符合的结果
 */
const f3 = f1.findLast((v, k) => v.includes('a'))
// console.log(f3)

/**
 * keys
 * 返回所有的下标
 */
for (const k of f1.keys()) {
    // console.log('k', k)
}

/**
 * values
 * 返回所有的值
 */
for (const v of f1.values()) {
    console.log('v', v)
}

/**
 * entries
 * 返回所有 entry
 */
for (const entry of f1.entries()) {
    console.log('entry', entry)
}

/**
 * groupBy
 * 分组
 * 当数组中的元素是对象的时候，我们可以通过对象中的属性进行分组
 */
const group = List([
    { id: 1, type: 'a'},
    { id: 2, type: 'a'},
    { id: 3, type: 'b'},
    { id: 4, type: 'b'},
])

const g = group.groupBy(x => x.type)
console.log(g)