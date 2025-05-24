<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useDiceTopicDbStore } from "@/stores/DiceTopicDb";
import { useUserInfoStore } from "@/stores/UserInfo";
import { diceImgs } from "@/util/diceUtils";
import ButtonCommon from "@/components/all/common/ButtonCommon.vue";
import DialogCommon from "@/components/all/common/DialogCommon.vue";
import EditTopicItem from "@/components/activity/EditTopicItem.vue";

const { topicList, selectedTopic, selectedKeyword, allDiceTopicInfo } = storeToRefs(useDiceTopicDbStore());
const {
  setTopic,
  deleteTopic,
  setSelectedTopic,
  searchKeyword,
  destroyDiceTopicData,
  setShearUser,
  setIsLocked,
  createDiceTopicData,
} = useDiceTopicDbStore();
const { myInformation } = storeToRefs(useUserInfoStore());
const { retrieveUserInfo } = useUserInfoStore();

const diceIndex = ref(0);
const topicIndex = ref(0);
const stopFlg = ref(false);
const isOpenEdit = ref("");
const inputKeyword = ref("");
const inputUserName = ref("");
const isLockedLocal = ref("");
const inputNewKeyword = ref(""); // 管理者のみ
const MAX_SHAKE_COUNT = 300;
let count = 0;

// computed //
const btnMessage = computed(() =>  stopFlg.value ? "ストップする" : "サイコロを投げる");
const returnNextListLength = computed(() => {
  if (topicList.value.length === 0) return "1"; // 初期値
  return `${Math.max(...topicList.value.map(l => Number(l.topicId))) + 1}`;
})

// **** サイコロ処理 ****//
const onStartShakeDice = () => {
  stopFlg.value = !stopFlg.value;
  if (stopFlg.value) {
    // アニメーション
    animation();
    setSelectedTopic(null);
    if (myInformation.value?.userName && !isLockedLocal.value)
      setIsLocked(myInformation.value.userName); // NOTE: lockedに値があれば更新しない
  } else {
    // ストップ
    shakeDice();
    setSelectedTopic(topicList.value[topicIndex.value]); // db更新
  }
}
const fakeStartShakeDice = (flg) => {
  stopFlg.value = flg;
  if (flg) animation();
};
const shakeDice = () => {
  diceIndex.value = Math.floor(Math.random() * diceImgs.length);
  topicIndex.value = Math.floor(Math.random() * topicList.value.length);
}
const animation = () => {
  shakeDice();
  if (stopFlg.value && count < MAX_SHAKE_COUNT) {
    count++;
    setTimeout(animation, 50); // シャットダウン間隔
  } else {
    count = 0;
    stopFlg.value = false;
  }
}

// **** リスト編集処理 ****//
const openEditBtn = (id) => isOpenEdit.value = id;
const deleteListBtn = async (idx) => await deleteTopic(idx);
const executeSave = (val, i) => {
  const { id: topicId, topic: topicTitle} = val; //NOTE: 既存コンポーネントを変えない様にする為置換
  if (isNaN(i)) {
    i = topicId;
  }
  setTopic({topicId, topicTitle}, i);
  closeEditStatus(topicId);
}
const closeEditStatus = (id) => {
  if (isOpenEdit.value === id) isOpenEdit.value = "";
}

// **** utils ****//
// ダブルタップのズーム処理阻止
const stopDoubleTap = (e) => e.preventDefault();
// ダイアログの処理
const onNextProcess = async () => {
  const step2Flg = selectedKeyword.value?.keyword;
  // 空チェック
  if (!inputKeyword.value) return;
  if (step2Flg && !inputUserName.value) return;
  if (step2Flg && !inputUserName.value.match(/^[^.]+$/)) return;
  // 実行
  if (!selectedKeyword.value){
    // あいことば
    await searchKeyword(inputKeyword.value);
    // 共有ユーザアップデート
    if (myInformation.value && myInformation.value?.userName)
      await setShearUser(myInformation.value.userName);
    return;
  }
  if (step2Flg){
    await retrieveUserInfo(inputUserName.value, inputKeyword.value);
    // 共有ユーザアップデート
    if (myInformation.value?.userName)
      await setShearUser(myInformation.value.userName);
  }
};
const removeThisPage = async () => {
  await setShearUser(myInformation.value.userName, true); // 共有ユーザを削除
  document.removeEventListener("dblclick", stopDoubleTap);
  window.removeEventListener("beforeunload", removeThisPage);
  destroyDiceTopicData(); // データをクリーンアップ
}

