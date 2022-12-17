<script setup>
import InfoList from '@/components/index/InfoList.vue';
import IndexDetail from '@/components/index/IndexDetail.vue';
import updateList from "../assets/basic/List/information/update";
import contents from "../assets/basic/List/information/contents";

</script>

<template>
  <article>
    <div class="index-wrap">
      <h1>Thank you for watch!</h1>
      <InfoList :updateLists="updateList.updateList" />
      <h1>Contents</h1>
      <div class="wrap-detail-list">
        <IndexDetail v-for="(item, i) in contents.infoList" :to="item.target" :title="item.title" :detail="item.message"
          :imgUrl="item.pictureUrl" :key="i" />
      </div>
      <p class="add-contents-text">※まだまだ増やします。</p>
    </div>
  </article>
</template>

<style scoped>
article {
  margin: 5rem auto;
  padding-bottom: 5rem;
}

.index-wrap {
  margin: 0 10%;
}

.index-wrap h1 {
  margin-top: 5rem;
}

.wrap-detail-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-content: space-around;
  gap: 1rem;
  margin: 1rem;
  padding: 1rem;
  background-color: cornsilk;
  border: 0.1rem solid black;
  border-radius: 2rem;
}

.add-contents-text {
  text-align: right;
}
</style>