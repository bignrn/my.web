<script setup>
import { defineProps } from 'vue';

defineProps({
  width: String,
  height: String,
  classType: {
    type: String,
    default: "type-a",
  },
})
</script>

<template>
  <button class="common-button-wrap" :style="`width: ${width}; height: ${height};`" :class="[classType]">
    <span class="button-text">
      <slot />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.common-button-wrap {
  border: $button-bg solid 0.1rem;
  font-size: 1.6rem;
  font-weight: bold;
  color: $black;
  padding: 0.3rem 1rem;
  border-radius: 1.6rem;
  box-shadow: 0rem 0.1rem 0.1em $black;
  box-sizing: content-box;
  cursor: pointer;

  &.type-a {
    background-color: $button-bg;
  }

  &.type-b {
    background-color: $white;
  }

  &:active {
    cursor: pointer;
    background-color: $button-active-color;
    border-color: $button-active-color;
    box-shadow: 0rem 0rem 0.1em $black;
  }
}
</style>