// watch //
watch(
  allDiceTopicInfo,
  () => {
    // NOTE: 初回起動時はデータが無いので動かさなくて良い
    isLockedLocal.value = allDiceTopicInfo.value?.isLocked ?? "";
    fakeStartShakeDice(isLockedLocal.value !== "");
  },
  {deep:true}
);

// mounted //
onMounted(() => {
  document.addEventListener("dblclick", stopDoubleTap, { passive: false });
  window.addEventListener("beforeunload", removeThisPage);
})
// unmounted //
onUnmounted(async () => {
  removeThisPage();
})
</script>

<template>
  <section class="activity-contents-wrap">
    <h1 class="main-title">サイコロトーク(試験運用)</h1>
    <p class="sub-title">-SAIKORO TALK-</p>
    <div class="login-information-wrap">
      <!-- login user -->
      <p>
        user: {{ myInformation?.userName ? myInformation?.userName : "未ログイン" }}
      </p>
      <!-- login keyword -->
      <p>
        あいことば: {{ selectedKeyword?.keyword }}
      </p>
      <div v-if="myInformation?.admin">
        <input v-model="inputNewKeyword" />
        <button @click="createDiceTopicData(inputNewKeyword)">設定</button>
        <div>
          {{ selectedKeyword }}
        </div>
        <div>
          {{ allDiceTopicInfo }}
        </div>
        <div>
          {{ selectedTopic }}
          {{ topicList }}
        </div>
        <div>
          {{ myInformation }}
        </div>
      </div>
    </div>
    <!-- DICE -->
    <div class="dice-area-wrap">
      <div v-if="allDiceTopicInfo">
        <ButtonCommon
          v-if="isLockedLocal === '' || myInformation?.userName === isLockedLocal"
          @click="onStartShakeDice"
          width="15rem"
          height="3rem"
          class="start-dice-btn"
        >
          {{ btnMessage }}
        </ButtonCommon>
        <!-- NOTE: 誰かが操作中は阻止する。 -->
        <p v-else class="button-not-action">{{isLockedLocal}}が操作中です。</p>
      </div>
      <p class="topic-title-label">TOPIC</p>
      <!-- 選択したトピック -->
      <p v-if="topicList.length > 0" class="topic-title">
        <!-- アニメーションの為切り替える -->
        「{{ selectedTopic ? selectedTopic?.topicTitle : topicList[topicIndex]?.topicTitle }}」
      </p>
      <div v-else class="empty-list-wrap">
        <p class="topic-title">リストがありません</p>
        <p class="empty-message-text">※追加するには下にあるボタンから</p>
      </div>
      <img :src="diceImgs[diceIndex]" class="dice-img" alt="⚂" />
    </div>
    <!-- 使い方 -->
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
    <!-- TOPIC LIST -->
    <div class="activity-register-list-wrap">
      <h2>トピックリスト</h2>
      <div class="list-wrap register-list-wrap">
        <ul v-if="topicList.length > 0">
          <li v-for="(list, i) of topicList" :key="list">
            <div v-show="isOpenEdit !== list.topicId" class="registered-list">
              <div class="registered-list-id">{{ i + 1 }}：</div>
              <div class="registered-list-title">{{ list.topicTitle }}</div>
              <button @click="openEditBtn(list.topicId)" class="edit-btn">編集</button>
            </div>
            <EditTopicItem
              v-if="isOpenEdit === list.topicId"
              :dispId="(i + 1).toString()"
              :id="list.topicId"
              :topic="list.topicTitle"
              isDeleteBtn
              @saveBtn="executeSave($event, i)"
              @cancelBtn="closeEditStatus"
              @deleteBtn="deleteListBtn(i)"
            />
          </li>
        </ul>
        <div v-else class="empty-list-wrap register-section">
          <span class="empty-message-text">リストを作ってサイコロを振ろう！</span>
        </div>
        <button
          v-show="isOpenEdit !== returnNextListLength"
          @click="openEditBtn(returnNextListLength)"
          class="list-add-btn-wrap"
        >
          <img src="images/activity/diceTopic/icons8-add-64.png" class="add-img-icon" />
          <p>項目を追加する</p>
        </button>
        <EditTopicItem
          v-if="isOpenEdit === returnNextListLength"
          :dispId="(topicList.length + 1).toString()"
          :id="returnNextListLength"
          topic=""
          @saveBtn="executeSave($event, returnNextListLength)"
          @cancelBtn="closeEditStatus"
        />
      </div>
    </div>
    <!-- ログインユーザリスト -->
    <div v-if="allDiceTopicInfo" class="login-users-list-wrap">
      <h2>ログインしているユーザ名</h2>
      <p v-for="shearUserName in allDiceTopicInfo.shearUser" :key="shearUserName">
        {{ shearUserName }}
      </p>
    </div>
    <!-- ダイアログ -->
    <DialogCommon :displayStatus="!selectedKeyword || !myInformation">
      <template #dialog-main>
        <div class="setting-space-form">
          <div v-if="myInformation?.userName">「{{myInformation?.userName}}」でログインします</div>
          <div class="step1-wrap">
            <p>あいことばを入力</p>
            <input v-model="inputKeyword" class="input-text"/>
          </div>
          <div v-if="selectedKeyword" class="step2-wrap">
            <p>ニックネームを入力</p>
            <input v-model="inputUserName" class="input-text"/>
            <div class="msg">※「.」(ドット)は使用できません</div>
            <div class="msg">※本名は避けてください</div>
          </div>
          <ButtonCommon @click="onNextProcess()" width="15rem" height="3rem">
            {{selectedKeyword ? "次へ" : "始める"}}
          </ButtonCommon>
        </div>
      </template>
    </DialogCommon>
  </section>
