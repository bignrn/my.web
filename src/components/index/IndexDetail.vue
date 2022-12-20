<script setup>
import { defineProps } from "vue"
import normal from "@/assets/index/undraw_upgrade_re_gano.svg";
defineProps({
  title: String,
  detail: String,
  imgUrl: String,
  to: String,
})
</script>

<template>
  <component :is="!to ? 'div' : 'router-link'" :to="'/my.web' + to">
    <section class="wrap-detail">
      <div class="img-index-wrap">
        <img :src="imgUrl ? '/image/detail/' + imgUrl : normal" class="img-index" />
      </div>
      <div class="wrap-detail-members">
        <h1>{{ title }}</h1>
        <pre class="detail-messages">
        {{ detail }}
      </pre>
      </div>
    </section>
  </component>
</template>

<style scoped>
a {
  color: black;
  text-decoration: none;
}

a:hover {
  color: orange;
}

.wrap-detail {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}

.wrap-detail-members {
  min-width: 230px;
  text-align: left;
  padding-left: 1rem;
}

.img-index-wrap {
  max-height: 10rem;
  overflow: hidden;
  background-color: ivory;
}

.img-index {
  width: 15rem;
}

.detail-messages {
  max-width: 14rem;
  word-break: break-word;
  white-space: pre-line;
}
</style>