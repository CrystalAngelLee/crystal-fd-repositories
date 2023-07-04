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
  element.dispatchEvent(event)
}
