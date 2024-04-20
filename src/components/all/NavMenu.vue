<script setup>
import { defineProps, defineEmits } from "vue"
import { useRouter } from "vue-router";

const props = defineProps({
  status: Boolean,
})

const emits = defineEmits(["close"])
const router = useRouter();

const navList = [
  { to: router.resolve({ name: "MyHistory" }), label: "製作者について" },
  { to: router.resolve({ name: "iceBreak" }), label: "アイスブレイク" },
]

function closeMenu() {
  emits("close", !props.status)
}
</script>

<template>
  <nav v-show="status" class="nav-main-wrap">
    <a class="nav-wrap">
      <a @click="closeMenu" class="back-btn">
        <img src="images/all/icon-batu.svg" />
      </a>
      <ul class="nav-text-wrap">
        <li v-for="(item, i) of navList" :key="i">
          <router-link class="nav-text" :to="item.to" @click="closeMenu">{{ item.label }}</router-link>
        </li>
      </ul>
    </a>
  </nav>
</template>

<style lang="scss" scoped>
.nav-main-wrap {
  padding: 30px;

  a {
    font-weight: bold;
    color: black;

    &.router-link-exact-active {
      color: rgba(#fff, 0.5);
    }

    &.nav-wrap {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1000;
      width: 100%;
      max-height: 50rem;
      background-color: $theme-color;
      padding: 1rem;

      .back-btn {
        display: flex;

        >img {
          width: 2rem;
          height: 2rem;
        }
      }

      ul {
        list-style-type: none;

        &.nav-text-wrap {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          align-items: flex-start;
          justify-content: center;

          .nav-text {
            font-size: 1.6rem;
          }
        }
      }
    }
  }
}
</style>