const { OrderedSet } = require("immutable");

const set = OrderedSet([2, 4, 6, 8, 1, 3, 5, 7, 9])
const set1 = set.takeWhile(t => t % 2 === 0)
console.log(set1.toJS())