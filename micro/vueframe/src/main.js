import Vue from 'vue';
import VueRouter from "vue-router"
import singleSpaVue from 'single-spa-vue';

import App from './App.vue';

Vue.use(VueRouter)

Vue.config.productionTip = false;

// 组件
const Foo = { template: "<div>Foo</div>" }
const Bar = { template: "<div>Bar</div>" }

// 规则
const routes = [
  { path: "/foo", component: Foo },
  { path: "/bar", component: Bar }
]

// 实例
const router = new VueRouter({ routes, mode: "history", base: "/vueframe" })

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    // 路由
    router,
    // 渲染组件
    render(h) {
      return h(App, {
        // 向组件中传递数据
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
          // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa,
        },
      });
    },
  },
});

// 导出生命周期函数
export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
