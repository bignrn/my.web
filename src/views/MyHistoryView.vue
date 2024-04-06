<script setup>
const lv1 = "images/profile/lv1.svg";
const lv2 = "images/profile/lv2.svg";
const ipa = "images/profile/ipa.svg";
const oracle = "images/profile/oracle.svg";
const historyList = [
  { img: lv2, title: "HTML5\nプロフェッショナル試験Lv2", period: "2024.03.30▶2029.03.30" },
  { img: lv1, title: "HTML5\nプロフェッショナル試験Lv1", period: "2024.03.30▶2029.03.30" },
  { img: ipa, title: "基本情報技術者試験" },
  { img: oracle, title: "JAVA BRONZE SE" }
]
</script>

<template>
  <article class="portfolio-wrap">
    <div class="prof-basic-contents-wrap">
      <img src="/images/profile/myAvatar.jpg" class="my-avatar-img" />
      <h1 class="my-name">Mishima Yuma</h1>
      <div class="my-purpose-title">
        <p>開発の楽しさを求めて。</p>
        <p>楽しい明日をつくる。</p>
        <p>開発のプロフェッショナル。</p>
      </div>
    </div>
    <div class="prof-basic-histories-wrap">
      <h2 class="contents-title">取得した資格</h2>
      <ul class="ul-my-qualification">
        <li v-for="(list, i) of historyList" :key="i">
          <div class="inner-wrap">
            <img :src="list.img" alt="list-icon" class="history-img" />
            <div class="title">{{ list.title }}</div>
            <div class="period">{{ list?.period }}</div>
          </div>
        </li>
      </ul>
      <div class="gradient-wrap">
        <h2 class="contents-title">技術者を<br />目指した切っ掛け</h2>
        <div class="gradient">
          <img src="images/profile/undraw_back_in_the_day_knsh.svg" class="img-class" />
          <p>ゲームを切っ掛けに<br>プログラミングに興味を持ちました。</p>
          <p>そこからプログラミングを勉強。<br />IT業界を知りました。</p>
          <p>私もSYSTEMを通じて、<br />
            人の手助けが出来る仕事をしたい！<br />
            と強く思いこの業界に入りました。
          </p>
        </div>
        <div class="gradient-reverse">
          <img src="images/profile/undraw_programmer_re_owql.svg" class="img-class" />
        </div>
      </div>
      <h2 class="contents-title hobby">趣味</h2>
      <div class="hobby-wrap">
        <img src="images/profile/tp-icon.jpg" class="tp-icon-img" />
        <h3>トランペット🎺</h3>
        <p>
          小学4年生から続けたトランペット。<br />
          高校卒業頃には、<br />
          県ソロコン大会で2位を獲得。
        </p>
        <p>
          時折、母校にトランペットを<br />
          教えに行っています。
        </p>
        <p>
          少しでも若い世代に、<br />
          トランペットの師匠の思いが、<br />
          届けられたらと願っています。
        </p>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.portfolio-wrap {

  .contents-title {
    font-size: 2rem;
    margin: 1rem 0 3.5rem;
    white-space: break-spaces;

    &.hobby {
      padding: 5rem;
      margin: 0;
      background-color: $prof-theme-bg-color;
    }
  }

  // 名刺
  .prof-basic-contents-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: $white;
    height: 100vh;
    height: 100dvh;
    background-color: $prof-theme-color;
    margin-bottom: 8.6rem;

    .my-avatar-img {
      margin-top: 4rem;
      border-radius: 50% 70%;
      max-width: 28rem;
      width: 100%;
      margin-bottom: 2rem;
      box-shadow: 0rem 0.5rem 0.8rem black;
    }

    .my-name {
      font-family: "LilitaOne-Regular";
      font-size: 3.6rem;
      margin: 1rem 0;
      margin-bottom: 1rem;
    }

    .my-purpose-title {
      display: flex;
      flex-direction: column;
      font-size: 1.6rem;
      font-weight: 200;
      text-align: start;
      width: fit-content;
      margin: 0 auto;

      p {
        font-size: 1.6rem;
        font-weight: 600;
      }
    }
  }

  .prof-basic-histories-wrap {
    margin-top: 2rem;

    .ul-my-qualification {
      display: flex;
      flex-direction: column;
      gap: 4.6rem;
      align-items: center;
      text-align: left;
      list-style-type: none;
      font-weight: 600;
      padding: 0;
      margin-bottom: 20.5rem;

      li {
        display: flex;
        align-items: center;
        align-content: center;

        .inner-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;

          .history-img {
            max-width: 7.9rem;
            width: 100%;
            max-height: 8.4rem;
            height: 100%;
            margin-bottom: 1rem;
          }

          .title {
            font-size: 1.6rem;
            margin-bottom: 0.4rem;
            text-align: center;
            white-space: break-spaces;
          }

          .period {
            font-size: 1.2rem;
            color: $text-tertiary;
          }
        }
      }
    }

    .gradient-wrap {
      margin-bottom: 20.5rem;

      .img-class {
        max-width: 27.8rem;
        width: 100%;
        margin-bottom: 6.8rem;
      }

      .gradient {
        background: linear-gradient($white, #ffe227);
        padding-bottom: 1rem;

        p {
          font-size: 1.6rem;
          margin-bottom: 3.8rem;
          line-height: 2.1rem;
        }
      }

      .gradient-reverse {
        margin: 0;
        padding: 4rem 0;
        background: linear-gradient(#ffe227, $white);
      }
    }

    .hobby-wrap {
      padding-bottom: 5rem;
      color: $black;
      background-color: $prof-theme-bg-color;

      h3 {
        font-size: 2rem;
      }

      p {
        font-size: 1.6rem;
        line-height: 2.3rem;
        margin-bottom: 2rem;
      }

      .tp-icon-img {
        max-width: 6.7rem;
        width: 100%;
        border-radius: 50%;
      }
    }
  }

  nav {
    &.prof-basic-nav-wrap {
      background-color: $white;
      padding: 1.5rem 0;
    }
  }
}
</style>