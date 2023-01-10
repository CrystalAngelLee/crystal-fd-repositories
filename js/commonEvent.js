/* 写一个通用的事件侦听器函数 */
export const eventFunc = {
  // 添加事件
  addHandler: function (elem, type, handler) {
    if (elem.addEventListener) {
      elem.addEventListener(type, handler, false)
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + type, handler)
    } else {
      elem['on' + type] = handler
    }
  },

  // 获取事件对象，事件目标，阻止事件的默认行为
  getEvent: function (event) {
    return event || window.event
  },
  getTarget: function (event) {
    return event.target || event.srcElement
  },
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault()
    } else {
      event.returnValue = false
    }
  },

  // 删除事件
  removeEvent: function (elem, type, handler) {
    if (elem.removeHandler) {
      elem.removeEventListener(type, handler, false)
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + type, handler)
    } else {
      elem['on' + type] = null
    }
  },

  // 取消事件冒泡
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation()
    } else {
      event.cancelBubble = true
    }
  },
}
