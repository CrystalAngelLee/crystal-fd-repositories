<template>
  <div id="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="主应用" />
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
    <div class="text-color">我是基座应用的文字</div>
    <micro-app name="app" url="http://localhost:10000/"></micro-app>
    <!-- <micro-app name="app1" url="http://localhost:10001/"></micro-app> -->
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
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
