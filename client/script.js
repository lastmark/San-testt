const socket = io();
let token;

document.getElementById("mode-toggle").onclick = () => {
  document.body.classList.toggle("light-mode");
};

function login() {
  fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    })
  })
    .then(res => res.json())
    .then(data => {
      token = data.token;
      document.getElementById("login-container").classList.add("hidden");
      document.getElementById("chat-container").classList.remove("hidden");
      document.getElementById("user-info").innerText = \`Logged in as: \${data.user.username} \${data.user.isAdmin ? '(Admin)' : ''}\`;
    });
}

function sendMessage() {
  const msg = document.getElementById("message").value;
  socket.emit("chatMessage", msg);
  document.getElementById("message").value = "";
}

socket.on("message", msg => {
  const div = document.createElement("div");
  div.innerHTML = \`<strong>\${msg.username}</strong>\${msg.isAdmin ? ' <span class="admin-badge">Admin</span>' : ''}: \${msg.text}\`;
  document.getElementById("messages").appendChild(div);
});