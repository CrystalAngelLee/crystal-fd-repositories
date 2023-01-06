export const GLOBAL = {
  INCOME: '收入',
  NODATA: '暂无数据，点击添加',
  INCOMECONFIG: '配置金额',
  CONFIGED: '已配置'
}

type MessageType = 'info' | 'success' | 'error' | 'warning'

interface AtMessageOptions {
  message: string
  type?: MessageType
  duration?: number
}

interface TIPPROPS {
  PERMISSIONTIP: AtMessageOptions
}

export const TIP: TIPPROPS = {
  PERMISSIONTIP: {
    message:
      '您当前处于未登录状态，无法使用当前功能，请到个人中心页面进行登录使用',
    type: 'warning',
    duration: 6000
  }
}
