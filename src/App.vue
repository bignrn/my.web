<script setup>
import MainLocationView from './views/MainLocationView.vue';
</script>

<template>
  <MainLocationView />
</template>

<style>
body {
  margin: 0;
}

header {
  display: flex;
  margin-left: 1rem;
  margin-top: 1rem;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgb(219, 217, 217);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
