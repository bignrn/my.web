import { defineStore } from "pinia";
import { arrayUnion, getDocs, setDoc, query, where, addDoc } from "firebase/firestore";
import { getRootDocument, getRootCollection } from "@/util/dbUtils";
const USER_LIST_COLLECTION = "user-list";

export const useUserInfoStore = defineStore("UserInfo", {
  state: () => ({
    /** ログイン情報 */
    myInformation: null,
  }),
  actions: {
    // getter //
    async retrieveUserInfo(userName, keyword) {
      // 検索
      const collectionRef = getRootCollection(USER_LIST_COLLECTION);
      const q = query(collectionRef, where("userName", "==", userName))
      const snap = await getDocs(q);
      if (snap.empty) {
        // ない場合保存
        this.myInformation = {
          userName,
          keywordHistory: [keyword],
          created: new Date(),
          updated: new Date(),
        };
        await addDoc(collectionRef, this.myInformation);
        return false;
      }
      // データがある場合
      const data = snap.docs[0].data();
      const docId = snap.docs[0].id;
      this.myInformation = data;
      // 更新
      await setDoc(
        getRootDocument(USER_LIST_COLLECTION, docId),
        { updated: new Date(), keywordHistory: arrayUnion(keyword) },
        {merge: true}
      );
      return true;
    },
}
});