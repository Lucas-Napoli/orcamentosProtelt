import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const apiKey = Constants.expoConfig.extra.APIKEY;
const authDomain = Constants.expoConfig.extra.AUTHDOMAIN;
const projectId = Constants.expoConfig.extra.PROJECTID;
const storageBucket = Constants.expoConfig.extra.STORAGEBUCKET;
const messagingSenderId = Constants.expoConfig.extra.MESSAGINGSENDERID;
const appId = Constants.expoConfig.extra.APPID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { db, auth };
