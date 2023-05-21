<script setup>
</script>

<template>
  <article class="my-hobby-video">
    <div class="play-video-space">
      <video id="video" poster="" webkit-playsinline playsinline muted autoplay loop>
        <source src="/video/my.web.mp4" type="video/mp4" />
      </video>
      <div class="title-my-hobby-wrap">
        <h1 class="title-my-hobby">MY HOBBY</h1>
      </div>
    </div>
    <div class="contents-text-wrap">
      <p>コンテンツ</p>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.my-hobby-video {
  background-color: $my-hobby-theme-color;
  color: $white;
  height: 100vh;
  height: 100dvh;

  .play-video-space {
    position: relative;

    #video {
      width: 100vw;
    }

    .title-my-hobby-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      width: 100%;

      .title-my-hobby {
        font-size: 5rem;

        @media screen and (max-width: 500px) {
          font-size: 2rem;
        }
      }
    }
  }

  .contents-text-wrap {
    position: relative;
    z-index: 99;
    background-color: $my-hobby-theme-color;
  }
}
</style>