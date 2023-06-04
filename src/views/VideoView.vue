<script setup>
</script>

<template>
  <article class="my-hobby-video">
    <header class="play-video-space">
      <div class="title-my-hobby-wrap">
        <h1 class="title-my-hobby">MY HOBBY</h1>
      </div>
      <div class="video-area">
        <video id="video" poster="" webkit-playsinline playsinline muted autoplay loop>
          <source src="/video/my.web.mp4" type="video/mp4" />
        </video>
      </div>
    </header>
    <section class="contents-text-wrap">
      <div class="first-point-bg">
        <h1>PROFESSIONAL</h1>
      </div>
    </section>
  </article>
</template>

<style lang="scss" scoped>
.my-hobby-video {
  // background-color: $black;
  color: $white;
  height: 100vh;
  height: 100dvh;

  .play-video-space {
    position: relative;
    height: 100vh;

    #video {
      /*天地中央配置*/
      position: absolute;
      z-index: 100;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      /*縦横幅指定*/
      width: 177.77777778vh;
      /* 16:9 の幅→16 ÷ 9＝ 177.77% */
      height: 56.25vw;
      /* 16:9の幅 → 9 ÷ 16 = 56.25% */
      min-height: 100%;
      min-width: 100%;
    }

    .video-area {
      position: fixed;
      z-index: 100;
      /*最背面に設定*/
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      overflow: hidden;
    }

    .title-my-hobby-wrap {
      /*要素の配置*/
      position: absolute;
      /*要素を天地中央寄せ*/
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      /*見た目の調整*/
      color: #fff;
      text-shadow: 0 0 15px #666;
      z-index: 101;

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
    z-index: 101;

    .first-point-bg {
      height: 20rem;
      background-color: $my-hobby-theme-color;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 10vw));
      color: $white;
    }
  }
}
</style>