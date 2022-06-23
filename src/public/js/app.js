const messageList = document.querySelector("ul");
const messageForm = document.querySelector("Form")
const host = window.location.host;

// socket은 서버로의 연결을 뜻함
const socket = new WebSocket(`ws://${host}`);

socket.addEventListener("open", () => {
    console.log("connected");
    console.log(host);
});

socket.addEventListener("close", () => {
    console.log("disconnected from server");
})

socket.addEventListener("message", (message) => {
    console.log(`from server : ${message.data}`);
})

function handleSubmit(event) {
    event.preventDefault();
    const input = document.getElementById("msg_input");
    const output = document.getElementById("msg_output");

    output.value = input.value;
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);