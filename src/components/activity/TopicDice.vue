<script setup>
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import topics from "../../assets/basic/List/activity/topic"

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
  return stopFlg.value ? "止める" : "サイコロを投げる";
})

const topicList = computed(() => {
  return topics.topics;
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
    <section>
      <h1>☕使い方</h1>
      <ol>
        <li>"サイコロを投げる"を押す。</li>
        <li>サイコロが回り始める。</li>
        <li>自分のタイミングで"ストップする"を押す。</li>
        <li>その話題について話す。</li>
      </ol>
    </section>
    <section>
      <div>
        <button id="btn-dice" @click="onClick">{{ btnMessage }}</button>
      </div>
      <h2>TOPIC:</h2>
      <h3>「{{ topicList[topicIndex].title }}」</h3>
      <img :src="dices[diceIndex]" />
    </section>
    <section>
      <div>
        <ul>
          <li v-for="(list, i) of topicList" :key="i">{{ list.id }}:{{ list.title }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
img {
  width: 10rem;
}

.activity-contents-wrap {
  margin-bottom: 5rem;
}
</style>