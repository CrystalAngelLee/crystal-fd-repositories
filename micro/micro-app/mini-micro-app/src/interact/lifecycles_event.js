import microApp from '../'
import { isFunction } from '../libs/utils'

/**
 * 发送生命周期事件
 */
export default function dispatchLifecyclesEvent(
  element,
  appName,
  lifecycleName
) {
  const detail = Object.assign({
    name: appName,
    container: element
  })
  // https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent/CustomEvent
  const event = new CustomEvent(lifecycleName, {
    detail
  })
  // 全局监听：每个应用的生命周期执行时都触发
  if (
    microApp.options &&
    microApp.options.lifeCycles &&
    isFunction(microApp.options.lifeCycles[lifecycleName])
  ) {
    microApp.options.lifeCycles[lifecycleName](event)
  }
  element.dispatchEvent(event)
}
