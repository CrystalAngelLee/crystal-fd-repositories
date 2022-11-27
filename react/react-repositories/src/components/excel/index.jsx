import React from 'react'
import { exportExcel, parseExcel } from './util'

const Excel = ({ type, fileProps, parseExcel: _parseExcel, ...props }) => {
  const onChange = ({ target: { files } }) => {
    parseExcel(files[0]).then(_parseExcel)
  }
  const uploadChild = () => {
    return <input type="file" onChange={onChange} accept="*.xls" {...props} />
  }
  const onDownload = () => {
    exportExcel(...fileProps)
  }
  const downloadChild = () => {
    return <button onClick={onDownload}>下载</button>
  }
  switch (type) {
    case 'upload':
      return uploadChild()
    case 'download':
      return downloadChild()
    default:
      return (
        <div>
          {uploadChild()}
          {downloadChild()}
        </div>
      )
  }
}

export default Excel
/**
 * type: upload 上传 dowload 下载
 * fileProps: 下载文件信息 headers, dataSource, fileName
 * parseExcel: 上传文件成功后响应
 */
