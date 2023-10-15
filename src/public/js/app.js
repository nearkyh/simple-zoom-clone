const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
    console.log("Connected to server.");
});

socket.addEventListener("message", (msg) => {
    const li = document.createElement("li");
    li.innerText = msg.data;
    messageList.append(li);
});

socket.addEventListener("close", () => {
    console.log("Disconnected from server.");
});

nicknameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = nicknameForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
})

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    const li = document.createElement("li");
    li.innerText = `You: ${input.value}`;
    messageList.append(li);
    input.value = "";
})
