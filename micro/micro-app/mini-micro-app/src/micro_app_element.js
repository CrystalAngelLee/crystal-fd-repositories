import CreateApp, { appInstanceMap } from './create_app'
import dispatchLifecyclesEvent from './interact/lifecycles_event'

class MicroAppElement extends HTMLElement {
  // 声明需要监听的属性名，只有这些属性变化时才会触发attributeChangedCallback
  static get observedAttributes() {
    return ['name', 'url']
  }

  constructor() {
    super()
    console.log('constructor')
  }

  connectedCallback() {
    // 元素被插入到DOM时执行，此时去加载子应用的静态资源并渲染
    console.log('micro-app is connected')
    dispatchLifecyclesEvent(this, this.name, 'created')
    // 预加载情况：查看缓存中是否有实例
    if (appInstanceMap.has(this.name)) {
      const oldApp = appInstanceMap.get(this.name)
    } else {
      // 创建微应用实例
      const app = new CreateApp({
        name: this.name,
        url: this.url,
        container: this
      })

      // 记入缓存，用于后续功能
      appInstanceMap.set(this.name, app)
    }
  }

  disconnectedCallback() {
    // 元素从DOM中删除时执行，此时进行一些卸载操作
    console.log('micro-app has disconnected')
    // 获取应用实例
    const app = appInstanceMap.get(this.name)
    // 如果有属性destory，则完全卸载应用包括缓存的文件
    app.unmount(this.hasAttribute('destory'))
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    // 元素属性发生变化时执行，可以获取name、url等属性的值
    console.log(`attribute ${attrName}: ${newVal}`)
    // 分别记录name及url的值
    if (attrName === 'name' && !this.name && newVal) {
      this.name = newVal
    } else if (attrName === 'url' && !this.url && newVal) {
      this.url = newVal
    }
  }
}

export function defineElement() {
  /**
   * 注册元素
   * 注册后，就可以像普通元素一样使用micro-app，当micro-app元素被插入或删除DOM时即可触发相应的生命周期函数。
   */
  // 如果已经定义过，则忽略
  if (!window.customElements.get('micro-app')) {
    window.customElements.define('micro-app', MicroAppElement)
  }
}
