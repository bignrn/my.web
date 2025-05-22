import { defineStore } from "pinia";
import {  getDocs, setDoc } from "firebase/firestore";
import { getRootDocument, getRootCollection } from "@/util/dbUtils";

export const useUserInfoStore = defineStore("UserInfo", {
  state: () => ({
    /** ログイン情報 */
    myInformation: null,
  }),
  actions: {
    // getter //
    async retrieveUserInfo(userName) {
      // // 検索
      // const collectionRef = getRootCollection(DICE_TOPIC_KEYWORD);
      // const query = query(collectionRef, where("userName", "==", userName))
      // const snap = await getDocs(query);

      // if (snap.empty) {
      // // ない場合保存
      // this.myInformation = {
      //   userName,
      //   keywordHistory: [],
      //   created: new Date(),
      //   updated: new Date(),
      // };
      //  await setDoc(collectionRef, this.myInformation)
      //  return false;
      // }
      // const data = snap.docs[0].data();
      // this.selectedKeyword = data;
      this.myInformation = { // TODO
        userName,
        keywordHistory: [],
        created: new Date(),
        updated: new Date(),
      };
      return true;
    },
}
});