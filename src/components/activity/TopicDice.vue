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
    <section class="activity-register-list-wrap">
      <h1>登録されているリスト</h1>
      <div class="list-wrap">
        <ul>
          <li v-for="(list, i) of topicList" :key="i" class="registered-list">
            <div>
              {{ list.id }}:{{ list.title }}
            </div>
            <button class="edit-btn">編集</button>
          </li>
          <li class="registered-list">
            <button class="list-add-btn-wrap">
              <img src="/image/activity/diceTopic/icons8-add-64.png">
              <p>項目を追加する</p>
            </button>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.activity-contents-wrap {
  img {
    width: 10rem;
  }

  .activity-register-list-wrap {
    background-color: $theme-bg-color;
    margin-top: 4rem;
  }

  .activity-list-wrap,
  .activity-register-list-wrap {
    h1 {
      margin: 0;
      padding-top: 1rem;
    }

    .list-wrap {
      display: flex;
      justify-content: center;

      h1 {
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
      }

      button {
        background: none;
        border: none;
      }

      .registered-list {
        display: flex;
        margin: 0.4rem 0;
        align-items: center;

        .edit-btn {
          color: $secondary-text-color;
          margin: 0 0 0 auto;
          padding-left: 2rem;
          justify-items: end;
          cursor: pointer;
        }

        .list-add-btn-wrap {
          display: flex;
          align-items: center;
          padding: 0;
          cursor: pointer;

          img {
            width: 2rem;
            height: 2rem;
            align-items: center;
          }

          p {
            color: $text-black;
            font-size: 1rem;
            font-weight: 600;
            line-height: 1rem;
          }
        }
      }
    }
  }
}
</style>