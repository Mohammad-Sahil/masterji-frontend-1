import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC9h-b_h_p_pug3JtXLdWkOU02VW4fPmMQ",
  authDomain: "masterji-online.firebaseapp.com",
  projectId: "masterji-online",
  storageBucket: "masterji-online.appspot.com",
  messagingSenderId: "437763937824",
  appId: "1:437763937824:web:b1794908522fa5c1330e45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)