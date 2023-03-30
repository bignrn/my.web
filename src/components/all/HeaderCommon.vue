<script setup>
import { ref } from "vue";
import NavMenu from './NavMenu.vue';

const menuFlg = ref(false);

function clickFunction() {
  menuFlg.value = !menuFlg.value;
}
</script>

<template>
  <header class="common-header">
    <NavMenu :status="menuFlg" @close="(e) => { menuFlg = e }" />
    <a @click="clickFunction">
      <img src="../../assets/all/icon-menu.svg" />
    </a>
  </header>
</template>

<style lang="scss" scoped>
.common-header {
  display: flex;
  padding-left: 1rem;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: $theme-color;
}
</style>