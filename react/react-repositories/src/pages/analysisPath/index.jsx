import React, { useEffect, useState } from 'react'
import * as echarts from 'echarts'
import { Button, Form } from 'antd'
import { Excel } from '../../components'
import { files as FF, prefixCls, initialValues, fileds } from './constant'
import './index.css'

const AnalysisPath = () => {
  const [formValues, setformValues] = useState(initialValues)

  useEffect(() => {
    getBusinessEchart()
    parseExcel(FF)
  }, [formValues])

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

      // 事业部筛选
      if (num === Object.keys(rules).length) {
        if (type === 'business' && !!d[`dept_id_${formValues.dept}`]) {
          res.push(d)
        }
      }
    })
    return res
  }

  const getBusinessEchart = () => {
    // 1. 事业部柱状图
    let element = document.getElementById('new_dept_histogram')

    let myChart = echarts.init(element)
    myChart.clear()
    let option
    option = {
      title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' },
            { value: 300, name: '视频广告' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    }
    option && myChart.setOption(option)
  }

  const parseExcel = (file) => {
    /* 解析文件内容 */
    // 1. 将数据转换为json格式
    const datas = getParseData(file)
    /* 筛选数据 */
    // 1. 新页面类型数据
    let new_data = filterData(datas, { new_old: 1, copy_type: -1 })
    // 2. 老页面类型数据
    let old_data = filterData(datas, { new_old: 2 })
    // 3. 复制类型数据
    let copy_data = filterData(datas, { new_old: 1, copy_type: 1 })
    copy_data = filterData(datas, { copy_type: 0 })
    /* 计算路径 */
    /* 用户路径 Echart */
    // 1. 事业部分类
    getBusinessEchart()
    // 2. 用户类型分类
    /* 各区域点击次数、搭建时长Echart */
  }

  const onFinish = (values) => {
    setformValues(values)
  }

  return (
    <div className={prefixCls}>
      <h1>用户路径分析</h1>
      <div className={`${prefixCls}-steps`}>
        <div>
          <h3>Step 1 上传文件</h3>
          <Excel type="upload" parseExcel={parseExcel} />
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
      {[
        { header: '新页面路径分析', key: 'new' },
        { header: '复制页面路径分析', key: 'copynew' },
        { header: '老页面路径分析', key: 'old' },
      ].map(({ header, key }) => (
        <div key={key} className={`${prefixCls}-visual`}>
          <h3>{header}</h3>
          <div className={`${prefixCls}-visual-item`}>
            <div>
              <div className={`${prefixCls}-visual-title`}>事业部柱状图</div>
              <div
                className={`${prefixCls}-visual-echart`}
                id={`${key}_dept_histogram`}
              />
            </div>
            <div>
              <div className={`${prefixCls}-visual-title`}>事业部明细表</div>
              <div
                className={`${prefixCls}-visual-echart`}
                id={`${key}_dept_list`}
              />
            </div>
            <div>
              <div className={`${prefixCls}-visual-title`}>用户明细表</div>
              <div
                className={`${prefixCls}-visual-echart`}
                id={`${key}_user_list`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnalysisPath
