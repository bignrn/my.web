<script setup>
const lv1 = "images/profile/lv1.gif";
const normal = "images/all/icon-list-book.png";
const historyList = [
  { img: lv1, title: "HTML5プロフェッショナル試験Lv1" },
  { img: normal, title: "基本情報技術者試験" },
  { img: normal, title: "JAVA BRONZE SE" }
]
</script>

<template>
  <article class="portfolio-wrap">
    <div class="prof-basic-contents-wrap">
      <img src="/images/profile/myAvatar.jpg" class="prof-basic-my-avatar" />
      <h1 class="my-name-title">Yuma Mishima</h1>
      <p class="my-sub-title">システム開発で笑顔を<br />増やす事が目標！</p>
    </div>
    <div class="prof-basic-histories-wrap">
      <h1 class="contents-title">取得した資格</h1>
      <ul>
        <li v-for="(list, i) of historyList" :key="i">
          <img :src="list.img" alt="list-icon" class="history-img" />{{ list.title }}
        </li>
      </ul>
      <div class="gradient">
        <h1 class="contents-title">技術者を目指した切っ掛け</h1>
        <img src="images/profile/undraw_back_in_the_day_knsh.svg" class="img-class" />
        <p>"ゲーム"が切っ掛けで<br />プログラミングを知りました。</p>
        <p>そこから"疑問の答えを求めて"<br />気が付くとSEになっていました。</p>
      </div>
      <div class="gradient-reverse">
        <img src="images/profile/undraw_programmer_re_owql.svg" class="img-class" />
      </div>
      <div class="wrap-hobby">
        <h1 class="contents-title">趣味</h1>
        <img src="images/profile/tp-icon.jpg" class="tp-icon-img" />
        <h2>トランペット🎺</h2>
        <p>学生時代にソロコンテスト県2位を<br />取る事が出来ました。</p>
        <p>現在は母校である小学校のクラブで<br />Tpの指導をさせて貰っています。</p>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
@mixin initP {
  p {
    font-weight: bolder;
    padding: 0 0.5rem;
  }
}

.portfolio-wrap {

  .contents-title {
    font-size: 1.5rem;
    margin: 1rem 0;
  }

  .prof-basic-contents-wrap {
    padding: 4rem 0;
    background-color: orange;
    color: white;

    @include initP;

    .prof-basic-my-avatar {
      border-radius: 50% 70%;
      width: 20rem;
      box-shadow: 0rem 0.5rem 0.8rem black;
    }

    .my-name-title {
      font-size: 2.5rem;
      margin: 1rem 0;
    }

    .my-sub-title {
      font-size: 1.3rem;
    }
  }

  .prof-basic-histories-wrap {
    margin-top: 2rem;

    @include initP;


    ul {
      display: inline-table;
      text-align: left;
      list-style-type: none;
      font-weight: 600;
      padding: 0;

      li {
        display: flex;
        align-items: center;
        align-content: center;

        .history-img {
          width: 4rem;
        }
      }
    }

    .img-class {
      width: 17rem;
    }

    .gradient {
      background: linear-gradient(white, #ffe227);
      padding-bottom: 1rem;
    }

    .gradient-reverse {
      margin: 0;
      padding: 4rem 0;
      background: linear-gradient(#ffe227, white);
    }

    .wrap-hobby {
      margin-top: 1rem;
      margin-bottom: 5rem;
      color: black;

      .tp-icon-img {
        width: 7rem;
        border-radius: 50%;
      }

      .tp-img {
        width: 24.4rem;
        position: absolute;
        top: 106rem;
        left: 0rem;
        z-index: -1;
        opacity: 0.45;
      }

      @media screen and (min-width: 430px) {
        .tp-img {
          display: none;
        }
      }
    }
  }

  nav {
    &.prof-basic-nav-wrap {
      background-color: white;
      padding: 1.5rem 0;
    }
  }
}
</style>