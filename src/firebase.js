// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getDatabase,
  ref,
  get,
  push,
  onDisconnect,
  remove,
} from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3B093K4TD7KPnjD6tFt0wycvxkhviZok",
  authDomain: "chatroom-57a57.firebaseapp.com",
  projectId: "chatroom-57a57",
  storageBucket: "chatroom-57a57.appspot.com",
  messagingSenderId: "958163829630",
  appId: "1:958163829630:web:1e70fe2cd10f60efd8292f",
  measurementId: "G-SJ4EQDS9E0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getDatabase();
export const usersNodeReference = ref(db, "users");
export const messagesNodeReference = ref(db, "messages");
export const infoConnectedNodeReference = ref(db, ".info/connected");

export const pushUser = async ({ name, color, online }) => {
  const referenceId = push(usersNodeReference, {
    name,
    color,
    online,
  }).key;
  return referenceId;
};

export const pushMessage = async ({
  text,
  senderName,
  senderId,
  createdAt,
  color,
  status,
}) => {
  const referenceId = push(messagesNodeReference, {
    text,
    senderName,
    senderId,
    createdAt,
    color,
    status,
  }).key;
  return referenceId;
};

export const removeUser = async (user) => {
  const reference = ref(db, `users/${user.id}`);
  try {
    await remove(reference);
  } catch (e) {
    console.error(e);
  }
};

export const getUserByKey = async (userKey) => {
  try {
    const snapshot = await get(ref(db, `users/${userKey}`));
    if (snapshot.exists()) {
      console.log("snapshot", snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

// onValue(usersReference, (snapshot) => {
//     const userSnapshot = snapshot.val();
//     console.log('snapshot', userSnapshot);
// });

export const setUserDisconnect = async (user) => {
  console.log("setUserDisconnect runs");
  try {
    const userReference = ref(db, `users/${user.id}`);
    await onDisconnect(userReference).update({ online: false });
  } catch (e) {
    console.error(e);
  }
};
