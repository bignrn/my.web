<script setup>
import { defineProps } from "vue"
defineProps({
  title: String,
  detail: String,
  imgUrl: {
    type: String,
    default: "@/assets/index/undraw_upgrade_re_gano.svg",
  },
})
</script>

<template>
  <section class="wrap-detail">
    <img src="@/assets/index/undraw_upgrade_re_gano.svg" class="img-index" />
    <div class="wrap-detail-members">
      <div>{{ title }}</div>
      <pre class="detail-messages">
        {{ detail }}
      </pre>
    </div>
  </section>
</template>

<style scoped>
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

.img-index {
  width: 15rem;
  background-color: cadetblue;
}

.detail-messages {
  max-width: 14rem;
  word-break: break-word;
  white-space: pre-line;
}
</style>