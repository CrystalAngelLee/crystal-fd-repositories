import React, { useEffect, useState } from 'react'
import * as echarts from 'echarts'
import { Button, Form, Table, Collapse } from 'antd'
import { Excel } from '../../components'
import {
  prefixCls,
  initialValues,
  fileds,
  deptSeriesOps,
  originMap,
  commonAnalysis,
  deptColumn,
  usersColumn,
} from './constant'
import './index.scss'

const { Panel } = Collapse

const AnalysisPath = () => {
  const [formValues, setformValues] = useState(initialValues)
  // 事业部表格数据
  const [newDeptTableData, setNewDeptTableData] = useState([])
  const [oldDeptTableData, setOldDeptTableData] = useState([])
  const [copyDeptTableData, setCopyDeptTableData] = useState([])

  // 用户表格数据
  const [newUserTableData, setNewUserTableData] = useState([])
  const [oldUserTableData, setOldUserTableData] = useState([])
  const [copyUserTableData, setCopyUserTableData] = useState([])

  const [files, setFiles] = useState([])
  // 筛选使用排名前十的部门
  const [limitDept] = useState(10)
  // 筛选部门内排名前5的操作
  const [limitPath] = useState(5)
  useEffect(() => {
    parseExcel(files)
  }, [formValues, files])

  // 解析文件内容
  const getParseData = (file) => {
    const headers = file[0]
    const jsonData = file.slice(1).reduce((p, c) => {
      const map = {}
      c.forEach((cur, idx) => {
        map[[headers[idx]]] = cur
      })
      return [...p, map]
    }, [])
    return jsonData
  }

  // 筛选数据
  const filterData = (datas, rules, type = 'business') => {
    const res = []
    datas.forEach((d) => {
      let num = 0
      Object.keys(rules).forEach((k) => {
        if (d[k] == rules[k]) {
          num = num + 1
        }
      })

      if (num === Object.keys(rules).length) {
        // 事业部筛选
        if (type === 'business' && !!d[`dept_id_${formValues.dept}`]) {
          res.push(d)
        }
        // 商家用户筛选
        if (type === 'usertype-jdb' && d.erp.startsWith('JD_B')) {
          res.push(d)
        }
        // 运营筛选
        if (type === 'usertype-jd' && !d.erp.startsWith('JD_B')) {
          res.push(d)
        }
      }
    })
    return res
  }

  // 筛选部门
  const getDeptList = (data, type = 'name') => {
    let set = new Set()
    data.forEach((item) => {
      set.add(item[`dept_${type}_${formValues.dept}`])
    })
    return Array.from(set)
  }
  // 路线去重
  const removeSamePath = (data) => {
    data = data.map((item) => {
      // 筛选核心区域
      let points =
        item['zone_chain'] &&
        item['zone_chain'].split('_').filter((p) => {
          return !['A', 'K', 'J', 'I', 'N'].includes(p)
        })
      // 去重
      let newPoints = new Set(points)
      // 排序
      item['zone_chain'] = [...newPoints]
        .sort((a, b) => a.localeCompare(b))
        .join('-')
      return item
    })
    return data
  }

  // dataSource为处理好的表格数据，该方法处理事业部数据
  const getPathDeptMap = (dataSource) => {
    let pathMap = new Map()
    dataSource.forEach((item) => {
      const deptName = item[`dept_name_${formValues.dept}`]
      if (!pathMap.has(item.path)) {
        // 当前部门名
        pathMap.set(item.path, {
          [deptName]: item.count,
        })
      } else {
        pathMap.set(
          item.path,
          Object.assign(pathMap.get(item.path), { [deptName]: item.count })
        )
      }
    })
    return pathMap
  }

  const formatPath = (path) =>
    path
      .split('-')
      .map((k) => originMap[k].desc)
      .join('-')

  // 获取EChart堆叠图展示数据
  const getDeptSeries = (dataSource, deptList) => {
    const pathMap = getPathDeptMap(dataSource)
    let seriesArray = []
    for (let [key, value] of pathMap) {
      let data = []
      Object.entries(value).forEach(([key, value]) => {
        const index = deptList.findIndex((item) => item === key)
        if (index === -1) return
        data[index] = value
      })
      seriesArray.push({
        name: formatPath(key),
        data,
        stack: 'total',
        ...deptSeriesOps,
      })
    }
    return seriesArray
  }

  const getBusinessEchart = (dataSource, type = 'new') => {
    // 1. 事业部柱状图
    let element = document.getElementById(`${type}_dept_histogram`)

    let myChart = echarts.init(element)
    myChart.clear()
    const deptList = getDeptList(dataSource)
    const series = getDeptSeries(dataSource, deptList)
    let option
    option = {
      title: {
        // text: '新页面路径分析',
        subtext: '部门',
        top: '-20%',
        // left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        // orient: 'vertical',
        // left: 'left',
      },
      xAxis: [
        {
          type: 'category',
          data: deptList,
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series,
    }
    option && myChart.setOption(option)
  }

  // 获取路径
  const getUsersPath = (data) => {
    let map = new Map()
    data.forEach((item) => {
      if (!map.has(item.path)) {
        map.set(item.path, {
          [item.type]: item.count,
        })
      } else {
        map.set(
          item.path,
          Object.assign(map.get(item.path), {
            [item.type]: item.count,
          })
        )
      }
    })
    map.forEach((value, key) => {
      // 删除独有路线 保留共有
      if (Object.values(value).length < 2) {
        map.delete(key)
      }
    })
    return map
  }

  // 获取用户展示柱状图数据
  const getUsersSeries = (pathMap) => {
    let arraySeries = []
    let jdbObj = {
      name: '商家',
      data: [],
      ...deptSeriesOps,
    }
    let jdObj = {
      name: '运营',
      data: [],
      ...deptSeriesOps,
    }
    pathMap.forEach((value) => {
      jdbObj.data.push(value['商家'])
      jdObj.data.push(value['运营'])
    })
    arraySeries.push(jdbObj, jdObj)
    return arraySeries
  }

  const getUsersEchart = (data, type = 'new') => {
    let element = document.getElementById(`${type}_user_histogram`)

    let myChart = echarts.init(element)
    myChart.clear()
    const pathMap = getUsersPath(data) //  path:{商家：100，运营：90}
    const series = getUsersSeries(pathMap)
    let option
    option = {
      title: {
        // text: '新页面路径分析',
        subtext: '部门',
        // top:'-2%'
        // left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        // orient: 'vertical',
        // left: 'left',
      },
      xAxis: [
        {
          type: 'category',
          data: [...pathMap.keys()],
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series,
    }
    option && myChart.setOption(option)
  }

  // 把数字专为百分比
  const parsePercent = (data) => {
    if (Number.isNaN(data)) return 0
    return (Number(data) * 100).toFixed(2) + '%'
  }

  // 给map排序
  function sortByValue(map) {
    const sortedEntries = Array.from(map.entries()).sort((a, b) => {
      if (a[1].count > b[1].count) {
        return -1
      } else if (a[1].count > b[1].count) {
        return 1
      } else {
        return 0
      }
    })
    return new Map(sortedEntries)
  }

  // 限制展示的数量Map数据结构
  const limitNumber = (map, limit) => {
    map.forEach((deptValue, key) => {
      // 限制每个部门下前3路径
      const limitDept = new Map(
        Array.from(deptValue).slice(0, limit || limitPath)
      )
      map.set(key, limitDept)
    })
    return new Map(Array.from(map).slice(0, limitDept))
  }
  // 按照部门总使用量进行排序，并根据部门内情况继续排序
  const filterDataSource = (dataMap, limit) => {
    // 排序
    dataMap.forEach((deptValue, key) => {
      // 部门级别的使用数
      let totalCount = 0
      // 部门内部排序后的
      const sortDept = sortByValue(deptValue)
      deptValue.forEach((pathValue) => {
        totalCount += pathValue.count || 0
      })
      // 增加部门数量属性 sortDept虽然是map,但是可以挂在这变量上为了下面的排序
      sortDept.count = totalCount
      dataMap.set(key, sortDept)
    })
    // 部门和部门使用数量倒序
    const sortDeptMap = sortByValue(dataMap)
    return limitNumber(sortDeptMap, limit)
  }
  // 获取用户维度数据 jdbData商家数据,jdData运营数据
  const getUserTable = (data) => {
    // 表格数据
    let dataSource = []
    // 操作次数（总）
    let totalNum = 0
    // 操作时间（总）
    let totalTime = 0
    // 根据当前部门级别聚合数据
    let dataMap = new Map()
    data.forEach((item, index) => {
      const type = item.erp.startsWith('JD_B') ? '商家' : '运营'
      if (!item.zone_chain || item.zone_chain.length < 2) return
      // 有效时间
      const effectiveTime = Number(item.total_time) - Number(item.k_time)
      totalTime += effectiveTime
      totalNum++
      const mustObj = {
        key: index,
        path: item.zone_chain, // 路径
        type,
      }
      if (!dataMap.has(type)) {
        // 部门下的路径映射map
        const pathMap = new Map()
        pathMap.set(item.zone_chain, {
          count: 1, // 总操作数
          time: effectiveTime, // 总时间
          ...mustObj,
        })
        dataMap.set(type, pathMap)
      } else {
        // 上一次的用户维度数据
        let lastDeptValue = dataMap.get(type)
        if (!lastDeptValue.get(item.zone_chain)) {
          lastDeptValue.set(item.zone_chain, {
            count: 1, // 总操作数
            time: effectiveTime, // 总时间
            ...mustObj,
          })
        } else {
          // 上一次的路径维度数据
          const lastPathValue = lastDeptValue.get(item.zone_chain)
          lastDeptValue.set(item.zone_chain, {
            count: lastPathValue.count + 1, // 总操作数
            time: lastPathValue.time + effectiveTime, // 总时间
            ...mustObj,
          })
        }
        dataMap.set(type, lastDeptValue)
      }
    })
    // 商家和运营分别限制10条
    const newDataSource = filterDataSource(dataMap, 10)
    // 给每个数据加上次数和时间的占比
    newDataSource.forEach((pathMapItem) => {
      pathMapItem = pathMapItem.forEach((value, key) => {
        if (key == 'count') return
        value.count_percent = parsePercent(value.count / totalNum)
        value.time_percent = parsePercent(value.time / totalTime)
        // 右侧table数据
        dataSource.push(value)
      })
    })
    // console.log(newDataSource, '用户表格数据', dataSource)
    // 需要对数据进行排序
    return dataSource
  }

  // 获取事业部表格数据,limit 每个部分限制条数
  const getBusinessTable = (data) => {
    // 表格数据
    let dataSource = []
    // 操作次数（总）
    let totalNum = 0
    // 操作时间（总）
    let totalTime = 0
    // 根据当前部门级别聚合数据
    let dataMap = new Map()
    data.forEach((item, index) => {
      if (!item.zone_chain || item.zone_chain.length < 2) return
      // 有效时间
      const effectiveTime = Number(item.total_time) - Number(item.k_time)
      totalTime += effectiveTime
      totalNum++
      const mustObj = {
        key: index,
        path: item.zone_chain, // 路径
        dept_name_1: item.dept_name_1, // 一级部门名
        dept_name_2: item.dept_name_2, // 二级部门名
        dept_name_3: item.dept_name_3, // 三级部门名
        dept_name_4: item.dept_name_4, // 四级部门名
      }
      if (!dataMap.has(item[`dept_name_${formValues.dept}`])) {
        // 部门下的路径映射map
        const pathMap = new Map()
        pathMap.set(item.zone_chain, {
          count: 1, // 总操作数
          time: effectiveTime, // 总时间
          ...mustObj,
        })
        dataMap.set(item[`dept_name_${formValues.dept}`], pathMap)
      } else {
        // 上一次的部门维度数据
        let lastDeptValue = dataMap.get(item[`dept_name_${formValues.dept}`])
        if (!lastDeptValue.get(item.zone_chain)) {
          lastDeptValue.set(item.zone_chain, {
            count: 1, // 总操作数
            time: effectiveTime, // 总时间
            ...mustObj,
          })
        } else {
          // 上一次的路径维度数据
          const lastPathValue = lastDeptValue.get(item.zone_chain)
          lastDeptValue.set(item.zone_chain, {
            count: lastPathValue.count + 1, // 总操作数
            time: lastPathValue.time + effectiveTime, // 总时间
            ...mustObj,
          })
        }
        dataMap.set(item[`dept_name_${formValues.dept}`], lastDeptValue)
      }
    })
    const newDataSource = filterDataSource(dataMap)
    // 给每个数据加上次数和时间的占比
    newDataSource.forEach((pathMapItem) => {
      pathMapItem = pathMapItem.forEach((value, key) => {
        if (key == 'count') return
        value.count_percent = parsePercent(value.count / totalNum)
        value.time_percent = parsePercent(value.time / totalTime)
        // 右侧table数据
        dataSource.push(value)
      })
    })
    // console.log(newDataSource, '事业部表格数据', dataSource)
    // 需要对数据进行排序
    return dataSource
  }

  const parseExcel = (file = []) => {
    if (!file.length) return
    /* 解析文件内容 */
    // 1. 将数据转换为json格式
    let datas = getParseData(file)
    // 路径去重&留存核心路径
    datas = removeSamePath(datas)
    /* 筛选数据 */
    // 1. 新页面类型数据
    let new_data = filterData(datas, { new_old: 1, copy_type: -1 })
    // 2. 老页面类型数据
    let old_data = filterData(datas, { new_old: 2 })
    // 3. 复制类型数据
    let copy_data = filterData(datas, { new_old: 1, copy_type: 1 })
    copy_data = filterData(datas, { copy_type: 0 })
    // 4. 计算商家分类数据
    let new_jdb_data = filterData(datas, {}, 'usertype-jdb')
    let old_jdb_data = filterData(datas, { new_old: 2 }, 'usertype-jdb')
    let copy_jdb_data = filterData(
      datas,
      { new_old: 1, copy_type: 1 },
      'usertype-jdb'
    )
    copy_jdb_data = filterData(datas, { copy_type: 0 }, 'usertype-jdb')

    // 5. 计算运营数据
    let new_jd_data = filterData(datas, {}, 'usertype-jd')
    let old_jd_data = filterData(datas, { new_old: 2 }, 'usertype-jd')
    let copy_jd_data = filterData(
      datas,
      { new_old: 1, copy_type: 1 },
      'usertype-jd'
    )
    copy_jd_data = filterData(datas, { copy_type: 0 }, 'usertype-jd')
    // 用户数据
    const new_user_data = new_jdb_data.concat(new_jd_data)
    const old_user_data = old_jdb_data.concat(old_jd_data)
    const copy_user_data = copy_jdb_data.concat(copy_jd_data)
    /* 计算路径 */
    /* 用户路径 Echart */
    // 获取事业部表格数据
    const newDeptTableDataSource = getBusinessTable(new_data)
    setNewDeptTableData(newDeptTableDataSource)
    const oldDeptTableDataSource = getBusinessTable(old_data)
    setOldDeptTableData(oldDeptTableDataSource)
    const copyDeptTableDataSource = getBusinessTable(copy_data)
    setCopyDeptTableData(copyDeptTableDataSource)

    // 1. 事业部分类
    getBusinessEchart(newDeptTableDataSource, 'new')
    getBusinessEchart(oldDeptTableDataSource, 'old')
    getBusinessEchart(copyDeptTableDataSource, 'copy')

    // 用户表数据
    const newUserTableDataSource = getUserTable(new_user_data)
    const oldUserTableDataSource = getUserTable(old_user_data)
    const copyUserTableDataSource = getUserTable(copy_user_data)
    setNewUserTableData(newUserTableDataSource)
    setOldUserTableData(oldUserTableDataSource)
    setCopyUserTableData(copyUserTableDataSource)

    // 2. 用户类型分类
    getUsersEchart(newUserTableDataSource, 'new')
    getUsersEchart(oldUserTableDataSource, 'old')
    getUsersEchart(copyUserTableDataSource, 'copy')
  }

  const onFinish = (values) => {
    setformValues(values)
  }

  // 新建用户数据处理
  const parseNewPath = (files = []) => {
    console.log('files', files)
  }

  const deptDataSourceMap = {
    new: newDeptTableData,
    old: oldDeptTableData,
    copy: copyDeptTableData,
  }
  const userDataSourceMap = {
    new: newUserTableData,
    old: oldUserTableData,
    copy: copyUserTableData,
  }
  return (
    <Collapse className={prefixCls}>
      <Panel header="Working" key="steps">
        <div className={`${prefixCls}-steps`}>
          <div>
            <h3>Step 1 上传文件</h3>
            新建用户数据：
            <Excel type="upload" parseExcel={(files) => parseNewPath(files)} />
            上传用户路径数据：
            <Excel type="upload" parseExcel={(files) => setFiles(files)} />
          </div>
          <div>
            <h3>Step 2 搜索类型定义</h3>
            <div>
              <Form
                name="basic"
                initialValues={initialValues}
                onFinish={onFinish}
              >
                {fileds.map(({ name, child, label }) => (
                  <Form.Item key={name} label={label} name={name}>
                    {child}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Panel>
      {commonAnalysis.map(({ header, key }) => {
        const _dataSource = deptDataSourceMap[key].map((d) => ({
          ...d,
          path: formatPath(d.path),
        }))
        const _userdataSource = userDataSourceMap[key].map((d) => ({
          ...d,
          path: formatPath(d.path),
        }))
        return (
          <Panel key={key} header={header} className={`${prefixCls}-visual`}>
            <div className={`${prefixCls}-visual-item`}>
              <div>
                <div
                  className={`${prefixCls}-visual-echart`}
                  id={`${key}_dept_histogram`}
                />
              </div>
              <div>
                <div className={`${prefixCls}-visual-echart`}>
                  <Table
                    size="small"
                    columns={deptColumn(formValues.dept)}
                    dataSource={_dataSource}
                  />
                </div>
              </div>
              <div>
                <div
                  className={`${prefixCls}-visual-echart`}
                  id={`${key}_user_histogram`}
                ></div>
              </div>
              <div>
                <div className={`${prefixCls}-visual-echart`}>
                  <Table
                    size="small"
                    columns={usersColumn}
                    dataSource={_userdataSource}
                  />
                </div>
              </div>
            </div>
          </Panel>
        )
      })}
    </Collapse>
  )
}

export default AnalysisPath
