import React from 'react'
import { exportExcel, parseExcel } from './util'

const Excel = ({ type, fileProps, ...props }) => {
  const onChange = ({ target: { files } }) => {
    parseExcel(files[0])
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
 */
