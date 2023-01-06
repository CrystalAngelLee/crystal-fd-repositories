import React, { useEffect, useMemo, useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { observer, inject } from 'mobx-react'
import { View } from '@tarojs/components'
import {
  AtSegmentedControl,
  AtList,
  AtListItem,
  AtActivityIndicator,
  AtButton
} from 'taro-ui'
import { BookStoreProps } from '../../store/book'
import { CLASS, DEF_MANAGE } from '../../constants'
import './index.scss'

const prefixCls = CLASS.bookmanage
const db = Taro.cloud.database()
const db_manage = db.collection('bookmanage')

interface BookManageProps {
  bookStore: BookStoreProps
}

const BookManage: React.FC<BookManageProps> = ({ bookStore: store }) => {
  const [loading, setLoading] = useState(true)
  const { openId } = Taro.getStorageSync('userInfo')
  const { bookMap, setState } = store
  const { params } = useRouter()
  const [segment, setSegment] = useState(Number(params.key) || 0)

  const curSegmentList: any[] = useMemo(() => {
    return (bookMap && bookMap[segment]?.data) || []
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
          } else {
            // 没有数据将数据初始化并加入数据库中
            const defaultData = DEF_MANAGE
            // 将数据插入数据库
            const res = await db_manage.add({ data: defaultData })
            if (res._id) {
              console.log('默认数据插入成功！')
              setState({ bookMap: defaultData })
            } else {
              Taro.atMessage({
                message: '数据执行错误',
                type: 'error'
              })
            }
          }
          setLoading(false)
        } catch (error) {
          console.error('setDefaultManage-失败:', error)
        }
      })()
    }
    setLoading(false)
  }, []) // eslint-disable-line

  return (
    <View className={prefixCls}>
      <View className={`${prefixCls}-header`}>
        <AtSegmentedControl
          values={['支出', '收入']}
          onClick={(value) => setSegment(value)}
          current={segment}
        />
      </View>
      <AtList key={segment} className={`${prefixCls}-content`}>
        <AtActivityIndicator
          mode='center'
          size={34}
          isOpened={!curSegmentList.length || loading}
        />
        {curSegmentList.map((item) => {
          return (
            <AtListItem
              key={item.key}
              // thumb={item.icon}
              title={item.name}
              iconInfo={{ size: 25, color: '#FF4949', value: 'bookmark' }}
            />
          )
        })}
      </AtList>
      <View className={`${prefixCls}-footer`}>
        <AtButton
          full
          type='primary'
          onClick={() => {
            Taro.navigateTo({
              url: `/pages/booknew/index?key=${segment}`
            })
          }}
        >
          + 自定义分类
        </AtButton>
      </View>
    </View>
  )
}

export default inject('bookStore')(observer(BookManage))
