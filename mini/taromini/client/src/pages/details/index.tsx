import React, { useEffect, useMemo, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Picker, Text, CommonEvent } from '@tarojs/components'
import { AtActivityIndicator, AtFab } from 'taro-ui'
import { CLASS } from '../../constants'
import { getFullMonth } from '../../utils'
import './index.scss'

const prefixCls = CLASS.finacedetails
const curMonth = getFullMonth()
const db = Taro.cloud.database()
const db_detail = db.collection('finacedetails')

interface DetailsProps {}

const Details: React.FC<DetailsProps> = () => {
  const [month, setMonth] = useState(curMonth)
  const [dataList, setDataList] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const { openId } = Taro.getStorageSync('userInfo')

  const curTimer = useMemo(() => {
    const [year, _month] = month.split('-')
    return { year, month: _month }
  }, [month])

  useEffect(() => {
    ;(async () => {
      const data = await getMonthData(month)
      setDataList(data)
    })()
  }, []) // eslint-disable-line

  // 查询对应月份数据
  const getMonthData = async (_month: string) => {
    setLoading(true)
    const { data } = await db_detail
      .where({
        _openid: openId,
        month: _month.split('-')[1]
      })
      .orderBy('date', 'desc')
      .get()
    setLoading(false)
    return data || []
  }

  const _onDateChange = (e: CommonEvent) => {
    const _curMonth = e.detail.value
    if (month === _curMonth) return
    // 查询当月数据
    getMonthData(_curMonth).then((_curMonthData) => {
      if (_curMonthData) {
        setMonth(_curMonth)
        setDataList(_curMonthData)
      }
    })
  }

  // 记账
  const _onBook = () => {
    Taro.navigateTo({
      url: '/pages/book/index'
    })
  }

  return (
    <View className={prefixCls}>
      <View className={`${prefixCls}-header`}>
        <Picker
          mode='date'
          fields='month'
          value={month}
          onChange={_onDateChange}
        >
          <View className={`${prefixCls}-header-time`}>
            <View className='year'>{curTimer.year}</View>
            <View className='month'>{curTimer.month}</View>
          </View>
        </Picker>
        <View className={`${prefixCls}-header-item`}>
          <Text className={`${prefixCls}-header-item__title`}>月收入</Text>
          <Text className={`${prefixCls}-header-item__value`}>0</Text>
        </View>
        <View className={`${prefixCls}-header-item`}>
          <Text className={`${prefixCls}-header-item__title`}>月支出</Text>
          <Text className={`${prefixCls}-header-item__value`}>0</Text>
        </View>
        <View className={`${prefixCls}-header-item`}>
          <Text className={`${prefixCls}-header-item__title`}>结余</Text>
          <Text className={`${prefixCls}-header-item__value`}>0</Text>
        </View>
      </View>
      <View className={`${prefixCls}-content`}>
        <AtActivityIndicator mode='center' size={34} isOpened={loading} />
        {dataList &&
          dataList.map((data) => {
            return (
              <View key={data._id} className={`${prefixCls}-content-date`}>
                <View className={`${prefixCls}-content-date__date`}>
                  <Text>{data.date}</Text>
                  <Text>支出</Text>
                </View>
                <View className={`${prefixCls}-content-date__list`}>
                  {data.details &&
                    data.details.map((item, idx) => {
                      return (
                        <View
                          key={idx}
                          className={`${prefixCls}-content-date__list__line`}
                        >
                          <Text>{item.name}</Text>
                        </View>
                      )
                    })}
                </View>
              </View>
            )
          })}
      </View>
      <AtFab className='fabicon' onClick={_onBook}>
        <Text className='at-fab__icon at-icon at-icon-add' />
      </AtFab>
    </View>
  )
}

export default Details
