import React from 'react'
import { Excel } from '../components'

const headers = [
  {
    title: '会场',
    key: 'activityName',
    width: 120,
  },
  {
    title: '会场分期',
    key: 'pageId',
  },
  {
    title: '灵活楼层',
    key: 'flexcubeNew',
  },
  {
    title: '灵活楼层',
    key: 'flexcubeReuse',
  },
  {
    title: '灵活楼层',
    key: 'flexcubeIteration',
  },
  {
    title: '灵活楼层',
    key: 'flexcubeNum',
  },
  {
    title: '灵活楼层',
    key: 'flexcubeRate',
  },
  {
    title: '共建楼层',
    key: 'customNew',
  },
  {
    title: '共建楼层',
    key: 'customReuse',
  },
  {
    title: '共建楼层',
    key: 'customIteration',
  },
  {
    title: '共建楼层',
    key: 'customNum',
  },
  {
    title: '共建楼层(占比)',
    key: 'customRate',
  },
  {
    title: '系统楼层',
    key: 'hotzoneNum',
  },
  {
    title: '图片热区(占比)',
    key: 'hotzoneRate',
  },
  {
    title: '系统楼层',
    key: 'systemNum',
  },
  {
    title: '系统楼层(占比)',
    key: 'systemRate',
  },
  {
    title: '积木楼层',
    key: 'viewkitNum',
  },
  {
    title: '积木楼层(占比)',
    key: 'viewkitRate',
  },

  {
    title: '合计',
    key: 'sum',
  },
]
const dataSource = [
  {
    activityName: '',
    pageId: '',
    flexcubeNew: '新增样式',
    customNew: '新增',
    flexcubeReuse: '复用样式',
    customReuse: '复用',
    flexcubeIteration: '迭代样式',
    customIteration: '迭代',
    flexcubeNum: '个数',
    customNum: '个数',
    systemNum: '个数',
    viewkitNum: '个数',
    flexcubeRate: '占比',
    customRate: '复用',
    systemRate: '占比',
    viewkitRate: '占比',
    hotzoneNum: '图片热区(个数)',
    hotzoneRate: '图片热区(占比)',
    sum: '',
  },
  {
    activityName: '',
    pageId: '',
    flexcubeNew: '-',
    customNew: '-',
    flexcubeReuse: '-',
    customReuse: '-',
    flexcubeIteration: '4(ly_平铺一列PC,开放店铺,错落滑动商品,zj测试错落轮播)',
    customIteration: '1(PC报告A)',
    flexcubeNum: 4,
    customNum: 1,
    systemNum: 5,
    viewkitNum: 0,
    flexcubeRate: '40.00%',
    customRate: '10.00%',
    systemRate: '50.00%',
    viewkitRate: '0%',
    hotzoneNum: 2,
    hotzoneRate: '占系统楼层40.00%，占总楼层20.00%',
    sum: 10,
  },
  {
    activityName: '总计',
    pageId: '',
    flexcubeNew: '-',
    customNew: '-',
    flexcubeReuse: '-',
    customReuse: '-',
    flexcubeIteration: '4(4种)',
    customIteration: '1(1种)',
    flexcubeNum: 4,
    customNum: 1,
    systemNum: 5,
    viewkitNum: 0,
    flexcubeRate: '40.00%',
    customRate: '10.00%',
    systemRate: '50.00%',
    viewkitRate: '0.00%',
    hotzoneNum: 2,
    hotzoneRate: '占系统楼层40.00%，占总楼层20.00%',
    sum: 10,
  },
]

class ExportExcel extends React.Component {
  render() {
    return (
      <div>
        <Excel multiple fileProps={[headers, dataSource, 'anaylysis']} />
      </div>
    )
  }
}
export default ExportExcel
