<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import NavMenu from './NavMenu.vue';

const menuFlg = ref(false);
const router = useRouter();
const route = useRoute();

function clickFunction() {
  menuFlg.value = !menuFlg.value;
}

const isProfile = computed(() => {
  return route.path === router.resolve({ name: "MyHistory" }).fullPath
});
</script>

<template>
  <header class="common-header" :class="{ 'isProfile': isProfile }">
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

  &.isProfile {
    background-color: transparent;
  }
}
</style>