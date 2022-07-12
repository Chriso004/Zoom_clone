const socket = io();

const room = document.getElementById("room");
const chat = document.getElementById("chat");
const form = room.querySelector("form");

const enter_room = () => {    
    room.hidden = true;
    chat.hidden = false;
}

const addMessage = (message) => {
    const ul = chat.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

const handleRoomSubmit = (event) => {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, enter_room);

    const roomName = chat.querySelector("h3");
    roomName.innerText = input.value;
    input.value = "";
}

socket.on("welcome", () => {
    addMessage("Someone Join!");
});

form.addEventListener("submit", handleRoomSubmit);