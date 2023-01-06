import classNames from 'classnames'
import { FC } from 'react'
import { View, Picker, Text } from '@tarojs/components'
import { AtInput, AtForm, AtListItem } from 'taro-ui'
import { curValue } from '../../utils'
import { CLASS, DEF_INCOME } from '../../constants'
import './index.scss'

const prefixCls = CLASS.template
interface TemplateListProps {
  config: any
  onChange: (_: any) => void
}

export const validate = (item) =>
  Object.keys(item).filter((key) => item[key] === '').length ? true : false

const getOptions = (isChild = false) => {
  return [
    { label: '定量', key: 'constant' },
    { label: '定量计算', key: 'calculation' },
    { label: isChild ? '总量百分比%' : '收入百分比%', key: 'percent' },
    { label: '剩余百分比%', key: 'restpercent' },
    { label: '前面计算百分比%', key: 'calcsumpercent' }
  ]
}

const TemplateList: FC<TemplateListProps> = ({ config, onChange }) => {
  const list = config.configs

  if (!list) return null

  /* 删除配置 */
  const _onDelete = (uniqueId) => {
    onChange({
      uniqueId,
      isdelete: true
    })
  }

  /* 配置子资产计划 */
  const _onAddChlidPlan = (uniqueId, item) => {
    onChange({
      uniqueId,
      item,
      isadd: true
    })
  }

  const getCurRange = (conf, data, idx) => {
    let range: string[] = []
    let _onRangeChange = (_: any, __: any) => {}
    if (!conf.uniqueId && idx === 0) {
      range = ['配置子资产计划']
      if (data.configs && data.configs.length) {
        range.push('添加子资产计划')
      }
      _onRangeChange = (_, item) => _onAddChlidPlan(item.uniqueId, item)
    } else {
      range = ['删除', '配置子资产计划']
      if (data.configs && data.configs.length) {
        range.push('添加子资产计划')
      }
      _onRangeChange = (e, item) => {
        switch (e) {
          case '0':
            _onDelete(item.uniqueId)
            break
          case '1':
          case '2':
            _onAddChlidPlan(item.uniqueId, item)
            break
          default:
            break
        }
      }
    }
    return {
      range,
      onRangeChange: _onRangeChange
    }
  }

  let _rest = config._value || DEF_INCOME
  return (
    <View className={`${prefixCls}-list`}>
      {list.map((item, idx: number) => {
        const { uniqueId, name, rule, rule_opt, remark = '' } = item
        const options = getOptions(uniqueId.includes('-'))
        const { range, onRangeChange } = getCurRange(config, item, idx)
        const { curVal } = curValue(
          item.rule_opt,
          item.rule,
          config._value || DEF_INCOME,
          _rest
        )
        if (item.configs && item.configs.length > 0) {
          item._value = curVal
        }
        _rest = _rest - curVal
        return (
          <View
            key={uniqueId || `card-${idx}`}
            className={classNames(`${prefixCls}-card`, {
              warning: validate(item)
            })}
          >
            <Picker
              mode='selector'
              range={range || []}
              onChange={(e) => onRangeChange(e.detail.value, item)}
            >
              <View className={`${prefixCls}-list-form-opt`}>
                <Text className='at-icon at-icon-list' />
              </View>
            </Picker>
            <AtForm className={`${prefixCls}-list-form`}>
              <AtInput
                required
                type='text'
                name='name'
                title='配置名称'
                value={name}
                onChange={(v: string) => {
                  onChange({
                    uniqueId,
                    item,
                    data: {
                      name: v
                    }
                  })
                }}
              />
              <Picker
                mode='selector'
                range={options.map((o) => o.label)}
                onChange={(e) => {
                  onChange({
                    uniqueId,
                    item,
                    data: { rule_opt: e.detail.value }
                  })
                }}
              >
                <AtListItem
                  title='配置规则类型'
                  hasBorder={false}
                  extraText={
                    (rule_opt !== '' && `${options[rule_opt]?.label}`) || ''
                  }
                  className={`${prefixCls}-list-form-rules`}
                />
              </Picker>
              {rule_opt !== '' && (
                <AtInput
                  type='number'
                  name='rule'
                  title='配置规则'
                  value={rule}
                  onChange={(v: string) => {
                    onChange({
                      uniqueId,
                      item,
                      data: { rule: v, _value: curVal }
                    })
                  }}
                >
                  {curVal}
                </AtInput>
              )}
              <AtInput
                type='text'
                name='name'
                title='备注'
                value={remark}
                onChange={(v: string) => {
                  onChange({
                    uniqueId,
                    item,
                    data: {
                      remark: v
                    }
                  })
                }}
              />
              {item.configs && item.configs.length ? (
                <TemplateList config={item} onChange={onChange} />
              ) : null}
            </AtForm>
          </View>
        )
      })}
    </View>
  )
}

export default TemplateList
