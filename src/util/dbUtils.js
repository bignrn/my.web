import { getFirestore, collection, doc, getDoc, onSnapshot } from "firebase/firestore";
const ROOT_COLLECTION_NAME = "main-hosting";
const APP_DOC_ID = "8AcYXd4wbC93Em8dNuuJ";

// common
const getRootCollection = (SUB_COLLECTION) => {
  return collection(getFirestore(), ROOT_COLLECTION_NAME, APP_DOC_ID, SUB_COLLECTION);
};
const getRootDocument = (SUB_COLLECTION, DOC_ID) => {
  return doc(getFirestore(), ROOT_COLLECTION_NAME, APP_DOC_ID, SUB_COLLECTION, DOC_ID);
};

export { getRootCollection, getRootDocument };
