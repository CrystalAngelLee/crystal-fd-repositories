import { useEffect, useState } from 'react'
import { View, Picker } from '@tarojs/components'
import {
  AtFloatLayout,
  AtForm,
  AtInput,
  AtListItem,
  AtButton,
  AtSwitch
} from 'taro-ui'
import Taro from '@tarojs/taro'
import { CLASS } from '../../constants'

const db = Taro.cloud.database()
const prefixCls = CLASS.finaceplan

const FloatLayout = ({
  isOpened,
  onClose: _onClose,
  finaceData,
  onSure,
  templateList
}) => {
  const [data, setData] = useState(finaceData)
  const [range, setRange] = useState<any[]>([])
  const [templist, setTemplist] = useState<any[]>([])

  useEffect(() => {
    const { openId } = Taro.getStorageSync('userInfo')
    if (!templateList) {
      db.collection('templatelist')
        .where({
          _openid: openId // 填入当前用户 openid
        })
        .get()
        .then(({ data: __data }) => {
          const __range = __data.map((d) => d.name)
          setRange(__range)
          setTemplist(__data)
        })
    } else {
      setTemplist(templateList)
    }
    return () => {}
  }, [templateList])

  useEffect(() => {
    setData(finaceData)
  }, [finaceData])

  const _onFormChange = (v) => {
    setData({
      ...data,
      ...v
    })
  }

  const _onSure = () => {
    if (!data.income || !data.templateId) {
      Taro.atMessage({
        message: '请正确填写所需项目',
        type: 'warning'
      })
      return
    }
    const templateInfo = templist.find((t) => t._id === data.templateId)
    data.templateInfo = templateInfo
    onSure?.(data)
  }

  const _onRefreshModule = () => {
    const templateInfo = templist.find((t) => t._id === data.templateId)
    setData({ ...data, templateInfo })
  }

  return (
    <AtFloatLayout isOpened={isOpened} title='编辑' onClose={_onClose}>
      <AtForm>
        <AtInput
          title='收入'
          name='income'
          required
          value={data.income || ''}
          onChange={(v) => _onFormChange({ income: v })}
        />
        <AtInput
          title='税前收入'
          name='taxbefore'
          value={data.taxbefore || ''}
          onChange={(v) => _onFormChange({ taxbefore: v })}
        />
        <Picker
          mode='selector'
          range={range}
          onChange={(e) => {
            _onFormChange({ templateId: templist[e.detail.value]._id })
          }}
        >
          <AtListItem
            title='计算模板'
            extraText={
              templist.filter((t) => t._id === data.templateId)[0]?.name || ''
            }
          />
        </Picker>
        <AtSwitch
          title='默认展示'
          checked={data.active}
          onChange={(e) => {
            _onFormChange({ active: e })
          }}
        />
      </AtForm>
      <View className={`${prefixCls}-layout-button`}>
        <AtButton type='primary' circle size='small' onClick={_onRefreshModule}>
          更新模版
        </AtButton>
        <AtButton type='primary' circle size='small' onClick={_onSure}>
          确认
        </AtButton>
      </View>
    </AtFloatLayout>
  )
}

export default FloatLayout
