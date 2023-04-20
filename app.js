// 获取界面中的元素
const chatWindow = document.querySelector("#chat-window");
const messageInput = document.querySelector("#message-input");
const sendButton = document.querySelector("#send-btn");
const menuButton = document.querySelector("#menu-btn");
const menu = document.querySelector("#menu");
const avatarInput = document.querySelector("#avatar-input");
const nameInput = document.querySelector("#name-input");
const popup = document.querySelector("#popup");

// 记录聊天记录
let chatHistory = [];
// 打开/关闭设置菜单
menuButton.addEventListener("click", () => {
  if (menu.style.display === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
});

// 更换头像和名称
const updateProfile = () => {
  const newAvatar = avatarInput.files[0];
  const newName = nameInput.value;
  // TODO: 更新头像和名称
  popupMessage("更换成功！");
};

// 下载聊天记录
const downloadChatHistory = () => {
  const blob = new Blob([JSON.stringify(chatHistory, null, 2)], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "chat_history.json";
  a.click();
  popupMessage("下载成功！");
};
// 发送消息
sendButton.addEventListener("click", () => {
  const message = messageInput.value;
  if (message.trim() === "") {
    popupMessage("请输入消息！");
    return;
  }
  chatWindow.innerHTML += `<div class="message sent">
                              <p>${message}</p>
                              <div class="meta">${getCurrentDateTime()}</div>
                            </div>`;
  messageInput.value = "";
  getChatbotResponse(message);
});

// 在聊天窗口中显示聊天机器人的响应
const showChatbotResponse = (response) => {
  chatWindow.innerHTML += `<div class="message received">
                              <p>${response}</p>
                              <div class="meta">${getCurrentDateTime()}</div>
                            </div>`;
  chatHistory.push({time: getCurrentDateTime(), message: response, sender: "chatbot"});
};

// 获取聊天机器人的响应
const getChatbotResponse = async (message) => {
  try {
    const url = `https://vvcqw.aichatos.com/#/chat/${Date.now()}`;
    const data = {message: message};
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    });
    const json = await response.json();
    const reply = json.message;
    if (!reply) {
      popupMessage("出错了，请重新发送！");
      return;
    }
    showChatbotResponse(reply);
  } catch (error) {
    console.error(error);
    popupMessage("出错了，请重新发送！");
  }
};
// 获取当前日期和时间
const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

// 显示弹出框
const popupMessage = (message) => {
  popup.innerText = message;
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
};
