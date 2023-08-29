import React, { useCallback, useState } from 'react'
import dayjs from 'dayjs'
import { Form, TextArea, DatePicker, Selector, Button } from 'antd-mobile'
import { useMemo } from 'react'

const prefixCls = 'muzi-record'


function Record() {
  const [form] = Form.useForm()
  const [showForm, setShowForm] = useState(false)
  const [remarklist, setRemarklist] = useState({})

  const initalFormData = useMemo(() => {
    return {
      date: new Date()
    }
  })

  const onShowForm = () => {
    setShowForm(true)
    form.setFieldsValue(initalFormData)
  }

  const onFinish = (values) => {
    console.log(111, values)
    const params = {}
    Object.keys(values).filter(v => !!values[v]).forEach(v => {
      params[v] = values[v]
    })
    if (params.date) {
      const _date = dayjs(params.date)
      params.date = _date.format('YYYY-MM-DD')
      params.week = _date.day() // 周日为 0
    }
    console.log(222, params)
  }

  const formData = [
    {
      label: '时间标记',
      value: 'header_date',
      type: 'header'
    },
    {
      label: '日期',
      value: 'date',
      type: 'datepicker',
      fieldProps: {
        placeholder: '请选择日期'
      }
    },
    {
      label: '时间标签',
      value: 'tag',
      type: 'selector',
      fieldProps: {
        options: [{ value: 'menstrual_period', label: '姨妈期' }]
      }
    },
    {
      label: '单项记录',
      value: 'header_record',
      type: 'header'
    },
    {
      label: '心情标签',
      value: 'mood',
      type: 'selector',
      needRemark: true,
      fieldProps: {
        options: [
          { value: '50', label: '开心' }, 
          { value: '30', label: '平淡' }, 
          { value: '-5', label: 'sad' }, 
          { value: '-20', label: '生气' }
        ]
      }
    },
    {
      label: '饮食',
      value: 'diet',
      type: 'selector',
      needRemark: true,
      fieldProps: {
        multiple: true,
        options: [
          { value: '20', label: '葡萄干(补气血)' },
          { value: '30', label: '姜枣茶' }, 
          { value: '30_0', label: '喝糊糊' }, 
        ]
      }
    },
    {
      label: '保健',
      value: 'healthcare',
      type: 'selector',
      needRemark: true,
      fieldProps: {
        multiple: true,
        options: [
          { value: '30', label: '艾灸' },
          { value: '20', label: '敲八虚' }, 
          { value: '20_0', label: '还阳卧' }, 
          { value: '15', label: '海盐热敷' }, 
          { value: '30_0', label: '仙人揉腹' }, 
          { value: '20_1', label: '日常揉腹' }, 
        ]
      }
    },
    {
      label: '锻炼身体',
      value: 'exercise',
      type: 'selector',
      needRemark: true,
      fieldProps: {
        multiple: true,
        options: [
          { value: '30_0', label: '体态运动' },
          { value: '50', label: '健身' }, 
          { value: '30_1', label: '走路' }, 
          { value: '30_2', label: '八段锦' },
          { value: '30_3', label: '打羽毛球' },
        ]
      }
    },
    {
      label: '泡脚养生',
      value: 'soak',
      type: 'selector',
      needRemark: true,
      fieldProps: {
        multiple: true,
        options: [
          { value: '30', label: '艾草泡脚' },
          { value: '20', label: '清水泡脚' }, 
        ]
      }
    },
    {
      label: '用药',
      value: 'medication',
      type: 'selector',
      needRemark: true,
      fieldProps: {
        multiple: true,
        options: [
          { value: '-10', label: '信必可' },
          { value: '-8', label: '孟鲁司特' }, 
          { value: '3', label: '保健用药' }, 
          { value: '0', label: '日常用药' }, 
          { value: '8', label: '清洗鼻腔' }, 
        ]
      }
    },
    {
      label: '按摩疏通',
      value: 'massage',
      type: 'selector',
      needRemark: true,
      fieldProps: {
        multiple: true,
        options: [
          { value: '20', label: '肝经疏通' },
          { value: '20_0', label: '胆经疏通' }, 
          { value: '20_1', label: '头部按摩' }, 
          { value: '20_2', label: '眼部按摩' }, 
        ]
      }
    },
    {
      label: '睡眠时间',
      value: 'sleep',
      type: 'selector',
      needRemark: true,
      fieldProps: {
        options: [
          { value: '50', label: '11点前' },
          { value: '30', label: '11:30前' }, 
          { value: '-10', label: '12:00前' }, 
          { value: '-30', label: '12:00后' }, 
          { value: '-100', label: '12:30后' }, 
        ]
      }
    },
    {
      label: '学习',
      value: 'learn',
      type: 'selector',
      needRemark: true,
      fieldProps: {
        multiple: true,
        options: [
          { value: '15_0', label: '架构学习' },
          { value: '15_1', label: '阅读' }, 
        ]
      }
    },
    {
      label: '美容',
      value: 'cosmetic',
      type: 'selector',
      needRemark: true,
      fieldProps: {
        multiple: true,
        options: [
          { value: '30', label: '美容仪' },
          { value: '20', label: '面膜' }, 
        ]
      }
    },
    {
      label: '碎碎念',
      value: 'header_remark',
      type: 'header'
    },
    {
      label: '备忘',
      value: 'remark',
      type: 'textarea',
      fieldProps: {
        placeholder: '请输入今日备忘'
      }
    },
  ]

  const renderField = useCallback((field) => {
    if (field.type === 'header') {
      return <Form.Header key={field.value}>{field.label}</Form.Header>
    }
    let formItem = null, formProps = {}
    if (field.needRemark) {
      field.fieldProps = {
        ...field.fieldProps,
        onChange: (val) => {
          setRemarklist({ ...remarklist, [field.value]: val })
        }
      }
    }
    switch (field.type) {
      case 'datepicker':
        formItem = <DatePicker>
          {value =>
            value ? dayjs(value).format('YYYY-MM-DD') : field.fieldProps.placeholder
          }
        </DatePicker>
        formProps = {
          trigger: 'onConfirm',
          onClick: (e, datePickerRef) => {
            datePickerRef.current?.open()
          }
        }
        break;

      case 'selector':
        formItem = <Selector {...field.fieldProps} />
        break

      case 'textarea':
        formItem = <TextArea {...field.fieldProps} />
        break

      default:
        break;
    }

    const fields = [
      <Form.Item key={field.value} name={field.value}
        label={field.label}
        {...formProps}
      >
        {formItem}
      </Form.Item>]
    if (field.needRemark && remarklist[field.value] && remarklist[field.value].length) {
      let __fields = remarklist[field.value].map(r => {
        const label = field.fieldProps.options.find(o => r === o.value).label || ''
        return <Form.Item key={`${field.value}_remark_${r}`} name={`${field.value}_remark_${r}`} label={label}>
          <TextArea placeholder={`添加${label}备注`} />
        </Form.Item>
      })
      fields.push(__fields)
    }


    return fields
  }, [remarklist])

  return (
    <Form form={form} onFinish={onFinish} layout='horizontal' mode='card' footer={
        <Button block type='submit' color='primary' size='large'>
          提交
        </Button>
      }>
        {formData.map(field => renderField(field))}
      </Form>
  )
}

export default Record
