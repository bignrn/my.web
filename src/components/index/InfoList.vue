<script setup>
import { defineProps } from "vue"
defineProps({
  updateLists: { type: Array },
});
</script>

<template>
  <section class="wrap">
    <div class="float">
      <h2>アップデート情報</h2>
      <img src="../../assets/index/icon-update-info.svg" style="width: 3rem;" />
    </div>
    <ul>
      <li v-for="(list, i) of updateLists" :key="i">{{ list.title }}</li>
    </ul>
  </section>
</template>

<style scoped>
section {
  font-family: 'Courier New', Courier, monospace;
  display: inline-block;
  border: 2px orange solid;
}

section.wrap {
  width: 50%;
}

@media screen and (max-width: 620px) {
  section.wrap {
    width: 90%;
    font-weight: bold;
  }
}

.float {
  display: flex;
  justify-content: center;
  align-items: center;
}

ul {
  text-align: left;
}

li {
  font-weight: bold;
  border-bottom-style: groove;
  width: fit-content;
  color: cornflowerblue;
  padding: 0.3rem 0;
}
</style>