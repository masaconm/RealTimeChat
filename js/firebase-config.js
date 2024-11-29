// Firebase config.js 共通化

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

// Firebase設定
const firebaseConfig = {
  apiKey: 
  authDomain: 
  databaseURL: 
  projectId:
  storageBucket: 
  messagingSenderId: 
  appId: 

// Firebase初期化（重複防止）
const app = initializeApp(firebaseConfig);

// Firebaseサービスのインスタンス
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
