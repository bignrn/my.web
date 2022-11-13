<script setup>
import InfoList from '@/components/index/InfoList.vue';
import IndexDetail from '@/components/index/IndexDetail.vue';
import updateList from "../assets/basic/List/information/update";
import contents from "../assets/basic/List/information/contents";

</script>

<template>
  <article>
    <h1>ご覧いただきありがとうございます!</h1>
    <InfoList :updateLists="updateList.updateList" />
    <h1>コンテンツ</h1>
    <div class="wrap-detail-list">
      <IndexDetail v-for="(item, i) in contents.infoList" :to="item.target" :title="item.title" :detail="item.message"
        :imgUrl="item.pictureUrl" :key="i" />
    </div>
  </article>
</template>

<style scoped>
article {
  margin: 5rem auto;
  padding-bottom: 5rem;
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
  background-color: aliceblue;
  border-radius: 2rem;
}
</style>