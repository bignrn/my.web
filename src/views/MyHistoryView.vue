<script setup>
const lv1 = "images/profile/lv1.svg";
const lv2 = "images/profile/lv2.svg";
const ipa = "images/profile/ipa.svg";
const oracle = "images/profile/oracle.svg";
const historyList = [
  { img: oracle, title: "JAVA BRONZE SE", year: 2021 },
  { img: ipa, title: "基本情報技術者試験", year: 2022 },
  { img: lv1, title: "HTML5\nプロフェッショナル試験Lv1", period: "2024.03.30 > 2029.03.30", year: 2023 },
  { img: lv2, title: "HTML5\nプロフェッショナル試験Lv2", period: "2024.03.30 > 2029.03.30", year: 2024 },
];
const books = [
  "images/profile/readAbleCode.png",
  "images/profile/TheMostUnderstandableOrderOfExplanation.png",
  "images/profile/holeOfThought.png",
  "images/profile/TheTeamEvolvesNaturally.png",
  "images/profile/designSystem.png",
  "images/profile/objectOriented UI.png",
];
</script>

<template>
  <div class="portfolio-wrap">
    <section class="introduction-me">
      <span class="cover white"></span>
      <span class="cover orange"></span>
      <div class="z-index-top">
        <img src="images/profile/Mishima_Yuma.svg" alt="Mishima Yuma" class="name" />
        <img src="images/profile/myAvatar_clip.png" alt="yuma" class="me" />
        <div class="poem">
          <p>開発は楽しく。誠実に。</p>
          <p>誰もが使えるシステムをめざす。</p>
          <p>開発のプロフェッショナル。</p>
        </div>
      </div>
    </section>
    <section class="my-capabilities">
      <span class="orange half-circle"></span>
      <span class="orange pillar"></span>
      <ul class="capabilities-wrap">
        <li v-for="value in historyList" :key="value">
          <p class="year">{{ value.year }}</p>
          <img :src="value.img" alt="capability-img" class="photo" />
          <p class="title">{{ value.title }}</p>
          <p v-if="value?.period" class="period">{{ value?.period }}</p>
        </li>
      </ul>
    </section>
    <section class="recommend-books">
      <h2>読んだ本</h2>
      <div class="top-2-wrap books">
        <div class="book large">
          <img src="images/profile/7Habits.jpg" alt="book" class="book-img" />
          <div class="text-wrap">
            <h3 class="title">7つの習慣</h3>
            <p class="description">
              生活・仕事・生き方について、考える道標の様な本です。<br/>
              人によっては聖書と呼ばれています。
            </p>
          </div>
        </div>
        <div class="book large">
          <img src="images/profile/YourStrengthsYouDontKnow.png" alt="book" class="book-img" />
          <div class="text-wrap">
            <h3 class="title">あなたの知らない<br/>あなたの強み</h3>
            <p class="description">
              三島が自己啓発本に興味を持つ切っ掛けになった最初の本です。
            </p>
          </div>
        </div>
      </div>
      <div class="some-wrap">
        <ul class="books">
          <li v-for="b in books" :key="b" class="book">
            <img :src="b" alt="book" class="book-img" />
          </li>
        </ul>
      </div>
    </section>
    <section class="my-skill-tree"></section>
  </div>
</template>

<style lang="scss" scoped>
.portfolio-wrap {
  section {
    height: 100vh;
    &.introduction-me {
      position: relative;
      background-image: url("/public/images/profile/bike.png");
      background-repeat: no-repeat;
      object-fit: cover;
      background-size: cover;
      background-position: center;  /* 中央に配置 */
      background-attachment: fixed; /* スクロールしても固定（任意） */
      .cover {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 900;
        display: block;
        width: 100%;
        height: 100vh;
        &.white {
          background-color: rgba($white, 0.52);
        }
        &.orange {
          clip-path: polygon(75% 0, 100% 0, 100% 100%, 20% 100%); // 左上、右上、右下、左下
          background-color: rgba($theme-color, 0.8);
        }
      }
      .z-index-top {
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: auto;
        img.name {
          width: 20%;
        }
        img.me {
          width: 40%;
        }
        .poem {
          >p {
            margin-bottom: 1.3rem;
            font-size: 2rem;
            font-weight: 900;
            line-height: 2rem;
            text-align: start;
            color: $white;
          }
        }
      }
    }
    &.my-capabilities {
      position: relative;
      .orange {
        background-color: $theme-color;
      }
      .half-circle {
        position: absolute;
        top: 0;
        transform: translateX(-50%);
        width: 12rem;
        height: 6rem;
        border-radius: 50% / 0 0 100% 100%;
      }
      .pillar {
        position: absolute;
        transform: translateX(-50%);
        width: 3rem;
        height: 100vh;
      }
      .capabilities-wrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        align-content: center;
        width: fit-content;
        margin: auto;
        li {
          transform: translateX(100%);
          margin-bottom: 5rem;
          font-size: 2rem;
          &:nth-child(2n) {
            transform: translateX(-100%);
          }
          .year {
            font-size: 3.2rem;
            color: $theme-color;
          }
          .photo {
            margin: 1rem auto;
          }
          .title {
            font-size: 2rem;
          }
          .period {
            font-size: 1.6rem;
            color: $text-secondary;
          }
        }
      }
    }
    &.recommend-books {
      align-content: center;
      background-color: rgba($theme-color, 0.8);
      > h2 {
        margin: 0;
        margin-bottom: 2rem;
        font-size: 4.8rem;
      }
      .books {
        display: grid;
        grid-template-columns: repeat(4, 1fr); /* ← 4カラム */
        gap: 5.5rem;
        justify-content: center;
        justify-items: center;
        margin: auto 5rem;
        .book {
          width: fit-content;
          padding: 2rem;
          background-color: $white;
          border-radius: 1.6rem;
          &.large {
            display: flex;
            width: 56rem;
            text-align: start;
            .text-wrap {
              margin-left: 3.5rem;
              .title {
                font-size: 2.4rem;
              }
              .description {
                font-size: 1.6rem;
              }
            }
          }
        }
      }
      .top-2-wrap {
        display: flex;
        justify-content: center;
        gap: 10.7rem;
        width: 100%;
        padding: 0 2rem;
        margin: 0;
        margin-bottom: 3.4rem;
        box-sizing: border-box;
        .book-img {
          width: 18.2rem;
        }
      }
      .some-wrap {
        .book-img {
          width: 14.9rem;
        }
      }
    }
  }
}
</style>