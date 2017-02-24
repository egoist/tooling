<template>
  <div id="app">
    <button @click="count+=10">Hi!! {{ count }}</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: 0
      }
    }
  }
</script>

<style scoped>
  button {
    font-size: 40px;
  }
</style>
