import Vue from 'vue'
import router from './router'
import App from './App.vue'
import MicroApp from 'mini-micro-app'

// 测试全局属性-沙箱验证
window.globalStr = 'parent'

MicroApp.start()

Vue.config.productionTip = false
// 处理报错 [Vue warn]: Unknown custom element: <micro-app>
Vue.config.ignoredElements = ['micro-app']

const app = new Vue({
  router,
  render: (h) => h(App),
})

app.$mount('#app')
