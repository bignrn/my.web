<script setup>
import lv1 from "../assets/profile/lv1.gif";
import normal from "../assets/all/icon-list-book.png";
const historyList = [
  { img: lv1, title: "HTML5プロフェッショナル試験Lv1" },
  { img: normal, title: "基本情報技術者試験" },
  { img: normal, title: "JAVA BRONZE SE" }
]
</script>

<template>
  <article>
    <div class="prof-basic-contents-wrap">
      <img src="../assets/profile/myAvatar.jpg" class="prof-basic-my-avatar" />
      <h1>Yuma Mishima</h1>
      <p>システム開発で笑顔を<br />増やせたらと考えています。</p>
    </div>
    <div class="prof-basic-histories-wrap">
      <h1>取得した資格</h1>
      <ul>
        <li v-for="(list, i) of historyList" :key="i">
          <img :src="list.img" alt="list-icon" class="history-img" />{{ list.title }}
        </li>
      </ul>
    </div>
    <div class="prof-basic-histories-wrap gradient">
      <h1>技術者を目指した切っ掛け</h1>
      <img src="../assets/profile/undraw_back_in_the_day_knsh.svg" class="img-class" />
      <p>"ゲーム"が切っ掛けでプログラミングを知りました。</p>
      <p>そこから"疑問の答えを求めて"<br />気が付くとSEになっていました。</p>
    </div>
    <div class="prof-basic-histories-wrap gradient-reverse">
      <img src="../assets/profile/undraw_programmer_re_owql.svg" class="img-class" />
    </div>
    <div class="prof-basic-histories-wrap wrap-hobby">
      <h1>趣味</h1>
      <img src="../assets/profile/tp-icon.jpg" class="tp-icon-img" />
      <h2>トランペット🎺</h2>
      <p>学生時代にソロコンテスト県2位を取る事が出来ました。</p>
      <p>現在は母校である小学校のバンドで<br />指導をさせて貰っています。</p>
      <p>子供たちの成長を実感します。</p>
      <img src="../assets/profile/tp-bg-img.jpg" class="tp-img" />
    </div>
    <nav class="prof-basic-nav-wrap">
      <h1>情報を発信</h1>
      <a href="https://github.com/bignrn" target="_blank">ソースコードはGitHubへ</a>
    </nav>
  </article>
</template>

<style scoped>
article {
  /* width: fit-content; */
  margin-top: 3rem;
  margin-bottom: 7rem;
}

.prof-basic-contents-wrap {
  padding: 2rem 0;
  background-color: orange;
  color: white;
}

.prof-basic-contents-wrap p {
  font-size: large;
  font-weight: bolder;
  padding: 0 0.5rem;
}

.prof-basic-my-avatar {
  border-radius: 50% 70%;
  width: 20rem;
  box-shadow: 0rem 0.5rem 0.8rem black;
}

.prof-basic-histories-wrap {
  margin-top: 2rem;
  padding: 0 1rem;
}

ul {
  display: inline-table;
  text-align: left;
  list-style-type: none;
  font-size: large;
  font-weight: bold;
}

li {
  display: flex;
  align-items: center;
  align-content: center;
}

.history-img {
  width: 4rem;
}

hr {
  width: 90%;
}

.prof-basic-nav-wrap {
  background-color: white;
  padding: 1.5rem 0;
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
}

.tp-icon-img {
  width: 7rem;
  border-radius: 50%;
}

.tp-img {
  width: 25.9rem;
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
</style>