</template>

<style lang="scss" scoped>
.activity-contents-wrap {
  button {
    background: none;
    border: none;
  }

  // タイトル
  .main-title {
    font-size: 3rem;
  }
  .sub-title {
    font-size: 2rem;
  }

  // ログイン情報
  .login-information-wrap {
    p {
      font-size: 1.6rem;
      margin-top: 0.5rem;
    }
  }

  // サイコロ
  .dice-area-wrap {
    margin-top: 6.4rem;

    .button-not-action {
      font-size: 2rem;
    }

    .topic-title-label {
      position: relative;
      z-index: -1;
      font-size: 2rem;
      font-weight: 700;
      margin-top: 3.1rem;

      &::after {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -0.3rem;
        display: flex;
        content: "";
        width: 3.9rem;
        height: 0.4rem;
        margin: 0 auto;
        background-color: $black;
      }
    }

    .topic-title {
      font-size: 2rem;
      font-weight: 400;
      margin-top: 1.9rem
    }

    .dice-img {
      width: 10rem;
      margin-top: 4rem;
    }
  }

  // リストが無い時
  .empty-list-wrap {
    margin-bottom: 30px;

    .empty-message-text {
      font-size: 1.6rem;
      font-weight: 400;
      color: $text-secondary;
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
  .activity-register-list-wrap,
  .login-users-list-wrap {
    margin: 6.2rem 0 0;

    h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 2.3rem;
    }

    ol {
      text-align: left;
      font-size: 1.2rem;
      font-weight: bold;
      max-width: 33rem;
      padding: 0.3rem 4rem;
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
          font-weight: 400;
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
        margin: 1rem auto;
        font-size: 1.6rem;
        font-weight: 500;

        .registered-list-id {
          padding: 0.4rem;
        }

        .registered-list-title {
          min-width: 16rem;
          max-width: 40rem;
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

  .login-users-list-wrap {
    margin: 2rem 0;
    p {
      font-size: 1.6rem;
    }
  }

  // ダイアログ
  .setting-space-form {
    position: relative;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
    :deep(.common-button-wrap) {
      position: absolute;
      bottom: 3rem;
      left: 0;
      right: 0;
      margin: auto;
    }
    .step1-wrap,
    .step2-wrap {
      margin-top: 1rem;
      p {
        font-size: 2rem;
      }
      .input-text {
        margin-top: 0.5rem;
        font-size: 1.6rem;
        width: 20rem;
        height: 2.4rem;
        border-radius: 1rem;
      }
      .msg {
        font-size: 1.6rem;
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