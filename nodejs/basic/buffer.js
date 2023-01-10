const buf1 = Buffer.alloc(10); // 开辟了一段内存空间 10个字节
// console.log(buf1)

// const buf2 = Buffer.from([1,2,3]); // 2进制的复值
// console.log(buf2)

const buf3 = Buffer.from('Buffer创建方法');
// console.log(buf3.toString())

buf1.write('hello'); // 写入

// console.log('buf1', buf1);

const buf4 = Buffer.concat([buf1, buf3]) // 拼接
console.log('buf4', buf4.toString(), "---", buf4.toJSON());