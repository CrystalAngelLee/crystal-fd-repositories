# immutable.js

## 概述

Facebook 工程师 lee byron 花费 3 年时间打造，与 react 同期出现，但没有被默认放到 react 工具集里（React 提供了简化的 helper）

它内部实现了一套完整的 Persistent Data Structure，还有很多易用的数据类型。像 Collection、List、Map、Set、Record、Seq、...

**三种重要的数据结构**：

- Map: 键值对集合，对应于 Object，ES6 也有专门的 Map 对象
- List: 有序可重复的列表，对应于 Array
- Set: 无需且不可重复的列表

📢  Immutable Data 就是一旦创建，就不能再被更改的数据。
📢  对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。



**Link 指向**

[官网指南](https://immutable-js.com/)

[中文参考文档](https://github.com/guisturdy/immutable-js-docs-cn)



## 两个问题

通过 `概述` 部分我们了解到了 `immutable.js` 的一些内容，但是 **为什么我们需要 `immutable.js`** 呢？ **使用它就一定是好的吗？**

我们来回答一下这两个问题

**Q1：为什么我们需要  `immutable.js` 不可改变数据呢？ **  

1. 这通常跟 Redux 这样的应用有关，Redux 有一个基本原则是**Redux 里面的数据是只读的**，所以我们在Redux 里面操作数据的时候首先需要对数据进行拷贝操作（我们知道拷贝是有一定的性能消耗的）
2. 有一种场景：一个数据在多方法处被共享使用，如果某一个地方将数据更改了，另一个使用的地方就容易出问题，如果出现了问题，在这种场景下我们是很难去发现问题点在哪里的，从而导致项目不稳定

因为上述两点原因，所以我们往往需要数据在传递的过程中是 `只读的`（数据修改往往是BUG的源头）

**Q2： `immutable.js`  的优缺点有哪些？**

1. **优点**
   - 降低 `Mutable` 带来的复杂度
   - 节省内存空间
     如果不使用 `immutable` 进行深拷贝，我们会将整个对象进行深拷贝，可能只是为了对象中的某一个属性（这对内存空间来讲消耗是很大的）
     使用 `immutable` 进行深拷贝修改对象中的某一个属性，他只会修改需要改变的那一个属性，其他的不变（如果这个对象比较大，这样的操作将节约很大的内存空间）
   - 方便开发 Undo / Redo，Copy / Paste
     Copy / Paste： 每一次操作都是对对象的一次拷贝
     Undo / Redo：每一次操作都是对数据的改变，每一次改变都会被放置在一个数组里面，当需要撤销操作的时候就将数组里的数据pull 出来即可（undo/redo 就是数据在数组中的 pull/push 操作）
   - 拥抱函数式编程

2. **缺点**
   - 容易与原生对象混淆



## 常用 API

> 通过以上内容的认识，我们发现 `immutable.js` 很值得使用
>
> 📢 说明一下：这一部分在梳理的时候发现[官方文档]((https://immutable-js.com/))已经是最好的文档了，中文详细一点的可以参考[中文参考文档](https://github.com/guisturdy/immutable-js-docs-cn)，Crystal 这里大致上列举一些API 出来用作入门

### List

> List 对应原生JS 的数组结构，创建List 的时候需要注意：**List 是工厂方法，不能使用 new 初始化**
>
> `const list = List([1, 2, 3, 4])`

#### 静态方法

##### List.isList()

判断是否是 List 类型

`console.log(List.isList(list), List.isList([1, 2, 3]))`

##### List.of()

创建新的List（跟工厂方法类型不同的是工厂方法的参数类型是数组，List.of 的参数不需要加中括号）

`const listarr = List.of(1, 2, 3)`

#### 属性

##### size

取list 的长度

`console.log('size', listarr.size)`

#### APIS

##### set

> set 方法用来设定指定下标的值 `set(下标, 值)`

- set 设置的下标是可以超过最大长度的，会将中间没有值的坑位填为 undefined
- 下标可以是负值 从右往左查

```js
const list_1 = listarr.set(0, 100)
const list_2 = listarr.set(10, 100)
const list_3 = listarr.set(-1, 100)
```

##### delete

> 删除指定下标的值 `delete(下标)`

- 下标可以是负值 从右往左查

```js
const deletarr = List([1, 2, 3, 4])
const deletarr_1 = deletarr.delete(0)
const deletarr_2 = deletarr.delete(-2)
```

##### insert

> 插入值 `insert(下标,值)`

- 下标可以是负值 从右往左查
- 该操作会对数组进行完整的拷贝

```js
const insert = List([1, 2, 3])
const insert_1 = insert.insert(1, 666)
```

##### update

> 更新指定下标的值 update(下标，callback)

```js
const u = List([1, 2, 3, 4]);
const u1 = u.update(1, x => x + 100);
```

##### clear

> 清空并返回一个长度为0的新数组

```js
const c = List([1, 2, 3, 4]);
const c1 = c.clear();
```

**push pop unshift shift 同数组的同名方法**

##### setSize

重新设定数组长度，小于原数组长度会截断，大于原数组长度会用 undefined 进行填充

```js
const s = List([1, 2, 3, 4]);
const s1 = s.setSize(2);
const s2 = s.setSize(10);
```

##### setIn()

> 用来设定嵌套结构的值 ` ([第一层下标,第二层下标,...第N层下标], 值)`
>
> 同理还有 deleteIn, insertIn, updateIn

```js
const si = List([
    List([1, 2, 3, 4]),
    List([11, 22, 33, 44]),
    List([111, 222, 333, 444]),
])
const si1 = si.setIn([2, 1], 0)
```

##### concat

> 连接 List `concat(List1, List2, ...ListN)`

```js
const con1 = List([1, 2, 3, 4])
const con2 = List([2, 4, 6, 4])
const con3 = List([11, 22, 33])
const con = con1.concat(con2, con3)
```

##### merge

> concat 的别名

```js
const con1 = List([1, 2, 3, 4])const con2 = List([2, 4, 6, 4])const con3 = List([11, 22, 33])const mer = con1.merge(con2, con3)console.log(mer)
```

##### map

> 同原生map，循环过滤并返回新的List

##### filter

> 同原生filter，循环过滤并返回新的List

##### flatten

> 扁平化 list
>
> 参数： depth?: number || shallow?: boolean

##### find

> 查找，返回第一个符合的结果

```js
const f1 = List(['a', 'b', 'c'])const f2 = f1.find((v, k) => v.includes('a'))
```

##### findLast

> 查找，返回最后一个符合的结果

```js
const f3 = f1.findLast((v, k) => v.includes('a'))
```

##### keys

> 返回所有的下标

```js
for (const k of f1.keys()) {    console.log('k', k)}
```

##### values

> 返回所有的值

```js
for (const v of f1.values()) {    console.log('v', v)}
```

##### entries

> 返回所有 entry

```js
for (const entry of f1.entries()) {    console.log('entry', entry)}
```

##### groupBy

> 分组

当数组中的元素是对象的时候，我们可以通过对象中的属性进行分组

```js
const group = List([    { id: 1, type: 'a'},    { id: 2, type: 'a'},    { id: 3, type: 'b'},    { id: 4, type: 'b'},])const g = group.groupBy(x => x.type)
```



### Map

> Map 对应原生JS的object 结构，他是无序的
>
> Map 是 **工厂方法**， 不要使用 new 实例化

`const map = Map({ x: 1, y: 2 })`


#### set

> 设定值 set(key, value) `set(key, value)`

- key、value 可以是任意类型

```js
const m = Map({ x: 1, y: 2 })const m1 = m.set('z', 3)const m2 = m.set(List([1]), { user: 'w' })
```

#### get

> 取值

`console.log(m1.get('z'))`

#### delete

> 删除值

```js
const d = Map({ x: 1, y: 2 })const d1 = d.delete('x')
```

#### deleteAll

> 批量删除 `deleteAll([key1, key2, ..., keyN])`

```js
const da = Map({ x: 1, y: 2, z: 3, u: 2 })const da1 = da.deleteAll(['x', 'z'])
```

#### clear

> 清除所有返回新Map

`const cl = da.clear();`

#### update

> 更新 `update(key, callback)`

#### merge

> 合成 N 个 Map 为一个 Map `merge(map1, map2, ...mapN)`

- 类似于原生的 Object.assgin() 的功能

#### concat

> merge 的别名

#### mergeWith

> 类似于 merge, 但是指定了 merge 的具体规则(如果遇到重复的值，合并的规则)

```js
const m_1 = Map({ x: 1, y: 2 })const m_2 = Map({ y: 33, z: 3 })const m_3 = m_1.mergeWith((oldVal, newVal) => (newVal + '!!!'), m_2)
```



### OrderedMap

> 有序的Map, 迭代输出的顺序是调用set的顺序。为了维护顺序，所以需要更高的开销

如果没有顺序的需求，推荐使用 Map

```js
const map = OrderedMap({})const map2 = map.set('z', 1);const map3 = map2.set('x', 2);
```



### Set

> Set 可以理解为 value 唯一的数组，即数组中不允许出现重复的值
>
> Set 是工厂方法，不允许 new 来实例化，会自动去重



### OrderSet

> OrderSet 是有序的 Set, 他的顺序是调用 add 添加元素的顺序，拥有Set 的所有方法和属性

#### sort

> 排序方法 sort((valueA: T, valueB: T) => number)

升序： valueA - valueB

降序： valueB - valueA



### Seq

> Seq 描述了一个 “懒” 操作，允许使用 collection 的告诫方法的高效地链式调用，但是不会生成中间的 collections（Map,List,Set, ...）

- Seq  is immutable Seq 是不可改变的
- Seq is lazy  Seq 是懒的



### immutable 对象和原生对象的相互转换

#### 原生对象转 immutable 对象

`fromJS()` 能够把原生的数组或者对象转换成对应的 List 或者 Map

```js
const map = immutable.fromJS({ x: 1, y: 2})
```

#### immutable 对象转原生对象

`toJS()` 转换为原生对象

- List -> 数组
- Set -> 数组
- Map -> 对象

```js
const list = List([1, 2, 3, 4]).toJS()
```



### Range

> `Range()` 根据给定的范围生成过一个Seq



### Repeat

重复生成 N 个值得Seq, 当没有传入 times 的时候，会生成长度为 infinite 的 Seq



# 与 react + redux 结合使用

在 redux 中需要使用 `immutable.js` 的情况，需要使用到 `redux-immutable` 库



