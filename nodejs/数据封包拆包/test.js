const Transform = require('./transform')

const trans = new Transform()

const str = 'hello 娃哈哈'

/* console.log(Buffer.from(str))
console.log(trans.encode(str, 1)) */

const encodeBuf = trans.encode(str, 1)

// const a = trans.decode(encodeBuf)
// console.log(a)

const len = trans.getPackageLen(encodeBuf)
console.log(len)
