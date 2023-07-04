<template>
  <div id="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="主应用" />
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
    <div class="text-color">我是基座应用的文字</div>
    <!-- <micro-app name="app" url="http://localhost:10000/"></micro-app> -->
    <div>React17</div>
    <micro-app
      name="react17"
      url="http://localhost:10001/"
      @created="created"
      @beforemount="beforemount"
      @mounted="mounted"
      @unmount="unmount"
      @error="error"
    ></micro-app>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
    created() {
      console.log('micro-app元素被创建')
    },
    beforemount() {
      console.log('即将被渲染')
    },
    mounted() {
      console.log('已经渲染完成')
    },
    unmount() {
      console.log('已经卸载')
    },
    error() {
      console.log('渲染出错')
    }
  }
}
</script>

<style>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.text-color {
  color: red;
}
</style>
