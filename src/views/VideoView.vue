<script setup>
</script>

<template>
  <div class="my-hobby-video">
    <div class="video-area">
      <video id="video" poster="" webkit-playsinline playsinline muted autoplay loop>
        <source src="/video/my.web.mp4" type="video/mp4" />
      </video>
    </div>
    <section class="contents-charm-wrap">
      <div class="topic-first">
        <div class="text-wrap">
          <h1 class="text">動画編集の魅力<br />現代の若者に響く"ものづくり"</h1>
          <p class="text">
            今日、動画クリエイターは増え続けている。<br />
            TVの中だけでなく、動画投稿サイトやブログサイトなど、<br />
            幅広い場所で、役に立てる業種である。<br />
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.my-hobby-video {
  position: relative;
  background-color: $my-hobby-theme-color;
  color: $white;
  height: calc(100vh - $header-height - $footer-height);
  height: calc(100dvh - $header-height - $footer-height);
  overflow: hidden;

  .video-area {
    position: relative;
    width: 100vw;
    height: calc(100dvh - $header-height);
    overflow: hidden;

    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(100dvh - $header-height);
      max-height: 700px;
      object-fit: cover;
    }
  }

  section {
    padding-bottom: $footer-height;

    &.contents-charm-wrap {
      position: absolute;
      top: 43rem;
      width: 100%;
      background-color: $my-hobby-theme-color;

      .text {
        text-align: left;
      }

      h1 {
        font-size: 3.2rem;
        font-weight: 700;
        line-height: 5rem;
      }

      p {
        font-size: 20px;
        font-weight: 400;
        letter-spacing: 1rem;
      }

      .topic-first {
        display: flex;
        margin: 0 auto;
        justify-content: center;

        .text-wrap {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }

}
</style>