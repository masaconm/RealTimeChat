import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";

const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("メールアドレスとパスワードを入力してください。");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("ログイン成功:", user);
      localStorage.setItem("userName", user.displayName || "匿名ユーザー");
      window.location.href = "main.html";
    })
    .catch((error) => {
      console.error("ログインエラー:", error.code);
      alert("ログインに失敗しました。再試行してください。");
    });
});
