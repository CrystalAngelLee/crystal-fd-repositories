<template>
  <div id='app'>
    <h1>hi {{ data }}</h1>
    <input v-model='data'/>
    <button @click="handleClick">click</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      data: 'a'
    }
  },
  methods: {
    handleClick() {
      console.log(111)
    }
  }
}
</script>

<style>

</style>