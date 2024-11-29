import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js";

const registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("全ての項目を正しく入力してください。");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      updateProfile(user, { displayName: name })
        .then(() => {
          console.log("プロフィール更新成功:", user.displayName);
          localStorage.setItem("userName", name);
          window.location.href = "main.html";
        })
        .catch((error) => {
          console.error("プロフィール更新エラー:", error);
          alert("プロフィールの更新に失敗しました。再試行してください。");
        });
    })
    .catch((error) => {
      console.error("登録エラー:", error.code, error.message);
      alert("登録に失敗しました。エラーコード：" + error.code);
    });
});
