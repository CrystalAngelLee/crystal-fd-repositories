import { utils, write, writeFileXLSX } from 'xlsx' //必要依赖
import FileSaver from 'file-saver' //必要依赖
import _ from 'lodash'

// 三个参数，fileName是生成的Excel文件名，headers是文件的头部，dataSource为具体的json数据
export const exportExcel = (headers, dataSource, fileName) => {
  try {
    const _headers = {}
    headers.forEach(({ key, title }) => {
      _headers[key] = title
    })
    console.log('_headers', _headers, dataSource)
    const data = [_headers, ...dataSource]
    console.log('data', data)

    //将json对象数组转化成工作表
    const ws = utils.json_to_sheet(data)
    //创建一个新的工作簿对象
    const wb = utils.book_new()
    ws['!cols'] = headers.map(({ width }) => ({ wch: width || 60 }))
    // s 意为 start ，即开始的单元格
    // r 是 row ，表示行号，从 0 计起
    // c 是 col ，表示列号，从 0 计起
    ws['!merges'] = [
      // 纵向合并，范围是第1列的行1到行2
      { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
      // 横向合并，范围是第1行的列3到列4
      { s: { r: 0, c: 3 }, e: { r: 0, c: 7 } },
      { s: { r: 1, c: 3 }, e: { r: 1, c: 7 } },
    ]
    utils.book_append_sheet(wb, ws, 'sheet1') //把sheet添加到wb里，第三个参数是sheet名
    writeFileXLSX(wb, `${fileName} ${new Date().getTime().toString()}.xlsx`)
    // const wopts = { bookType: 'xlsx', bookSST: false, type: 'array' } //写入的样式bookType:输出的文件类型，type：输出的数据类型，bookSST: 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    // const wbout = write(wb, wopts) // 浏览器端和node共有的API,实际上node可以直接使用xlsx.writeFile来写入文件,但是浏览器没有该API
    // //保存文件
    // FileSaver.saveAs(
    //   new Blob([wbout], { type: 'application/octet-stream' }),
    //   `${fileName} ${new Date().getTime().toString()}.xlsx`
    // )
  } catch (e) {
    console.log(e, e.stack)
  }
}
