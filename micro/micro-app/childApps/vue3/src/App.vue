<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <router-link to="/">Go to Home</router-link>
  <router-link to="/about">Go to About</router-link>
  <router-link to="/detail">Go to detail</router-link>
  <router-view></router-view>
</template>

<script>
import { useRouter } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  watch: {
    $route({ path }) {
      if (window.microApp) {
        window.microApp.dispatch({
          path: path,
        })
      }
    },
  },
  mounted() {
    const router = useRouter()
    function dataListener(data) {
      if (data.path) {
        router.push(data.path)
      }
    }
    if (window.__MICRO_APP_ENVIRONMENT__) {
      window.microApp.addDataListener(dataListener)
    }
  },
  unmounted() {
    if (window.__MICRO_APP_ENVIRONMENT__) {
      // 解绑监听函数
      window.microApp.removeDataListener()
      // 清空当前子应用的所有绑定函数(全局数据函数除外)
      window.microApp.clearDataListener()
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
