const express = require("express");
const app = express();
const port = 3000;

const commentRouter = require("./routes/comments.js");
const postsRouter = require("./routes/posts.js");
const connect = require("./schemas");

connect();

app.use(express.json());
app.use("/", [postsRouter, commentRouter]);

app.get("/", (req, res) => {
  res.send("Cannot GET /");
});

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
