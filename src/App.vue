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

header {
  display: flex;
  padding-left: 1rem;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  /* height: 100%; */
  position: fixed;
  top: 0;
  width: 100%;
}

.orange {
  background-color: $theme-color;
}

footer {
  bottom: 0;
  font-family: "Sawarabi Mincho";
  font-weight: 600;
  width: 100%;
  padding-bottom: 0.5rem;
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
