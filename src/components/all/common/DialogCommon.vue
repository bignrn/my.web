<script setup>
import { defineProps, watch, toRefs, onUnmounted } from 'vue';

const body = document.querySelector("body");

const props = defineProps({
  displayStatus: {
    type: Boolean,
    default: false,
  },
});
const { displayStatus } = toRefs(props);

watch(displayStatus, () => {
  if (displayStatus.value) body.setAttribute('style','overflow: hidden');
  else body.setAttribute('style','overflow: auto');
}, {immediate: true});

onUnmounted(() => {
  body.setAttribute('style','overflow: auto');
})
</script>
<template>
  <div v-if="displayStatus" class="dialog-common-wrap">
    <a class="bg-cover"></a>
    <div class="inner-wrap">
      <div class="contents">
        <slot name="dialog-main">ダイアログです。</slot>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.dialog-common-wrap {
  position: fixed;
  top: 0;
  left: 0;
  .bg-cover {
    position: absolute;
    display: block;
    width: 100dvw;
    height: 100dvh;
    background-color: rgba($black, 0.6);
  }
  .inner-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    margin: auto 1rem;
    .contents {
      max-width: 40rem;
      max-height: 50rem;
      width: 100%;
      height: 100%;
      margin: auto;
      background-color: $white;
      overflow: hidden, scroll;
      border-radius: 1.6rem;
    }
  }
}
</style>