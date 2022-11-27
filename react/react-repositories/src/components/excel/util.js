import { utils, writeFileXLSX, read } from 'xlsx'

const getSheetCol = (keyList, dataSource) =>
  dataSource.reduce((p, c) => {
    const c_data = []
    keyList.forEach((key) => {
      c_data.push(c[key])
    })
    return [...p, c_data]
  }, [])

export const exportExcel = (headers, dataSource, fileName) => {
  try {
    const { dataIndex, dataSource: headerSource, colsWidth, merges } = headers
    const sheetName = 'sheet1'
    fileName = `${fileName ? fileName + '-' : ''}${new Date()
      .getTime()
      .toString()}.xlsx`

    /* 合并处理表格数据 */
    const _headers = getSheetCol(dataIndex, headerSource)
    const _dataSource = getSheetCol(dataIndex, dataSource)
    const output = [..._headers, ..._dataSource]

    /* sheet 生产文件 */
    // 1. 生成worksheet
    const ws = utils.aoa_to_sheet(output)
    // 设置worksheet样式
    if (colsWidth && colsWidth.length > 0) {
      ws['!cols'] = dataIndex.map((_, idx) => ({ wch: colsWidth[idx] || 20 }))
    }
    if (merges && colsWidth.length > 0) {
      /* 合并单元格 */
      // s 意为 start ，即开始的单元格
      // r 是 row ，表示行号，从 0 计起
      // c 是 col ，表示列号，从 0 计起
      ws['!merges'] = merges
    }
    // 2. 创建workbook
    const wb = utils.book_new()
    // 3. 将sheet加入到book中
    utils.book_append_sheet(wb, ws, sheetName)
    // 4. 生产文件并下载
    writeFileXLSX(wb, fileName)
  } catch (e) {
    console.log(e, e.stack)
  }
}

export const parseExcel = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader()
    const rABS =
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
        resolve(json)
      })
    }
  }).catch((err) => console.error(err))
