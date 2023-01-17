const { Seq, List, Set } = require("immutable");

// 由于 Seq 是 lazy 的， 因此下面的链式调用是不会被立即执行的，只有当 seq 被调用的时候，才会被执行
const seq = Seq([1, 2, 3, 4, 5, 6, 7, 8])
    .filter(x => x % 2 !== 0)
    .map(x => x * x)


// 可以通过 Seq 方法把任意 collection 转换成 Seq
const list = List([1, 3, 2, 4])
const list_seq = Seq(list)

// console.log(list_seq)

// Seq.keyed: 键值对类型
const obj = {x: 1, y: 2, z: 3}
const seqK = Seq.Keyed(obj)
console.log(seqK)

// Seq.Indexed

// Seq.Set
const seqSet = Seq.Set(Set([11, 22, 33, 33]))
console.log(seqSet.toJS())