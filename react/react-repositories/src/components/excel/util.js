import { utils, writeFileXLSX, read } from 'xlsx'

const setWorkSheet = (ws, headers) => {
  // ws['!cols'] = headers.map(({ width }) => ({ wch: 40 }))
  /* 合并单元格 */
  // s 意为 start ，即开始的单元格
  // r 是 row ，表示行号，从 0 计起
  // c 是 col ，表示列号，从 0 计起
  ws['!merges'] = [
    // 纵向合并，范围是第1列的行1到行2
    { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
    { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
    { s: { r: 0, c: 18 }, e: { r: 1, c: 18 } },
    // 横向合并，范围是第1行的列3到列7
    { s: { r: 0, c: 2 }, e: { r: 0, c: 6 } },
    { s: { r: 0, c: 7 }, e: { r: 0, c: 11 } },
    { s: { r: 0, c: 12 }, e: { r: 0, c: 15 } },
    { s: { r: 0, c: 16 }, e: { r: 0, c: 17 } },
  ]
}

const exportFile = (data, sheetName, fileName, { headers }) => {
  // 1. 生成worksheet
  const ws = utils.aoa_to_sheet(data)
  // 设置worksheet格式
  setWorkSheet(ws, headers)
  // 2. 创建workbook
  const wb = utils.book_new()
  // 3. 将sheet加入到book中
  utils.book_append_sheet(wb, ws, sheetName)
  // 4. 生产文件并下载
  writeFileXLSX(wb, fileName)
}

// 三个参数，fileName是生成的Excel文件名，headers是文件的头部，dataSource为具体的json数据
export const exportExcel = (headers, dataSource, fileName) => {
  try {
    const sheetName = 'sheet1'
    fileName = `${fileName ? fileName + '-' : ''}${new Date()
      .getTime()
      .toString()}.xlsx`

    const _headers = headers.map(({ title }) => title)
    const _dataSource = dataSource.reduce((p, c) => {
      const c_data = []
      headers.forEach(({ key }) => {
        c_data.push(c[key])
      })
      return [...p, c_data]
    }, [])
    const output = [_headers, ..._dataSource]
    exportFile(output, sheetName, fileName, { headers })
  } catch (e) {
    console.log(e, e.stack)
  }
}

export const parseExcel = (file) => {
  let reader = new FileReader()
  let rABS =
    typeof FileReader !== 'undefined' &&
    (FileReader.prototype || {}).readAsBinaryString
  if (rABS) {
    reader.readAsBinaryString(file)
  } else {
    reader.readAsArrayBuffer(file)
  }
  reader.onload = function (e) {
    let data = e.target.result
    if (!rABS) {
      data = new Uint8Array(data)
    }
    let workBook = read(data, { type: rABS ? 'binary' : 'array' })
    workBook.SheetNames.forEach((name) => {
      let sheet = workBook.Sheets[name]
      let json = utils.sheet_to_json(sheet, {
        raw: false,
        header: 1,
      })
      // TODO 处理数据
    })
  }
}
