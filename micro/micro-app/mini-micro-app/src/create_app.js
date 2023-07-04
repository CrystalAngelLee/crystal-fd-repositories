import loadHtml from './source/loader/html'
import SandBox from './sandbox'
import dispatchLifecyclesEvent from './interact/lifecycles_event'

// 微应用实例缓存
export const appInstanceMap = new Map()

// 每一个实例都是一个微应用
export default class CreateApp {
  // 组件状态：包括 created/loading/mount/unmount
  state = 'created'

  // 存放应用的静态资源
  source = {
    links: new Map(), // link元素对应的静态资源
    scripts: new Map() // script元素对应的静态资源
  }

  constructor({ name, url, container }) {
    this.name = name // 应用名称
    this.url = url // url地址
    this.container = container // micro-app元素
    // 加载HTML
    this.loadSourceCode()
    this.sandbox = new SandBox(name)
  }

  loadSourceCode() {
    this.state = 'loading'
    loadHtml(this)
  }

  // 资源加载完时执行
  onLoad(htmlDom) {
    this.loadCount = this.loadCount ? this.loadCount + 1 : 1
    // 第二次执行且组件未卸载时执行渲染
    if (this.loadCount === 2 && this.state !== 'unmount') {
      // 记录DOM结构用于后续操作
      this.source.html = htmlDom
      // 执行mount方法
      this.mount()
    }
  }

  // 资源加载完成后进行渲染
  mount() {
    dispatchLifecyclesEvent(this.container, this.name, 'beforemount')
    // 克隆DOM节点
    const cloneHtml = this.source.html.cloneNode(true)
    // 创建一个fragment节点作为模版，这样不会产生冗余的元素
    const fragment = document.createDocumentFragment()
    Array.from(cloneHtml.childNodes).forEach((node) => {
      fragment.appendChild(node)
    })

    // 将格式化后的DOM结构插入到容器中
    this.container.appendChild(fragment)

    this.sandbox?.start()

    // 执行js
    this.source.scripts.forEach((info) => {
      ;(0, eval)(this.sandbox.bindScope(info.code))
    })
    dispatchLifecyclesEvent(this.container, this.name, 'mounted')

    // 标记应用为已渲染
    this.state = 'mounted'
  }

  /**
   * 卸载应用
   * 执行关闭沙箱，清空缓存等操作
   * @param destory 是否完全销毁，删除缓存资源
   */
  unmount(destory) {
    // 更新状态
    this.status = 'unmount'
    dispatchLifecyclesEvent(this.container, this.name, 'unmount')
    // 清空容器
    this.container = null
    this.sandbox.stop()
    // destory为true，则删除应用
    if (destory) {
      appInstanceMap.delete(this.name)
    }
  }
}
