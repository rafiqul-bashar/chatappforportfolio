const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const { chats } = require("./data/data");
app.use(cors());
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("server running");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});
app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((el) => el._id === req.params.id);
  res.send(singleChat);
});

app.listen(5000, console.log(`Server running on port : ${PORT}`));
