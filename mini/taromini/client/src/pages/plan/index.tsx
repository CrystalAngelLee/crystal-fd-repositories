import { FC, useEffect, useMemo, useState } from 'react'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { observer, inject } from 'mobx-react'
import { CommonEvent } from '@tarojs/components/types/common'
import { View, Text, Picker } from '@tarojs/components'
import { AtMessage, AtActivityIndicator } from 'taro-ui'
import { GLOBAL, CLASS, TIP } from '../../constants'
import { curValue, getFullMonth } from '../../utils'
import { PlanStoreProps, finaceDataType } from '../../store/plan'
import FloatLayout from './FloatLayout'
import './index.scss'

const prefixCls = CLASS.finaceplan
const curMonth = getFullMonth()
const db = Taro.cloud.database()
const db_finacelist = db.collection('finacelist')

interface FinacePlanProps {
  planStore: PlanStoreProps
}

const FinacePlan: FC<FinacePlanProps> = ({ planStore: store }) => {
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState('')
  const [isOpened, setIsOpened] = useState(false)
  const [istodo, setIstodo] = useState(false)
  const [finaceData, setFinaceData] = useState<finaceDataType>({})
  const [finaceList, setFinaceList] = useState({})

  const curTimer = useMemo(() => {
    if (!finaceData.date) return {}
    const [year, month] = finaceData.date.split('-')
    return { year, month }
  }, [finaceData])

  const { setState: setStoreState, templateList } = store
  const { openId } = Taro.getStorageSync('userInfo')

  useEffect(() => {
    ;(async (_) => {
      /* 请求当前默认展示模版数据 */
      const { data } = await db_finacelist
        .where({
          active: true,
          _openid: openId
        })
        .get()
      let _curFinaceData = data[0]
      if (!_curFinaceData) {
        /* 如果没有默认展示月份数据则请求当前月份数据进行展示 */
        const _curMonthData = await getMonthData(curMonth)
        _curFinaceData = _curMonthData[0]
      }
      if (_curFinaceData) {
        setFinaceData(_curFinaceData as finaceDataType)
        setFinaceList({
          ...finaceList,
          [_curFinaceData.date]: _curFinaceData
        })
        setLoading(false)
        if (!_curFinaceData.templateId) {
          setState('noactiveTemplate')
        }
      } else {
        /* 如果没有获取到当前模版，默认将当前月份作为默认模版并激活展示 */
        setNewPlan(curMonth, true)
      }
    })()
  }, []) // eslint-disable-line

  const setNewPlan = async (_date: string, init = false) => {
    try {
      setLoading(true)
      let list: any[] = []
      // 获取当前人员的模版数据
      if (!store.templateList) {
        let { data } = await db
          .collection('templatelist')
          .where({
            _openid: openId // 填入当前用户 openid
          })
          .get()
        list = data
        setStoreState({ templateList: data })
      }
      if (!list.length) {
        setState('notTemplate')
      }
      list = list.filter((item) => item.active == true)
      const _curTemplateInfo = list[0] || {}
      const curMonthData: finaceDataType = {
        date: _date,
        income: '0',
        taxbefore: '0',
        templateId: _curTemplateInfo._id || '',
        active: init
      }
      if (_curTemplateInfo._id) {
        curMonthData.templateInfo = _curTemplateInfo
      }
      // 将数据插入数据库
      const res = await db_finacelist.add({ data: curMonthData })
      if (res._id) {
        console.log('新计划数据插入成功！')
        setFinaceData(curMonthData)
        setFinaceList({
          ...finaceList,
          [_date]: curMonthData
        })
      } else {
        Taro.atMessage({
          message: '数据执行错误',
          type: 'error'
        })
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('setNewPlan:', error)
    }
  }

  // 查询对应月份数据
  const getMonthData = async (month: string) => {
    setLoading(true)
    const { data } = await db_finacelist
      .where({
        date: month,
        _openid: openId
      })
      .get()
    setLoading(false)
    return data
  }

  // 月份切换
  const _onDateChange = (e: CommonEvent) => {
    const _curMonth = e.detail.value
    if (_curMonth === finaceData.date) return
    if (finaceList && finaceList[_curMonth]) {
      setFinaceData(finaceList[_curMonth])
      return
    }
    if (!openId) {
      Taro.atMessage(TIP.PERMISSIONTIP)
      return
    }
    // 查询当月数据
    getMonthData(_curMonth).then((_curMonthData) => {
      if (_curMonthData[0]) {
        setFinaceData(_curMonthData[0] as finaceDataType)
        setFinaceList({ ...finaceList, [_curMonth]: _curMonthData[0] })
        return
      }
      setNewPlan(_curMonth)
    })
  }

  const _onEditData = () => {
    if (!Taro.getStorageSync('userInfo').openId) {
      Taro.atMessage(TIP.PERMISSIONTIP)
      return
    }
    setIsOpened(true)
  }

  const _onClose = () => {
    setIsOpened(false)
  }

  const _onSure = async (data) => {
    let flag = false
    let newData = Object.assign({}, finaceData)
    if (data.active !== undefined) {
      const {
        active,
        income: __income,
        taxbefore,
        templateId: __templateId,
        templateInfo: __templateInfo
      } = data
      flag = !finaceData.active && active
      newData = Object.assign({}, finaceData, {
        active,
        income: __income,
        taxbefore,
        templateId: __templateId,
        templateInfo: __templateInfo
      })
    }
    if (!finaceData._id) return
    delete newData._id
    delete newData._openid
    if (flag) {
      await db_finacelist
        .where({
          _openid: openId,
          active: true
        })
        .get()
        .then(({ data: __data }) => {
          if (!__data.length) return
          __data.forEach(async (item) => {
            if (!item._id) return
            const _params = Object.assign({}, item)
            delete _params._id
            delete _params._openid
            await db_finacelist
              .doc(item._id)
              .update({
                data: {
                  ..._params,
                  active: false
                }
              })
              .catch((res) => {
                console.error('active更新失败：', res)
              })
          })
        })
    }
    await db_finacelist
      .doc(finaceData._id)
      .update({
        data: newData
      })
      .then(({ stats }) => {
        if (stats.updated === 1) {
          setFinaceData({ ...finaceData, ...newData })
          Taro.atMessage({
            message: '更新成功',
            type: 'success'
          })
          _onClose()
        }
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const showMap = {
    noactiveTemplate: '暂无关联计算模板',
    notTemplate: '暂无模板，点击新建一个吧'
  }

  const _onNewTemplate = () => {
    if (!Taro.getStorageSync('userInfo').openId) {
      Taro.atMessage(TIP.PERMISSIONTIP)
      return
    }
    if (state === 'noactiveTemplate') return
    Taro.navigateTo({
      url: '/pages/template/index'
    })
  }
  const { income, date, templateInfo, templateId } = finaceData

  const renderList = (configs) => {
    let _rest = Number(configs.__value) || Number(finaceData.income)
    return configs.configs.map((item) => {
      const { curVal } = curValue(
        item.rule_opt,
        item.rule,
        Number(configs.__value) || Number(income),
        _rest
      )
      if (item.configs && item.configs.length > 0) {
        item.__value = curVal
      }
      _rest = _rest - curVal
      return (
        <View key={item.uniqueId} className={`${prefixCls}-content-line`}>
          <View
            className={`${prefixCls}-content-line__wrap`}
            onClick={() => {
              if (!istodo) return
              const setNewState = (_item, checked) => {
                _item.checked = checked
                if (_item.configs?.length) {
                  _item.configs = _item.configs.map((m) =>
                    setNewState(m, checked)
                  )
                }
                return _item
              }
              let newItem = setNewState(item, !item.checked)
              const setNewItem = (arr) =>
                [...arr].map((a) => {
                  if (a.uniqueId === newItem.uniqueId) {
                    return newItem
                  }
                  if (
                    newItem.uniqueId.includes(a.uniqueId) &&
                    !newItem.checked
                  ) {
                    a.checked = newItem.checked
                  }
                  if (
                    newItem.uniqueId.substring(
                      0,
                      newItem.uniqueId.lastIndexOf('-')
                    ) === a.uniqueId &&
                    !a.configs.find((b) => !b.checked)
                  ) {
                    a.checked = newItem.checked
                  }
                  if (a.configs?.length) {
                    a.configs = setNewItem(a.configs)
                  }
                  return a
                })
              const newConfigs = setNewItem([...templateInfo.configs])
              setFinaceData({
                ...finaceData,
                templateInfo: {
                  ...templateInfo,
                  configs: newConfigs
                }
              })
            }}
          >
            {istodo && (
              <View
                className={classNames('at-checkbox__icon-cnt', {
                  selected: item.checked
                })}
              >
                <Text className='at-icon at-icon-check'></Text>
              </View>
            )}
            <View className={`${prefixCls}-content-line__title`}>
              {item.name}
            </View>
            <Text className={`${prefixCls}-content-line__value`}>{curVal}</Text>
          </View>
          {item.configs && item.configs.length > 0 && renderList(item)}
        </View>
      )
    })
  }

  return (
    <View className={prefixCls}>
      <AtMessage />
      <View className={`${prefixCls}-header at-row`}>
        <View className={`${prefixCls}-header-row`}>
          <Picker
            mode='date'
            fields='month'
            value={date || ''}
            onChange={_onDateChange}
          >
            <View className={`${prefixCls}-header-time`}>
              <View className='year'>{curTimer.year}</View>
              <View className='month'>{curTimer.month}</View>
            </View>
          </Picker>
        </View>
        <View className={`${prefixCls}-header-income`}>
          {GLOBAL.INCOME}
          <Text className='income'>{income}</Text>
        </View>
        {!istodo && (
          <Text
            className={`${prefixCls}-header__opt at-icon at-icon-edit`}
            onClick={_onEditData}
          />
        )}
        <Text
          className={`${prefixCls}-header__opt at-icon at-icon-${
            istodo ? 'close' : 'bookmark'
          }`}
          onClick={() => setIstodo(!istodo)}
        />
        {istodo && (
          <Text
            className={`${prefixCls}-header__opt at-icon at-icon-check`}
            onClick={_onSure}
          />
        )}
      </View>
      {!templateId || !templateInfo ? (
        <View
          className={`${prefixCls}-nodata at-row at-row__align--center`}
          onClick={_onNewTemplate}
        >
          {showMap[state]}
        </View>
      ) : (
        <View
          className={classNames(`${prefixCls}-content`, {
            disable: income == '0'
          })}
        >
          <AtActivityIndicator
            mode='center'
            size={34}
            isOpened={!finaceData.date || loading}
          />
          {renderList(templateInfo)}
        </View>
      )}
      <FloatLayout
        key={finaceData._id}
        isOpened={isOpened}
        finaceData={finaceData}
        onClose={_onClose}
        onSure={_onSure}
        templateList={templateList}
      />
    </View>
  )
}

export default inject('planStore')(observer(FinacePlan))
