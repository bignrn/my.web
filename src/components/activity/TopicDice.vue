<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useDiceTopicStore } from "../../stores/DiceTopic";
import ButtonCommon from "../all/common/ButtonCommon.vue";
import EditTopicItem from "./EditTopicItem.vue";

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
const isOpenEdit = ref("");
const maxCount = 300;
let count = 0;

// **** サイコロ処理 ****//
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

// **** リスト編集処理 ****//
const returnNextListLength = computed(() => {
  return `${topicList.value.length + 1}`;
})

const openEditBtn = (id) => {
  isOpenEdit.value = id;
}
const deleteListBtn = (idx) => {
  diceTopicStore.deleteTopic(idx);
};
const executeSave = (val, i) => {
  diceTopicStore.setTopic(val, i);
  closeEditStatus(val.id);
}
const closeEditStatus = (id) => {
  if (isOpenEdit.value === id) {
    isOpenEdit.value = "";
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
        <ButtonCommon @click="onClick" width="12rem" height="2rem">
          {{ btnMessage }}
        </ButtonCommon>
      </div>
      <h2>TOPIC:</h2>
      <h3 v-if="topicList.length > 0">「{{ topicList[topicIndex].title }}」</h3>
      <div v-else class="empty-list-wrap">
        <h3>リストがありません。</h3>
        <span class="empty-message-text">※追加するには下部にあるボタンから</span>
      </div>
      <img :src="dices[diceIndex]" />
    </section>
    <section class="activity-register-list-wrap">
      <h1>登録されているリスト</h1>
      <div class="list-wrap register-list-wrap">
        <ul v-if="topicList.length > 0">
          <li v-for="(list, i) of topicList" :key="i">
            <div v-show="isOpenEdit !== list.id" class="registered-list">
              <div class="registered-list-id">{{ i + 1 }}：</div>
              <div>{{ list.title }}</div>
              <button @click="openEditBtn(list.id)" class="edit-btn">編集</button>
            </div>
            <EditTopicItem v-if="isOpenEdit === list.id" :id="list.id" :topic="list.title" isDeleteBtn
              @saveBtn="executeSave($event, i)" @cancelBtn="closeEditStatus" @deleteBtn="deleteListBtn(i)" />
          </li>
        </ul>
        <div v-else class="empty-list-wrap register-section">
          <span class="empty-message-text">リストを作ってサイコロを振ろう！</span>
        </div>
        <button v-show="isOpenEdit !== returnNextListLength" @click="openEditBtn(returnNextListLength)"
          class="list-add-btn-wrap">
          <img src="/image/activity/diceTopic/icons8-add-64.png">
          <p>項目を追加する</p>
        </button>
        <EditTopicItem v-if="isOpenEdit === returnNextListLength" :id="returnNextListLength" topic=""
          @saveBtn="executeSave($event, returnNextListLength)" @cancelBtn="closeEditStatus" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.activity-contents-wrap {
  img {
    width: 10rem;
  }

  button {
    background: none;
    border: none;
  }

  .empty-list-wrap {
    margin-bottom: 30px;

    &.register-section {
      // display: flex;
      margin: 0;
    }

    .empty-message-text {
      color: $text-secondary;
      font-size: 0.8rem;
    }
  }

  .activity-register-list-wrap {
    display: flex;
    flex-direction: column;
    min-height: 15rem;
    background-color: $theme-bg-color;
    margin: 4rem auto 0;
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

      &.register-list-wrap {
        margin: 0 auto 1rem;
        flex-direction: column;
      }

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
        padding: 0rem;
        list-style-type: none;
      }

      .registered-list {
        display: flex;
        font-size: 0.8rem;
        width: 23rem;
        margin: 0.4rem 0;
        align-items: center;

        .registered-list-id {
          padding: 0.4rem;
        }

        .edit-btn {
          color: $secondary-text-color;
          margin: 0 0 0 auto;
          padding-left: 2rem;
          justify-items: end;
          cursor: pointer;
        }
      }
    }

    .list-add-btn-wrap {
      display: flex;
      align-items: center;
      padding: 0;
      cursor: pointer;

      img {
        width: 1.5rem;
        height: 1.5rem;
        align-items: center;
      }

      p {
        color: $text-black;
        font-size: 0.8rem;
        font-weight: 600;
        line-height: 1rem;
      }
    }
  }
}
</style>