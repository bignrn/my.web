<script setup>
import { computed } from "@vue/reactivity";
import { ref } from "vue"

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
const stopFlg = ref(false);
const maxCount = 300;
let count = 0;

const btnMessage = computed(() => {
  return stopFlg.value ? "止める" : "サイコロを投げる";
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
  <div>
    <h1><span>TOPIC</span>サイコロ</h1>
    <p>ルール：サイコロで出た話題について話してみよう！</p>
    <div>
      <h1>☕使い方</h1>
      <ol>
        <li>"サイコロを投げる"を押す。</li>
        <li>サイコロが回り始める。</li>
        <li>自分のタイミングで"ストップする"を押す。</li>
        <li>その話題について話す。</li>
      </ol>
    </div>
    <div>
      <button id="btn-dice" @click="onClick">{{ btnMessage }}</button>
    </div>
    <h2>TOPIC: あなたの好きな食べ物は？</h2>
    <img :src="dices[diceIndex]" />
  </div>
</template>

<style scoped>
img {
  width: 10rem;
}
</style>