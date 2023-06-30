import Vue from 'vue'
import router from './router'
import App from './App.vue'
import MicroApp from 'mini-micro-app'

// 测试全局属性-沙箱验证
window.globalStr = 'parent'

MicroApp.start({
  // 插件
  plugins: {
    // 全局插件
    global: [],
    // 子应用插件
    modules: {
      react17: [
        {
          loader(code, url, options) {
            console.log(888, code, url, options)
            if (url === 'xxx.js') {
              code = code.replace('var abc =', 'window.abc =')
            }
            return code
          }
        }
      ]
    }
  }
})

Vue.config.productionTip = false
// 处理报错 [Vue warn]: Unknown custom element: <micro-app>
Vue.config.ignoredElements = ['micro-app']

const app = new Vue({
  router,
  render: (h) => h(App)
})

app.$mount('#app')
