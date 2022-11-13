<script setup>
import { defineProps } from 'vue';

defineProps({
  width: String,
  height: String,
})
</script>

<template>
  <button :style="`width: ${width}; height: ${height};`">
    <span class="button-text">
      <slot />
    </span>
  </button>
</template>

<style scoped>
button {
  border: none;
  font-size: larger;
  font-weight: bold;
  color: black;
  padding: 0.3rem 1rem;
  background-color: rgb(255, 206, 114);
  border-radius: 1rem;
  box-shadow: 0rem 0.1rem 0.1em black;
}

button:hover {
  cursor: pointer;
  background-color: rgb(169, 135, 73);
  box-shadow: 0rem 0rem 0.1em black;
}
</style>