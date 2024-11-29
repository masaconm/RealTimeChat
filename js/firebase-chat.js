import { db } from "./firebase-config.js";
import { ref, push, set, onChildAdded } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

const dbRef = ref(db, "chat");
const userName = localStorage.getItem("userName");

if (!userName) {
  alert("ログイン情報がありません。ログイン画面に戻ります。");
  window.location.href = "login.html";
}

document.getElementById("send").addEventListener("click", async () => {
  const text = document.getElementById("text").value.trim();
  const imageFile = document.getElementById("image-upload").files[0];

  if (!text && !imageFile) {
    alert("メッセージまたは画像を入力してください！");
    return;
  }

  const msg = { uname: userName, text, time: Date.now() };

  if (imageFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      msg.imageUrl = reader.result;
      sendMessage(msg);
    };
    reader.readAsDataURL(imageFile);
  } else {
    sendMessage(msg);
  }
});

function sendMessage(msg) {
  const newPostRef = push(dbRef);
  set(newPostRef, msg)
    .then(() => {
      console.log("Message sent!");
      document.getElementById("text").value = "";
      document.getElementById("image-upload").value = "";
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
}

onChildAdded(dbRef, (snapshot) => {
  const msg = snapshot.val();
  const output = document.getElementById("output");

  const side = msg.uname === userName ? "left" : "right";
  const userColor = generateUserColor(msg.uname);
  const formattedTime = new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  let msgHTML = `
    <div class="chat-message ${side}">
      <div class="user-container">
        <div class="user-icon" style="background-color: ${userColor}">
          ${msg.uname[0]}
        </div>
        <div class="user-name">${msg.uname}</div>
      </div>
      <div>
        ${msg.text ? `<div class="chat-bubble ${side}">${msg.text}</div>` : ""}
        ${msg.imageUrl ? `<img src="${msg.imageUrl}" class="chat-image" />` : ""}
        <div class="chat-time">${formattedTime}</div>
      </div>
    </div>
  `;

  output.innerHTML += msgHTML;
  output.scrollTop = output.scrollHeight;
});

function generateUserColor(userName) {
  let hash = 0;
  for (let i = 0; i < userName.length; i++) {
    hash = userName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${Math.abs(hash % 360)}, 70%, 50%)`;
}
