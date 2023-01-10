<template>
  <div class="dynamic">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'Dynamic',
  data() {
    return {
      title: 'This is a dynamic component',
    };
  },
}
</script>