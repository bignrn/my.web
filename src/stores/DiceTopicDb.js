import { defineStore } from "pinia";
import { getFirestore, collection, doc, getDoc, onSnapshot } from "firebase/firestore";
const ROOT_COLLECTION_NAME = "main-hosting";
const APP_DOC_ID = "8AcYXd4wbC93Em8dNuuJ";
const DICE_TOPIC = "dice-topic";
const DICE_TOPIC_KEYWORD = "dice-topic-keyword";

// common
const getRootCollection = (SUB_COLLECTION) => {
  return collection(getFirestore(), ROOT_COLLECTION_NAME, APP_DOC_ID, SUB_COLLECTION);
};
const getRootDocument = (SUB_COLLECTION, DOC_ID) => {
  return doc(getFirestore(), ROOT_COLLECTION_NAME, APP_DOC_ID, SUB_COLLECTION, DOC_ID);
};

// store
export const useDiceTopicDbStore = defineStore("DiceTopicDb", {
  state: () => ({
    /** 選択中のトピック @type {Object} */
    selectedTopic: null,
    /** トピックリスト @type {Array} */
    topicList: [],
    /** トピックリストの保留領域 @type {Array} */
    topicListTemp: null,
    /** onSnapの破壊用 @type {function} */
    diceTopicDestroy: null,
  }),
  actions: {
    // getter //
    startDiceTopicData(diceTopicDocid = "EeHSD0x20VXKbFHBt6k3") {
      const docRef = getRootDocument(DICE_TOPIC, diceTopicDocid);
      this.diceTopicDestroy = onSnapshot(docRef, (res) => {
        if (!res.empty) {
          console.log("Document data:", res.data());
        } else {
          console.log("No such document!");
        }
      });
    },

    // destroy //
    destroyDiceTopicData() {
      this.diceTopicDestroy();
    },

    // setter //
    setTopic(val, idx) {
      const setVal = {
        id: val.id,
        title: val.topic,
      };
      if (idx >= this.topicList.length) {
        this.topicList.push(setVal)
        return;
      }
      this.topicList[idx] = setVal;
    },
    deleteTopic(idx) {
      this.topicList.splice(idx, 1);
    },
    setSelectedTopic(obj) {
      this.selectedTopic = obj;
    }
  }
});
