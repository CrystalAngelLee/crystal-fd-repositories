class TransformCode {
  constructor() {
    this.packageHeaderLen = 4 // header 总长度 4个字节
    this.serialNum = 0 // 序列号
    this.serialLen = 2 // 消息长度
  }

  /**
   * 编码
   * @param {*} data 要编码的数据
   * @param {*} serialNum 数据包的编号
   */
  encode(data, serialNum) {
    // 将数据变为二进制
    const body = Buffer.from(data)

    /* 封装header */
    // 1 按照指定的长度申请一片内存空间
    const headerBuf = Buffer.alloc(this.packageHeaderLen)

    // 2 将序列号写入
    headerBuf.writeInt16BE(serialNum || this.serialNum)
    // 将数据总长度写入 需要跳过序列号
    headerBuf.writeInt16BE(body.length, this.serialLen)

    if (serialNum === undefined) {
      this.serialNum++
    }

    return Buffer.concat([headerBuf, body])
  }

  /**
   * 解码
   * @param {*} buffer 要解码的数据
   */
  decode(buffer) {
    const headerBuf = buffer.slice(0, this.packageHeaderLen)
    const bodyBuf = buffer.slice(this.packageHeaderLen)

    return {
      serialNum: headerBuf.readInt16BE(),
      bodyLength: headerBuf.readInt16BE(this.serialLen),
      body: bodyBuf.toString(),
    }
  }

  // 获取包长度
  getPackageLen(buffer) {
    if (buffer.length < this.packageHeaderLen) return 0
    return this.packageHeaderLen + buffer.readInt16BE(this.serialLen)
  }
}

module.exports = TransformCode
