import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBpdcpCSfys26rwFFkg7Ap8yeREfyclHk4",
    authDomain: "servicenow-153eb.firebaseapp.com",
    projectId: "servicenow-153eb",
    storageBucket: "servicenow-153eb.appspot.com",
    messagingSenderId: "261510344102",
    appId: "1:261510344102:web:adad6d3189237bb8507367"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const storage=getStorage(app);
export const db=getDatabase(app);

