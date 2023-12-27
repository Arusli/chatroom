// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, push, onValue } from "firebase/database";

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
const db = getDatabase();
const usersReference = ref(db, "users");
const messagesReference = ref(db, "messages");

export const writeUser = (name, color, online) => {
  push(usersReference, {
    name,
    color,
    online,
  });
};

export const writeMessage = (
  text,
  senderName,
  senderId,
  createdAt,
  color,
  status
) => {
  push(messagesReference, {
    text,
    senderName,
    senderId,
    createdAt,
    color,
    status,
  });
};

export let userSnapshot;

onValue(usersReference, (snapshot) => {
    userSnapshot = snapshot.val();
    console.log('snapshot', userSnapshot);
});
