<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const openStatus = ref(false);
const router = useRouter();
const route = useRoute();

const onClickOpen = () => {
  openStatus.value = !openStatus.value;
};

const isMyHobby = computed(() => {
  return route.path === router.resolve({ name: "VideoView" }).fullPath
});
</script>

<template>
  <footer class="common-footer" :class="{ 'isMyHobby': isMyHobby }">
    <address>
      <a href="https://github.com/bignrn" target="_blank">
        <img src="../../assets/all/address-github.svg" />
      </a>
    </address>

    <small>
      <a @click="onClickOpen">
        <p>下記より画像・OSSをお借りしています。▼※タッチで開きます。</p>
      </a>
      <div class="small-wrap" v-show="openStatus">
        <p>icon by <a target="_blank" href="https://icons8.com">Icons8</a>/</p>
        <p>illustration by <a target="_blank" href="https://undraw.co/illustrations">unDraw</a>/</p>
        <p>Favicon by <a target="_blank" href="http://flat-icon-design.com/">FLAT ICON</a></p>
      </div>
    </small>
  </footer>
</template>

<style lang="scss" scoped>
.common-footer {
  bottom: 0;
  font-family: "Sawarabi Mincho";
  font-weight: 600;
  width: 100%;
  padding-bottom: 0.5rem;
  background-color: $theme-color;

  &.isMyHobby {
    background-color: $my-hobby-primary-color;
    color: $white;
  }

  small {
    a {
      p {
        margin: 0;
        cursor: pointer;
      }
    }

    .small-wrap {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      flex-wrap: wrap-reverse;
    }
  }
}
</style>