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
      <h2>使い方</h2>
      <div class="list-wrap">
        <ol>
          <li class="step-item">
            <p>回す順番を決める。</p>
          </li>
          <li class="step-item">
            <p><kbd>"サイコロを投げる"</kbd>を押す。</p>
          </li>
          <li class="step-item">
            <p>自分のタイミングで<kbd>"ストップする"</kbd>を押す。</p>
          </li>
          <li class="step-item">
            <p>その話題について話す。</p>
          </li>
        </ol>
      </div>
    </div>
    <!-- DICE -->
    <div class="dice-area-wrap">
      <div>
        <ButtonCommon @click="onClick" width="15rem" height="3rem" class="start-dice-btn">
          {{ btnMessage }}
        </ButtonCommon>
      </div>
      <p class="topic-title label">TOPIC:</p>
      <p v-if="topicList.length > 0" class="topic-title">「{{ topicList[topicIndex]?.title }}」</p>
      <div v-else class="empty-list-wrap">
        <h3>リストがありません。</h3>
        <span class="empty-message-text">※追加するには下部にあるボタンから</span>
      </div>
      <img :src="dices[diceIndex]" class="dice-img" />
    </div>
    <!-- TOPIC LIST -->
    <div class="activity-register-list-wrap">
      <h2>トピックリスト</h2>
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
  button {
    background: none;
    border: none;
  }

  .main-title {
    font-size: 3rem;
  }

  .sub-title {
    font-size: 2rem;
  }

  .dice-area-wrap {
    .topic-title {
      font-size: 2.4rem;
      font-weight: 500;

      &.label {
        font-size: 1.8rem;
        font-weight: 600;
        margin-top: 4rem
      }
    }

    // リストが無い時
    .empty-list-wrap {
      margin-bottom: 30px;

      .empty-message-text {
        color: $text-secondary;
      }
    }

    .dice-img {
      width: 10rem;
      margin-top: 4rem;
    }
  }

  // TOPIC LIST
  .activity-register-list-wrap {
    display: flex;
    flex-direction: column;
    padding-bottom: 5rem;
    min-height: 15rem;
    margin: 4rem auto 0;
    background-color: $theme-bg-color;
  }

  // 使い方
  .activity-list-wrap,
  .activity-register-list-wrap {
    margin: 2rem 0 0;

    h2 {
      font-size: 2rem;
    }

    ol {
      text-align: left;
      font-size: 1.2rem;
      font-weight: bold;
      max-width: 29.6rem;
      padding: 0.3rem 2rem;
    }

    .list-wrap {
      display: flex;
      justify-content: center;
      margin: 0 0.5rem;

      &.register-list-wrap {
        margin: 0 1.5rem;
        margin-bottom: 1rem;
        flex-direction: column;

        ul {
          text-align: left;
          font-weight: bold;
          padding: 0rem;
          list-style-type: none;
        }

        .empty-list-wrap {
          padding: 1rem 0;
        }
      }

      li {
        @mixin font-style {
          font-size: 1.6rem;
          font-weight: 500;
        }

        &.step-item {
          @include font-style();

          >p {
            @include font-style();
          }
        }
      }

      h1 {
        width: 6rem;
      }

      .registered-list {
        align-items: center;
        display: flex;
        max-width: 50rem;
        width: 100%;
        margin: 0.4rem auto;
        font-size: 1.6rem;
        font-weight: 500;

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
          justify-items: end;
          width: 3rem;
          padding: 0;
          margin: 0 0 0 auto;
          color: $secondary-text-color;
          cursor: pointer;
        }
      }
    }

    .list-add-btn-wrap {
      display: flex;
      align-items: center;
      max-width: 50rem;
      width: 100%;
      padding: 0;
      margin: 0 auto;
      cursor: pointer;

      .add-img-icon {
        width: 1.5rem;
        height: 1.5rem;
        align-items: center;
      }

      p {
        color: $text-black;
        font-size: 1.6rem;
        font-weight: 700;
      }
    }
  }

  @media screen and (width > 1000px) {
    .main-title {
      font-size: 5rem;
    }

    .sub-title {
      font-size: 2.8rem;
    }

    .activity-list-wrap {
      h2 {
        font-size: 2rem;
      }

      ol {
        font-size: 1.6rem;
      }
    }

    .dice-area-wrap {
      .topic-title {
        font-size: 3rem;

        &.label {
          font-size: 2rem;
          margin-top: 4rem
        }
      }

      .dice-img {
        width: 15rem;
      }
    }
  }
}
</style>