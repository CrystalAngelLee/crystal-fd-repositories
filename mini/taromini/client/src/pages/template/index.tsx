import { FC, useEffect, useMemo, useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import {
  AtButton,
  AtInput,
  AtForm,
  AtSwitch,
  AtMessage,
  AtActivityIndicator
} from 'taro-ui'
import {
  GLOBAL,
  CLASS,
  DEF_INCOME,
  default_configData,
  default_template
} from '../../constants'
import { uuid, curValue } from '../../utils'
import { TemplateStoreProps } from '../../store/template'
import TemplateList, { validate } from './TemplateList'
import './index.scss'

const prefixCls = CLASS.template
const db = Taro.cloud.database()
interface TemplateProps {
  templateStore: TemplateStoreProps
}

function _setConfData(configs, item, flag = false) {
  const newConfigs = configs.map((conf) => {
    if (item.uniqueId && !item.uniqueId.includes(conf.uniqueId)) return conf
    if (conf.uniqueId === item.uniqueId) {
      flag = true
      return item
    }
    if (flag === false && conf.configs) {
      conf.configs = _setConfData(conf.configs, item, false)
    }
    return conf
  })
  return newConfigs
}

function _delConfData(configs, uniqueId) {
  const newConfigs: any[] = []
  for (let idx = 0; idx < configs.length; idx++) {
    const conf = configs[idx]
    if (conf.uniqueId === uniqueId) continue
    if (conf.configs) {
      conf.configs = _delConfData(conf.configs, uniqueId)
    }
    newConfigs.push(conf)
  }
  return newConfigs
}
type paramsProps = {
  uniqueId: string
  item?: any
  data?: any
  isdelete?: boolean
  isadd?: boolean
}
type onChangeType = (params: paramsProps) => void

const TemplateFooter = ({ onOk }) => {
  const onCancel = () => Taro.navigateBack()
  return (
    <View className={`${prefixCls}-footer at-row`}>
      <View className='at-col'>
        <AtButton onClick={onCancel}>取消</AtButton>
      </View>
      <View className='at-col'>
        <AtButton type='primary' onClick={onOk}>
          保存
        </AtButton>
      </View>
    </View>
  )
}

const Template: FC<TemplateProps> = () => {
  const [incomeFocus, setIncomeFocus] = useState(false)
  const [templateConfig, setTemplateConfig] = useState<any>({})
  const [loading, setLoading] = useState(false)

  const configedNum = useMemo(() => {
    if (!templateConfig || !templateConfig._value) return 0
    let rest = templateConfig._value || DEF_INCOME
    templateConfig.configs.forEach((item) => {
      rest = curValue(
        item.rule_opt,
        item.rule,
        templateConfig._value,
        rest
      ).rest
    })
    return rest
  }, [templateConfig])

  const {
    params: { id }
  } = useRouter()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      if (id !== undefined) {
        db.collection('templatelist')
          .doc(id)
          .get({
            success: ({ data }) => {
              setTemplateConfig(data)
              setLoading(false)
            }
          })
      } else {
        setTemplateConfig(default_template)
        setLoading(false)
      }
    })()
  }, []) // eslint-disable-line

  const _onAddTemplate = () => {
    setTemplateConfig({
      ...templateConfig,
      configs: [
        ...templateConfig.configs,
        {
          ...default_configData,
          uniqueId: uuid()
        }
      ]
    })
  }

  const _onChange: onChangeType = ({
    uniqueId,
    item,
    data,
    isdelete,
    isadd
  }) => {
    let newConfigs = [...templateConfig.configs]
    if (isadd) {
      // 添加元素
      // 1. 创建新数据
      const newItem = { ...item },
        newId = uuid()
      newItem.configs = item.configs || []
      newItem.configs.push({
        uniqueId: `${item.uniqueId}-${newId}`,
        name: '',
        rule: '',
        rule_opt: '',
        checked: false
      })
      // 修改当前数据
      _onChange({ uniqueId, item: newItem })
    } else if (isdelete) {
      // 删除元素
      newConfigs = _delConfData(newConfigs, uniqueId)
      setTemplateConfig({
        ...templateConfig,
        configs: newConfigs
      })
    } else {
      // 修改元素
      const newItem = { ...item, ...data }
      newConfigs = _setConfData(newConfigs, newItem)
      setTemplateConfig({
        ...templateConfig,
        configs: newConfigs
      })
    }
  }

  const _onFormChange = (data) => {
    setTemplateConfig({ ...templateConfig, ...data })
  }

  const _saveTemplateData = () => {
    templateConfig.configs.forEach((item) => {
      if (validate(item)) {
        return Taro.atMessage({
          message: '请正确填写您的配置项后进行保存',
          type: 'warning'
        })
      }
    })
    if (configedNum !== DEF_INCOME && templateConfig.active) {
      // TODO: 给出弹窗提示当前配置并不完全，启用不成功
    }
    if (templateConfig._id) {
      const data = {
        ...templateConfig
      }
      delete data._id
      delete data._openid
      db.collection('templatelist')
        .doc(templateConfig._id)
        .update({ data })
        .then(({ stats }) => {
          if (stats.updated === 1) {
            Taro.atMessage({
              message: '保存成功',
              type: 'success'
            })
          }
        })
    } else {
      db.collection('templatelist')
        .add({
          data: {
            ...templateConfig,
            configs: templateConfig.configs
          }
        })
        .then((res) => {
          if (res._id) {
            templateConfig._id = res._id
          }
        })
    }
  }

  if (!templateConfig || loading)
    return (
      <AtActivityIndicator
        mode='center'
        size={34}
        isOpened={!templateConfig || loading}
      />
    )

  return (
    <View className={prefixCls}>
      <View className={`${prefixCls}-container`}>
        <AtMessage />
        <View>
          <AtForm>
            <AtInput
              name='name'
              title='名称'
              placeholder='给模板起个名称吧'
              value={templateConfig.name || ''}
              onChange={(v) => _onFormChange({ name: v })}
            />
            <AtSwitch
              title='启用'
              checked={templateConfig.active}
              onChange={(v) => _onFormChange({ active: v })}
            />
          </AtForm>
        </View>
        <View className={`${prefixCls}-header`}>
          {GLOBAL.INCOMECONFIG}
          <View
            className={`${prefixCls}-income`}
            onClick={() => setIncomeFocus(true)}
          >
            {incomeFocus ? (
              <Input
                className='at-input__input'
                value={templateConfig._value || DEF_INCOME}
                onBlur={(event) => {
                  _onFormChange({ _value: event.detail.value })
                  setIncomeFocus(false)
                }}
              />
            ) : (
              [
                templateConfig._value || DEF_INCOME,
                <Text key='configedNum'>
                  （{`${GLOBAL.CONFIGED}${configedNum}`}）
                </Text>
              ]
            )}
          </View>
          <Text className=' at-icon at-icon-add' onClick={_onAddTemplate} />
        </View>
        <TemplateList onChange={_onChange} config={templateConfig} />
      </View>
      <TemplateFooter onOk={_saveTemplateData} />
    </View>
  )
}

export default Template
