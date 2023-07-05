import React from 'react'
import { Excel } from '../../components'

const headers = {
  dataIndex: ['name', 'key', 'text'],
  dataSource: [
    {
      name: '会场',
      key: '会场分期',
      text: '灵活楼层'
    }
  ]
}

class ExportExcel extends React.Component {
  parseExcel = (dataSource) => {
    dataSource.shift()
    const res = []
    dataSource.forEach((d) => {
      // TODO
    })
    console.log(res.join(';'))
  }

  render() {
    const res = []

    return (
      <div>
        <Excel
          multiple
          fileProps={[headers, res, 'anaylysis']}
          parseExcel={this.parseExcel}
        />
      </div>
    )
  }
}
export default ExportExcel
