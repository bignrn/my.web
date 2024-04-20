<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useDiceTopicStore } from "../../stores/DiceTopic";
import ButtonCommon from "../all/common/ButtonCommon.vue";
import EditTopicItem from "./EditTopicItem.vue";

const diceTopicStore = useDiceTopicStore();
const { topics } = storeToRefs(diceTopicStore);

const dices = ref([
  "images/activity/dices/dice-1.png",
  "images/activity/dices/dice-2.png",
  "images/activity/dices/dice-3.png",
  "images/activity/dices/dice-4.png",
  "images/activity/dices/dice-5.png",
  "images/activity/dices/dice-6.png",
  "images/activity/dices/dice-black-1.png",
  "images/activity/dices/dice-black-2.png",
  "images/activity/dices/dice-black-3.png",
  "images/activity/dices/dice-black-4.png",
  "images/activity/dices/dice-black-5.png",
  "images/activity/dices/dice-black-6.png",
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
  return `${Number(topicList.value[topicList.value.length - 1]?.id) + 1}`; // TODO 削除時にidが被ってしまう
})

const openEditBtn = (id) => {
  isOpenEdit.value = id;
}
const deleteListBtn = (idx) => {
  diceTopicStore.deleteTopic(idx);
};
const executeSave = (val, i) => {
  if (isNaN(i)) {
    i = val.id;
  }
  diceTopicStore.setTopic(val, i);
  closeEditStatus(val.id);
}
const closeEditStatus = (id) => {
  if (isOpenEdit.value === id) {
    isOpenEdit.value = "";
  }
}

// ダブルタップのズーム処理阻止
const stopDoubleTap = (e) => {
  e.preventDefault();
};

onMounted(() => {
  document.addEventListener("dblclick", stopDoubleTap, { passive: false });
})
onUnmounted(() => {
  document.removeEventListener("dblclick", stopDoubleTap);
})
</script>

<template>
  <section class="activity-contents-wrap">
    <h1 class="main-title">サイコロトーク</h1>
    <p class="sub-title">-SAIKORO TALK-</p>
    <div class="activity-list-wrap">
      <h2>☕やり方</h2>
      <div class="list-wrap">
        <ol>
          <li>回す順番を決める。</li>
          <li><kbd>"サイコロを投げる"</kbd>を押す。</li>
          <li>自分のタイミングで<kbd>"ストップする"</kbd>を押す。</li>
          <li>その話題について話す。</li>
        </ol>
      </div>
    </div>
    <!-- DICE -->
    <div class="dice-area-wrap">
      <div>
        <ButtonCommon @click="onClick" width="12rem" height="2rem" class="start-dice-btn">
          {{ btnMessage }}
        </ButtonCommon>
      </div>
      <h2>TOPIC:</h2>
      <h2 v-if="topicList.length > 0">「{{ topicList[topicIndex]?.title }}」</h2>
      <div v-else class="empty-list-wrap">
        <h3>リストがありません。</h3>
        <span class="empty-message-text">※追加するには下部にあるボタンから</span>
      </div>
      <img :src="dices[diceIndex]" class="dice-img" />
    </div>
    <!-- TOPIC LIST -->
    <div class="activity-register-list-wrap">
      <h2>登録されているリスト</h2>
      <div class="list-wrap register-list-wrap">
        <ul v-if="topicList.length > 0">
          <li v-for="(list, i) of topicList" :key="list">
            <div v-show="isOpenEdit !== list.id" class="registered-list">
              <div class="registered-list-id">{{ i + 1 }}：</div>
              <div class="registered-list-title">{{ list.title }}</div>
              <button @click="openEditBtn(list.id)" class="edit-btn">編集</button>
            </div>
            <EditTopicItem v-if="isOpenEdit === list.id" :dispId="(i + 1).toString()" :id="list.id" :topic="list.title"
              isDeleteBtn @saveBtn="executeSave($event, i)" @cancelBtn="closeEditStatus"
              @deleteBtn="deleteListBtn(i)" />
          </li>
        </ul>
        <div v-else class="empty-list-wrap register-section">
          <span class="empty-message-text">リストを作ってサイコロを振ろう！</span>
        </div>
        <button v-show="isOpenEdit !== returnNextListLength" @click="openEditBtn(returnNextListLength)"
          class="list-add-btn-wrap">
          <img src="images/activity/diceTopic/icons8-add-64.png" class="add-img-icon" />
          <p>項目を追加する</p>
        </button>
        <EditTopicItem v-if="isOpenEdit === returnNextListLength" :dispId="(topicList.length + 1).toString()"
          :id="returnNextListLength" topic="" @saveBtn="executeSave($event, returnNextListLength)"
          @cancelBtn="closeEditStatus" />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.activity-contents-wrap {
  .dice-img {
    width: 10rem;
  }

  button {
    background: none;
    border: none;
  }

  .main-title {
    font-size: 2.5rem;
  }

  .sub-title {
    font-size: 1.5rem;
  }

  .dice-area-wrap {
    .start-dice-btn {
      font-size: 1rem;
      font-weight: 600;
    }

    .empty-list-wrap {
      margin-bottom: 30px;

      .empty-message-text {
        color: $text-secondary;
      }
    }
  }

  .activity-register-list-wrap {
    display: flex;
    flex-direction: column;
    padding-bottom: 5rem;
    min-height: 15rem;
    margin: 4rem auto 0;
    background-color: $theme-bg-color;
  }

  .activity-list-wrap {
    margin: 2rem 0;

    h2 {
      font-size: 2rem;
      margin: 0;
      padding: 0;
    }

    ol {
      text-align: left;
      font-size: 1.2rem;
      font-weight: bold;
      width: fit-content;
      padding: 0.3rem 2rem;
      border: 0.1rem solid black;
    }
  }

  .activity-list-wrap,
  .activity-register-list-wrap {
    h1 {
      padding-top: 1rem;
    }

    .list-wrap {
      display: flex;
      justify-content: center;
      margin: 0 0.5rem;

      &.register-list-wrap {
        margin: 0 auto 1rem;
        flex-direction: column;

        ul {
          text-align: left;
          font-weight: bold;
          width: fit-content;
          padding: 0rem;
          list-style-type: none;
        }

        .empty-list-wrap {
          padding: 1rem 0;
        }
      }

      h1 {
        width: 6rem;
      }

      .registered-list {
        display: flex;
        max-width: 23rem;
        margin: 0.4rem 0;
        align-items: center;

        .registered-list-id {
          padding: 0.4rem;
        }

        .registered-list-title {
          min-width: 16rem;
          max-width: 18rem;
          white-space: pre-wrap;
          word-break: break-word;
        }

        .edit-btn {
          color: $secondary-text-color;
          margin: 0 0 0 auto;
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

      .add-img-icon {
        width: 1.5rem;
        height: 1.5rem;
        align-items: center;
      }

      p {
        color: $text-black;
        font-weight: 600;
        line-height: 1rem;
      }
    }
  }
}
</style>