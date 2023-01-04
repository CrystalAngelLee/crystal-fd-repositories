import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'

const db = Taro.cloud.database()

interface TemplateListProps {}

const TemplateList: React.FC<TemplateListProps> = () => {
  const [list, setList] = useState<any>([])
  useEffect(() => {
    ;(async () => {
      const { openId } = Taro.getStorageSync('userInfo')
      const { data } = await db
        .collection('templatelist')
        .where({
          _openid: openId // 填入当前用户 openid
        })
        .get()
      setList(data)
    })()
    return () => {
      setList([])
    }
  }, [])
  return (
    <View>
      <AtList>
        {list.map((item) => {
          return (
            <AtListItem
              key={item._id}
              title={item.name || ''}
              onClick={() => {
                Taro.navigateTo({
                  url: `/pages/template/index?id=${item._id}`
                })
              }}
            />
          )
        })}
      </AtList>
    </View>
  )
}

export default TemplateList
