<script setup>
import { defineProps, defineEmits } from "vue"

const props = defineProps({
  status: Boolean,
})

const emits = defineEmits(["close"])

const navList = [
  { to: "/home", label: "ホームページ" },
  { to: "/ice-break", label: "アクティビティ" },
  { to: "/my-profile-page", label: "製作者について" }
]

function closeMenu() {
  emits("close", !props.status)
}
</script>

<template>
  <nav v-show="status">
    <a class="nav-wrap">
      <a @click="closeMenu">
        <img src="../../assets/all/icon-batu.svg" />
      </a>
      <ul class="nav-text-wrap">
        <li v-for="(item, i) of navList" :key="i">
          <router-link class="nav-text" :to="item.to" @click="closeMenu">{{ item.label }}</router-link>
        </li>
      </ul>
    </a>
  </nav>
</template>

<style scoped>
a.nav-wrap {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  min-width: -webkit-fill-available;
  min-height: 50rem;
  background-color: white;
  padding: 1rem;
}

ul {
  list-style-type: none;
}

.nav-text-wrap {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
  justify-content: center;
}

.nav-text {
  font-size: 1.5rem;
}
</style>