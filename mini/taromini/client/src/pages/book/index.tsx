import React, { useEffect, useMemo, useState } from 'react'
import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { observer, inject } from 'mobx-react'
import { View, Text, Picker, CommonEvent } from '@tarojs/components'
import {
  AtActivityIndicator,
  AtButton,
  AtInput,
  AtMessage,
  AtSegmentedControl
} from 'taro-ui'
import { formatDate } from '../../utils'
import { BookStoreProps } from '../../store/book'
import { CLASS, DEF_MANAGE } from '../../constants'
import './index.scss'

const prefixCls = CLASS.book
const db = Taro.cloud.database()
const db_manage = db.collection('bookmanage')
const db_detail = db.collection('finacedetails')
const curDay = formatDate(new Date(), 'yyyy-MM-dd')

interface BookProps {
  bookStore: BookStoreProps
}

const Book: React.FC<BookProps> = ({ bookStore: store }) => {
  const [segment, setSegment] = useState(0)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState(formatDate(new Date(), 'yyyy-MM-dd'))
  const [name, setName] = useState('')
  const [icon, setIcon] = useState<any>({})
  const { openId } = Taro.getStorageSync('userInfo')
  const { bookMap, setState } = store

  const curSegmentList: any[] = useMemo(() => {
    return (
      (bookMap &&
        bookMap[segment]?.data.concat([
          {
            name: '设置',
            icon: '',
            key: 'set'
          }
        ])) ||
      []
    )
  }, [segment, bookMap])

  useEffect(() => {
    if (bookMap === null) {
      ;(async () => {
        try {
          const { data } = await db_manage
            .where({
              _openid: openId
            })
            .get()
          if (data[0]) {
            setState({ bookMap: data[0] })
            const defaultIcon = data[0][segment]?.data?.[0] || {}
            if (defaultIcon) {
              setIcon(defaultIcon)
            }
          } else {
            // 没有数据将数据初始化并加入数据库中
            const defaultData = DEF_MANAGE
            // 将数据插入数据库
            const res = await db_manage.add({ data: defaultData })
            if (res._id) {
              console.log('默认数据插入成功！')
              const defaultIcon = defaultData[segment]?.data?.[0] || {}
              setIcon(defaultIcon)
              setState({ bookMap: defaultData })
            } else {
              Taro.atMessage({
                message: '数据执行错误',
                type: 'error'
              })
            }
          }
        } catch (error) {
          console.error('setDefaultManage-失败:', error)
        }
        setLoading(false)
      })()
    }
    setLoading(false)
  }, []) // eslint-disable-line

  const _onDateChange = (e: CommonEvent) => {
    setDate(e.detail.value)
  }

  const _onNameChange = (e: string) => {
    setName(e)
  }

  const _onSave = async () => {
    if (!date || !name || !Object.keys(icon).length) {
      Taro.atMessage({
        message: '您有配置未填写，请填写！',
        type: 'warning'
      })
      return
    }
    const [year, month] = date.split('-')

    // 存入数据库：如果是已有日期，执行push动作，否则创建新对象进行插入
    const { data } = await db_detail.where({ _openid: openId, date }).get()
    if (data.length) {
      const __id = data[0]._id || ''
      const _params: any = {
        ...data[0],
        details: [...data[0].details, { name, icon }]
      }
      delete _params._id
      delete _params._openid
      const { stats } = await db_detail.doc(__id).update({
        data: _params
      })
      if (stats.updated === 1) {
        Taro.atMessage({
          message: '操作成功',
          type: 'success'
        })
        Taro.navigateBack()
      }
    } else {
      const { _id } = await db_detail.add({
        data: {
          date,
          month,
          year,
          details: [{ name, icon }]
        }
      })
      if (_id) {
        Taro.atMessage({
          message: '操作成功',
          type: 'success'
        })
        Taro.navigateBack()
      }
    }
  }

  return (
    <View className={prefixCls}>
      <AtMessage />
      <View className={`${prefixCls}-header`}>
        <AtSegmentedControl
          values={['支出', '收入']}
          onClick={(value) => setSegment(value)}
          current={segment}
        />
      </View>
      <View className={`${prefixCls}-content`}>
        <AtActivityIndicator
          mode='center'
          size={34}
          isOpened={!curSegmentList.length || loading}
        />
        <View className={`${prefixCls}-box name`}>
          <View className={`${prefixCls}-box__title`}>
            备注
            <Picker mode='date' value={date} onChange={_onDateChange}>
              <View className={`${prefixCls}-content__date`}>
                {date === curDay ? '今天' : date}
              </View>
            </Picker>
          </View>
          <View className={`${prefixCls}-box__content`}>
            <AtInput
              name='name'
              focus
              value={name}
              border={false}
              placeholder='输入备注'
              onChange={_onNameChange}
            />
          </View>
        </View>
        <View className={`${prefixCls}-box icon`}>
          <Text className={`${prefixCls}-box__title`}>图标</Text>
          <View className={`${prefixCls}-box__content`}>
            <View className={`${prefixCls}-content__icon`} key={segment}>
              {/* 图标展示部分 */}
              {curSegmentList.map((item) => {
                return (
                  <View
                    key={item.key}
                    className={classNames(`${prefixCls}-content__icon_item`, {
                      active: item.key === icon.key
                    })}
                    onClick={() => {
                      if (item.key === 'set') {
                        Taro.navigateTo({
                          url: `/pages/bookmanage/index?key=${segment}`
                        })
                      } else {
                        setIcon(item)
                      }
                    }}
                  >
                    <View className='icon'>文</View>
                    <Text className='name'>{item.name}</Text>
                  </View>
                )
              })}
            </View>
          </View>
        </View>
      </View>
      <View className={`${prefixCls}-footer`}>
        <AtButton type='primary' full onClick={_onSave}>
          保存
        </AtButton>
      </View>
    </View>
  )
}

export default inject('bookStore')(observer(Book))
