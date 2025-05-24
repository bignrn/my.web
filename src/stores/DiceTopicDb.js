import { defineStore, storeToRefs } from "pinia";
import {
  addDoc,
  setDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { getRootDocument, getRootCollection } from "@/util/dbUtils";
import { useUserInfoStore } from "./UserInfo";
const DICE_TOPIC = "dice-topic";
const DICE_TOPIC_KEYWORD = "dice-topic-keyword";

// store
export const useDiceTopicDbStore = defineStore("DiceTopicDb", {
  state: () => ({
    /** あいことば @type {Object} */
    selectedKeyword: null,
    /** 選択中のトピック @type {Object} */
    selectedTopic: null,
    /** トピックリスト @type {Array} */
    topicList: [],
    /** dice-topicの全データ */
    allDiceTopicInfo: null,
    /** onSnapの破壊用 @type {Function} */
    diceTopicDestroy: null,
  }),
  actions: {
    // getter //
    startDiceTopicData() {
      const docRef = getRootDocument(DICE_TOPIC, this.selectedKeyword.diceTopicDocId);
      this.diceTopicDestroy = onSnapshot(docRef, (res) => {
        if (!res.empty) {
          const data = res.data();
          this.allDiceTopicInfo = data;
          this.selectedTopic = this.allDiceTopicInfo.selectedTopic;
          // ロック状態かチェック
          if(this.allDiceTopicInfo.isLocked === "") {
            this.topicList = this.allDiceTopicInfo.topicList;
          }
        } else {
          console.error("No such document!");
        }
      });
    },
    /**
     * キーワードがあるか検索する
     * @param {string} keyword 
     * @returns 
     */
    async searchKeyword(keyword) {
      const collectionRef = getRootCollection(DICE_TOPIC_KEYWORD);
      const query = query(collectionRef, where("keyword", "==", keyword))
      const snap = await getDocs(query);
      if (snap.empty) return false;
      const data = snap.docs[0].data();
      this.selectedKeyword = data;
      // 成功時にデータを裏で取得する
      this.startDiceTopicData();
      return true;
    },

    // destroy //
    destroyDiceTopicData() {
      if (this.diceTopicDestroy) this.diceTopicDestroy();
      this.selectedKeyword = null;
      this.selectedTopic = null
      this.topicList = [];
      this.allDiceTopicInfo = null;
      this.diceTopicDestroy = null;
    },

    // setter //
    async setTopic(val, idx) {
      const { myInformation } = storeToRefs(useUserInfoStore());
      const setVal = {
        topicId: val.topicId,
        topicTitle: val.topicTitle,
        userName: myInformation.userName,
        timestamp: new Date(),
      };
      const deepCopyList = [...this.topicList];
      if (idx >= this.topicList.length) {
        // 新規
        deepCopyList.push(setVal)
      } else {
        // 編集
        deepCopyList[idx] = setVal;
      }
      // upload
      await setDoc(
        getRootDocument(
          DICE_TOPIC,
          this.selectedKeyword.diceTopicDocId
        ),
        { topicList: deepCopyList, }, 
        { merge: true }
      );
    },
    async deleteTopic(idx) {
      const deepCopyList = [...this.topicList];
      deepCopyList.splice(idx, 1);
      // upload
      await setDoc(
        getRootDocument(
          DICE_TOPIC,
          this.selectedKeyword.diceTopicDocId
        ),
        { topicList: deepCopyList, }, 
        { merge: true }
      );
    },
    async setSelectedTopic(obj) {
      this.selectedTopic = obj;
      // upload
      await setDoc(
        getRootDocument(
          DICE_TOPIC,
          this.selectedKeyword.diceTopicDocId
        ),
        { selectedTopic: this.selectedTopic, isLocked: "" }, 
        { merge: true }
      );
    },
    // lockedのupdate
    async setIsLocked(str) {
      await setDoc(
        getRootDocument(
          DICE_TOPIC,
          this.selectedKeyword.diceTopicDocId
        ),
        { isLocked: str }, 
        { merge: true }
      );
    },
    // shearUserのupdate
    async setShearUser(str, isDelete = false) {
      if (!isDelete) {
        // update
        await setDoc(
          getRootDocument(
            DICE_TOPIC,
            this.selectedKeyword.diceTopicDocId
          ),
          { shearUser: arrayUnion(str) }, 
          { merge: true }
        );
      } else {
        // delete
        await setDoc(
          getRootDocument(
            DICE_TOPIC,
            this.selectedKeyword.diceTopicDocId
          ),
          { shearUser: arrayRemove(str) }, 
          { merge: true }
        );
      }
    },
    // あいことばの下となるデータを作成する
    async createDiceTopicData(keyword) {
      const formatData = {
        selectedTopic: {},
        topicList: [],
        isLocked: "",
        shearUser: [],
      };
      const diceTopicRef = await addDoc(getRootCollection(DICE_TOPIC), formatData);
      const diceTopicId = diceTopicRef.id;
      await addDoc(
        getRootCollection(DICE_TOPIC_KEYWORD),
        { keyword, diceTopicDocid: diceTopicId }
      );
    },
  }
});
