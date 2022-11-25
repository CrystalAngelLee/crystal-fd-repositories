import * as XLSX from 'xlsx' //必要依赖
import FileSaver from 'file-saver' //必要依赖
import _ from 'lodash'

// 三个参数，fileName是生成的Excel文件名，headers是文件的头部，dataSource为具体的json数据
export const exportExcel = (headers, dataSource, fileName) => {
  try {
    //如果value的json字段的key值和想要的headers值不一致时，可做如下更改
    //将和下面的Object.fromEntries结合，将json字段的key值改变为要求的excel的header值
    const keyMap = {
      id: 'headerId',
      key1: 'header1',
      key2: 'header2',
      key3: 'header3',
      key4: 'header4',
      key5: 'header5',
      key6: 'header6',
    }
    console.log(333, dataSource, headers)
    const data = _.chain(dataSource)
      .map((i) => {
        let ne = _.cloneDeep(i)
        const rzt = {
          ..._.pick(ne, headers),
        }
        const newRzt = Object.keys(rzt).reduce((newData, key) => {
          newData[keyMap[key] || key] = rzt[key]
          return newData
        }, {})

        console.log('newRzt', newRzt)

        return newRzt
      })
      .value()
    if (_.isEmpty(dataSource)) {
      console.log('没数据')
      return
    }
    console.log('data', data)

    //创建一个新的工作簿对象
    const workbook = XLSX.utils.book_new()
    //将json对象数组转化成工作表
    let ws = XLSX.utils.json_to_sheet(data)
    ws['!cols'] = [
      //设置每一列的宽度
      { wch: 30 },
      { wch: 50 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 50 },
    ]
    // s 意为 start ，即开始的单元格
    // r 是 row ，表示行号，从 0 计起
    // c 是 col ，表示列号，从 0 计起
    ws['!merges'] = [
      // 纵向合并，范围是第1列的行1到行2
      { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
      // 横向合并，范围是第1行的列3到列4
      { s: { r: 0, c: 3 }, e: { r: 0, c: 4 } },
    ]
    XLSX.utils.book_append_sheet(workbook, ws, 'sheet1') //把sheet添加到workbook里，第三个参数是sheet名
    const wopts = { bookType: 'xlsx', bookSST: false, type: 'array' } //写入的样式bookType:输出的文件类型，type：输出的数据类型，bookSST: 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    const wbout = XLSX.write(workbook, wopts) // 浏览器端和node共有的API,实际上node可以直接使用xlsx.writeFile来写入文件,但是浏览器没有该API
    //保存文件
    FileSaver.saveAs(
      new Blob([wbout], { type: 'application/octet-stream' }),
      `${fileName} ${new Date().getTime().toString()}.xlsx`
    )
  } catch (e) {
    console.log(e, e.stack)
  }
}
