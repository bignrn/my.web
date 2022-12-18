<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  status: Boolean,
})

const router = useRouter();
const emits = defineEmits(["close"])

const navList = [
  { to: router.resolve({ name: "home" }).href, label: "ホームページ" },
  { to: router.resolve({ name: "iceBreak" }).href, label: "アクティビティ" },
  { to: router.resolve({ name: "MyHistory" }).href, label: "製作者について" }
]

function closeMenu() {
  emits("close", !props.status)
}
</script>

<template>
  <transition name="fade">
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
  </transition>
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