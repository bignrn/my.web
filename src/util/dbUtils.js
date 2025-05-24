import { getFirestore, collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { ROOT_COLLECTION_NAME, APP_DOC_ID } from "@/config";

// common
const getRootCollection = (SUB_COLLECTION) => {
  return collection(getFirestore(), ROOT_COLLECTION_NAME, APP_DOC_ID, SUB_COLLECTION);
};
const getRootDocument = (SUB_COLLECTION, DOC_ID) => {
  return doc(getFirestore(), ROOT_COLLECTION_NAME, APP_DOC_ID, SUB_COLLECTION, DOC_ID);
};

export { getRootCollection, getRootDocument };
