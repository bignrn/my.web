<script setup>
import { computed } from "@vue/reactivity";
import ButtonCommon from "../all/common/ButtonCommon.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useDiceTopicStore } from "../../stores/DiceTopic";

const diceTopicStore = useDiceTopicStore();
const { topics } = storeToRefs(diceTopicStore);

const dices = ref([
  require("../../assets/activity/dices/dice-1.png"),
  require("../../assets/activity/dices/dice-2.png"),
  require("../../assets/activity/dices/dice-3.png"),
  require("../../assets/activity/dices/dice-4.png"),
  require("../../assets/activity/dices/dice-5.png"),
  require("../../assets/activity/dices/dice-6.png"),
  require("../../assets/activity/dices/dice-black-1.png"),
  require("../../assets/activity/dices/dice-black-2.png"),
  require("../../assets/activity/dices/dice-black-3.png"),
  require("../../assets/activity/dices/dice-black-4.png"),
  require("../../assets/activity/dices/dice-black-5.png"),
  require("../../assets/activity/dices/dice-black-6.png"),
]);
const diceIndex = ref(0);
const topicIndex = ref(0);
const stopFlg = ref(false);
const maxCount = 300;
let count = 0;

const btnMessage = computed(() => {
  return stopFlg.value ? "ストップする" : "サイコロを投げる";
})

const topicList = computed(() => {
  return topics.value;
})

function onClick() {
  stopFlg.value = !stopFlg.value;
  if (stopFlg.value) {
    animation();
  } else {
    shakeDice();
  }
}

function shakeDice() {
  diceIndex.value = Math.floor(Math.random() * dices.value.length);
  topicIndex.value = Math.floor(Math.random() * topicList.value.length);
}

function animation() {
  shakeDice();
  if (stopFlg.value && count < maxCount) {
    count++;
    setTimeout(animation, 50);
  } else {
    count = 0;
    stopFlg.value = false;
  }
}
</script>

<template>
  <div class="activity-contents-wrap">
    <h1>サイコロ<span>TOPIC</span></h1>
    <p>ルール：サイコロで出た話題について話してみよう！</p>
    <section class="activity-list-wrap">
      <h1>☕やり方</h1>
      <div class="list-wrap">
        <ol>
          <li><kbd>"サイコロを投げる"</kbd>を押す。</li>
          <li>サイコロが回り始める。</li>
          <li>自分のタイミングで<kbd>"ストップする"</kbd>を押す。</li>
          <li>その話題について話す。</li>
        </ol>
      </div>
    </section>
    <section>
      <div>
        <ButtonCommon @click="onClick" width="12rem" height="2rem">{{ btnMessage }}</ButtonCommon>
      </div>
      <h2>TOPIC:</h2>
      <h3>「{{ topicList[topicIndex].title }}」</h3>
      <img :src="dices[diceIndex]" />
    </section>
    <section class="activity-list-wrap">
      <h1>登録されているリスト</h1>
      <div class="list-wrap">
        <ul>
          <li v-for="(list, i) of topicList" :key="i">{{ list.id }}:{{ list.title }}</li>
        </ul>
      </div>
    </section>
    <p>※開発予定ですがトピックリストを追加出来る様にします。</p>
  </div>
</template>

<style scoped>
img {
  width: 10rem;
}

.activity-list-wrap {
  margin: 0.5rem;
}

.activity-list-wrap h1 {
  margin: 0;
  padding-top: 1rem;
}

.list-wrap {
  display: flex;
  justify-content: center;
}

.list-wrap h1 {
  width: 6rem;
}

ol {
  text-align: left;
  font-weight: bold;
  width: fit-content;
  padding: 0.3rem 2rem;
  border: 0.1rem solid black;
}

ul {
  text-align: left;
  font-weight: bold;
  width: fit-content;
  padding: 0.3rem;
  list-style-type: none;
  border: 0.1rem solid black;
}
</style>