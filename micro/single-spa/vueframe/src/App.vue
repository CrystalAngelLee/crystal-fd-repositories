<template>
  <div id="app">
    <Parcel :config="parcelConfig" :mountParcel="mountParcel" />
    <router-link to="/foo">foo</router-link>&nbsp;
    <router-link to="/bar">bar</router-link>
    <router-view></router-view>
    <h2 @click="handleClick">hello a~~</h2>
  </div>
</template>

<script>
import Parcel from "single-spa-vue/dist/esm/parcel"
import { mountRootParcel } from "single-spa"

export default {
  name: 'App',
  components: {
    Parcel
  },
  data() {
    return {
      parcelConfig: window.System.import("@mic-demo/navbar"),
      mountParcel: mountRootParcel
    }
  },
  methods: {
    async handleClick() {
      const toolsModule = await window.System.import("@mic-demo/tools")
      toolsModule.consoleFunc("@mic-demo/vue~~~")
    }
  },
async mounted() {
  const toolsModule = await window.System.import("@mic-demo/tools")
  toolsModule.sharedSubject.subscribe(console.log)
}
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
