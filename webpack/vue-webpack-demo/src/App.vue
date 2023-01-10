<template>
  <div id="app">
    <img alt="Vue logo" :src="url">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
     {{ msg }}
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <input/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import logo from './assets/logo.png';

export default {
  data() {
    return {
      msg: 'Hello Vue',
      url: logo,
    };
  },
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    fetchData() {
      const that = this
      new Promise((resovle) => {
        resovle('验证ES6语法')
      }).then(res => {
        console.log(res)
        that.msg = res
      })
    }
  },
  created() {
    this.fetchData();
  },
};
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