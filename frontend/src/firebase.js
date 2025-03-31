import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "ayuraksha-bdf2d.firebaseapp.com",
  projectId: "ayuraksha-bdf2d",
  storageBucket: "ayuraksha-bdf2d.firebasestorage.app",
  messagingSenderId: "1029692891303",
  appId: "1:1029692891303:web:9265e0826e6f4600633b82",
  measurementId: "G-J2JY528VF0",
};

export const app = initializeApp(firebaseConfig);
