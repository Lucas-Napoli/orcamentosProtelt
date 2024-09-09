
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYsOuzxBZlQ8iVHLL4cVui3UiTTSvolHA",
  authDomain: "proteltorcamento.firebaseapp.com",
  projectId: "proteltorcamento",
  storageBucket: "proteltorcamento.appspot.com",
  messagingSenderId: "620320092632",
  appId: "1:620320092632:web:6bd076c6e9f465fbea42ad"
};


const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app)

export {db, auth}; 