<script setup>
import TopicDice from "../components/activity/TopicDice.vue"
</script>

<template>
  <article class="ice-brake-root">
    <!-- TODO routerで遷移する -->
    <TopicDice />
  </article>
</template>

<style lang="scss" scoped>
.ice-brake-root {
  margin-top: calc($header-height + 2rem);
}
</style>