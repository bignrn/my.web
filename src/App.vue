<script setup>
import MainLocationView from './views/MainLocationView.vue';
</script>

<template>
  <MainLocationView />
</template>

<style lang="scss">
body {
  margin: 0;
  font-size: medium;
}

@media screen and (max-width: 620px) {
  body {
    font-size: 0.9rem;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
