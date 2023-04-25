import React from 'react'
import { Excel } from '../../components'

const headers = {
  dataIndex: ['name', 'key', 'text'],
  dataSource: [
    {
      name: '会场',
      key: '会场分期',
      text: '灵活楼层',
    },
  ],
}

class ExportExcel extends React.Component {
  parseExcel = (dataSource) => {
    console.log(dataSource)
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
