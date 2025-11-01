<script setup>
import { onMounted, ref } from "vue";
import { generateAmidaSVG } from "@/util/createAmida";

const amidaDivRef = ref(null);
onMounted(() => {
  amidaDivRef.value.innerHTML = generateAmidaSVG(["ゆま", "たろう", "はなこ"], "35000");
})
</script>

<template>
  <section class="money-amida-root">
    <div ref="amidaDivRef"></div>
  </section>
</template>

<style lang="scss" scoped>
.money-amida-root {
  margin-top: calc($header-height + 2rem);
}
</style>