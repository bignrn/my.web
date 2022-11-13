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
      <p>システム開発で笑顔を増やせたらと考えています。</p>
    </div>
    <div class="prof-basic-histories-wrap">
      <h1>取得資格</h1>
      <ul>
        <li v-for="(list, i) of historyList" :key="i">
          <img :src="list.img" alt="list-icon" class="history-img" />{{ list.title }}
        </li>
      </ul>
    </div>
    <hr />
    <nav class="prof-basic-nav-wrap">
      <h1>情報を発信</h1>
      <a href="https://github.com/bignrn" target="_blank">ソースコードはGitHubへ</a>
    </nav>
  </article>
</template>

<style scoped>
article {
  margin-bottom: 5rem;
}

.prof-basic-contents-wrap {
  padding: 2rem 0 5rem;
  background-color: orange;
  color: white;
}

.prof-basic-contents-wrap p {
  font-size: large;
  font-weight: bolder;
}

.prof-basic-my-avatar {
  border-radius: 50% 70%;
  width: 20rem;
  box-shadow: 0rem 0.5rem 0.8rem black;
}

.prof-basic-histories-wrap {
  padding: 0 1rem;
}

ul {
  display: inline-table;
  text-align: left;
  list-style-type: none;
  font-size: x-large;
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
  padding: 0;
}
</style>