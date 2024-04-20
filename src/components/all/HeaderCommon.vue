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
      <img src="images/all/icon-menu.svg" />
    </a>
  </header>
</template>

<style lang="scss" scoped>
.common-header {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: $header-height;
  padding-left: 1rem;
  background-color: $theme-color;

  &.isProfile {
    background-color: transparent;
  }
}
</style>