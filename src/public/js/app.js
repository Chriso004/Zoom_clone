const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nicknameForm = document.querySelector("#nickname");
const host = window.location.host;

// socket은 서버로의 연결을 뜻함
const socket = new WebSocket(`ws://${host}`);

socket.addEventListener("open", () => {
    console.log("connected");
});

socket.addEventListener("close", () => {
    console.log("disconnected from server");
})

socket.addEventListener("message", (message) => {
    const newMsg = document.createElement("li");
    newMsg.innerText = message.data;
    messageList.append(newMsg);
    console.log(`from server : ${message.data}`);
})

function SendMessage(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
}

function MessageSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(SendMessage("message", input.value));
    input.value = "";
}

function NicknameSubmit(event) {
    event.preventDefault();
    const input = nicknameForm.querySelector("input");
    socket.send(SendMessage("nickname", input.value));
    nicknameForm.style.display = "none";
    messageForm.style.display = "block";
}

messageForm.addEventListener("submit", MessageSubmit);
nicknameForm.addEventListener("submit", NicknameSubmit);