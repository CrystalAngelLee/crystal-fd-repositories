import React, { useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import classNames from 'classnames'
import { observer, inject } from 'mobx-react'
import { View, Text } from '@tarojs/components'
import { AtButton, AtInput, AtMessage } from 'taro-ui'
import { CLASS } from '../../constants'
import { uuid } from '../../utils'
import './index.scss'

const prefixCls = CLASS.booknew
const db = Taro.cloud.database()
const db_manage = db.collection('bookmanage')

const Booknew: React.FC<any> = ({ bookStore: store }) => {
  const [type, setType] = useState('font')
  const [name, setName] = useState('') // 类别名称
  const [fontdata, setFontData] = useState({
    name: '文',
    color: '#868686'
  })
  const { params } = useRouter()
  const { openId } = Taro.getStorageSync('userInfo')
  const { setState } = store

  const onSave = () => {
    if (!name || (type === 'font' && (!fontdata.color || !fontdata.name))) {
      Taro.atMessage({
        message: '您有配置未填写，请填写！'
      })
      return
    }
    const newData = {
      name,
      type,
      key: `custom-${uuid()}`,
      icon: fontdata
    }
    let _params: any = {}
    db_manage
      .where({ _openid: openId })
      .get()
      .then(({ data }) => {
        _params = { ...data[0] }
        if (!params.key || !data[0]) return
        _params[params.key].data.push(newData)
        delete _params._id
        delete _params._openid
        const _id = data[0]._id || ''
        db_manage
          .doc(_id)
          .update({ data: _params })
          .then(({ stats }) => {
            if (stats.updated === 1) {
              setState({ bookMap: _params })
              Taro.atMessage({
                message: '更新成功',
                type: 'success'
              })
              // 上级页面数据更新
              Taro.navigateBack()
            }
          })
      })
  }

  return (
    <View className={prefixCls}>
      <AtMessage />
      <View className={`${prefixCls}-container`}>
        <View className={`${prefixCls}-box name`}>
          <Text className={`${prefixCls}-box__title`}>类别名称</Text>
          <View className={`${prefixCls}-box__content`}>
            <AtInput
              name='name'
              value={name}
              border={false}
              placeholder='输入类别名称'
              onChange={(v: string) => setName(v)}
            />
          </View>
        </View>
        <View className={`${prefixCls}-box icon`}>
          <Text className={`${prefixCls}-box__title`}>图标</Text>
          <View className={`${prefixCls}-box__content`}>
            <View className={`${prefixCls}-box__type`}>
              <View
                className={classNames('circle', { active: type === 'icon' })}
                onClick={() => setType('icon')}
              >
                图
              </View>
              <View
                style={{ background: fontdata.color }}
                className={classNames('circle', { active: type === 'font' })}
                onClick={() => setType('font')}
              >
                {fontdata.name || '文'}
              </View>
            </View>
            {type === 'icon' ? (
              <View>ICON 渲染预留</View>
            ) : (
              <View>
                <AtInput
                  name='content'
                  title='内容'
                  value={fontdata.name}
                  onChange={(v: string) => {
                    setFontData({ ...fontdata, name: v })
                  }}
                />
                <AtInput
                  name='color'
                  title='颜色'
                  value={fontdata.color}
                  onChange={(v: string) => {
                    setFontData({ ...fontdata, color: v })
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </View>
      <View className={`${prefixCls}-footer`}>
        <AtButton type='primary' full onClick={onSave}>
          保存
        </AtButton>
      </View>
    </View>
  )
}

export default inject('bookStore')(observer(Booknew))
