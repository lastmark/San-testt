const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(express.static("client"));

io.on("connection", socket => {
  socket.on("chatMessage", async (msg) => {
    const user = await User.findById(socket.userId);
    io.emit("message", {
      username: user.username,
      text: msg,
      isAdmin: user.isAdmin
    });
  });
});

http.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});