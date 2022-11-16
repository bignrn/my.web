<script setup>
import { ref } from "vue";
import NavMenu from './NavMenu.vue';

const menuFlg = ref(false);

function clickFunction() {
  menuFlg.value = !menuFlg.value;
}
</script>

<template>
  <header class="orange">
    <NavMenu :status="menuFlg" @close="(e) => { menuFlg = e }" />
    <a @click="clickFunction">
      <img src="../../assets/all/icon-menu.svg" />
    </a>
  </header>
</template>

<style scoped>

</style>