import Taro from '@tarojs/taro'
import classNames from 'classnames'
import { FC, useState, useCallback } from 'react'
import { CommonEvent } from '@tarojs/components/types/common'
import { View } from '@tarojs/components'
import { AtButton, AtAvatar, AtList, AtListItem, AtMessage } from 'taro-ui'
import { CLASS } from '../../constants'
import Avatar from '../../static/images/avatar.png'
import './index.scss'

const prefixCls = CLASS.mine
interface MineProps {}
type userInfoType = {
  nickName?: string
  openId?: string
  avatarUrl?: string
}

const Mine: FC<MineProps> = () => {
  const [userInfo, setUserInfo] = useState<userInfoType>(
    Taro.getStorageSync('userInfo') || {}
  )

  const _onGetUserInfo = useCallback((e: CommonEvent) => {
    const __userInfo = e.detail.userInfo
    Taro.cloud
      .callFunction({
        name: 'login'
      })
      .then(({ result }) => {
        if (typeof result === 'string') return
        __userInfo.openId = result?.openid || ''
        setUserInfo(__userInfo)
        Taro.setStorageSync('userInfo', __userInfo)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const _onItemClick = (key) => {
    if (!userInfo.openId) {
      Taro.atMessage({
        message: '您当前处于未登录状态，无法使用当前功能，请进行登录使用',
        type: 'warning',
        duration: 6000
      })
      return
    }
    Taro.navigateTo({
      url: `/pages/${key}/index`
    })
  }

  const _onSuggestClick = () => {
    Taro.navigateTo({
      url: '/pages/suggest/index'
    })
  }

  const _onLogout = () => {
    setUserInfo({})
    Taro.removeStorage({ key: 'userInfo' })
  }

  return (
    <View className={prefixCls}>
      <AtMessage />
      <View
        className={classNames(`${prefixCls}-header`, {
          nopermission: !userInfo.openId
        })}
      >
        <View className={`${prefixCls}-header-userInfo`}>
          <AtAvatar
            image={userInfo.openId ? userInfo.avatarUrl : Avatar}
            circle
          />
          {userInfo.openId ? (
            <View className={`${prefixCls}-header-nickName`}>
              {userInfo.nickName}
            </View>
          ) : (
            <AtButton
              size='small'
              circle
              openType='getUserInfo'
              onGetUserInfo={_onGetUserInfo}
            >
              点击登录
            </AtButton>
          )}
        </View>
      </View>
      <View>
        {userInfo.openId && (
          <AtList>
            <AtListItem
              title='资产配置模板'
              onClick={() => _onItemClick('templatelist')}
            ></AtListItem>
            {/* <AtListItem
              title='分类管理'
              onClick={() => _onItemClick('bookmanage')}
            ></AtListItem> */}
            {/* <AtListItem title='产品建议' onClick={_onSuggestClick}></AtListItem> */}
            <AtListItem title='用户注销' onClick={_onLogout}></AtListItem>
          </AtList>
        )}
      </View>
    </View>
  )
}

export default Mine
