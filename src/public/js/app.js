const socket = io();
const room = document.getElementById("room");
const form = room.querySelector("form");

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", { payload: input.value });
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);