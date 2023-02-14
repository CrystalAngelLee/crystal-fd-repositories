<template>
  <main>
    <fc-bubbles Click :style="{ '--color': '#57a9ff' }">
      <fc-3d-btn />
    </fc-bubbles>

    <fc-bubbles Click :style="{ '--color': '#0af', '--spread-x': '20%' }">
      <fc-dbl-warp-btn />
    </fc-bubbles>

    <fc-bubbles Click :style="{ '--spread-y': '80%' }">
      <fc-underline-btn />
    </fc-bubbles>

    <fc-bubbles Click>
      <fc-pixel-btn />
    </fc-bubbles>

    <fc-bubbles Click>
      <fc-parenthesis-btn />
    </fc-bubbles>

    <fc-bubbles Click>
      <fc-round-btn />
    </fc-bubbles>

    <fc-bubbles Click :style="{ '--spread-x': '40%' }">
      <fc-arrow-btn />
    </fc-bubbles>

    <fc-bubbles Click :style="{ '--color': '#0bf', '--spread-x': '20%' }">
      <fc-warp-btn />
    </fc-bubbles>

    <fc-china />
  </main>
</template>

<script>
</script>

<style>
main {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 20px
}

main > * { margin: 30px }
</style>
