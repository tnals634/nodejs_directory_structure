// /routes/posts.js
const express = require("express");

const router = express.Router();

const data = [
  {
    postId: "62d6d12cd88cadd496a9e54e",
    user: "Developer",
    title: "안녕하세요",
    createdAt: "2022-07-19T15:43:40.266Z",
  },
  {
    postId: "62d6cc66e28b7aff02e82954",
    user: "Developer",
    title: "안녕하세요",
    createdAt: "2022-07-19T15:23:18.433Z",
  },
];

const Posts = require("../schemas/post.js");

//전체 게시글 조회
router.get("/", async (req, res) => {
  const post = await Posts.find(
    {},
    { _id: 1, user: 1, title: 1, createdAt: 1 }
  );

  const data = post.map((posts) => {
    return {
      postId: posts._id,
      user: posts.user,
      title: posts.title,
      createdAt: posts.createdAt,
    };
  });

  res.json({ data });
});

//상세 게시글 조회
router.get("/:_postId", async (req, res) => {
  const { _postId } = req.params;

  const posts = await Posts.find({}, { password: 0, _v: 0 });

  const filterPost = posts.filter((value) => String(value._id) === _postId);

  const data = filterPost.map((value) => {
    return {
      postId: value._id,
      user: value.user,
      title: value.title,
      content: value.content,
      createdAt: value.createdAt,
    };
  });
  if (!data[0]) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
  return res.json({ data });
});

//게시글 생성 API
router.post("/", async (req, res) => {
  const { user, password, title, content } = req.body;
  const date = new Date();

  if (!user || !password || !title || !content) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }

  await Posts.create({
    user,
    password,
    title,
    content,
    createdAt: date,
  });

  res.status(201).json({ message: "게시글을 생성하였습니다." });
});

//게시글 수정 API
router.put("/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { password, title, content } = req.body;

  const posts = await Posts.find({}, { user: 0, _v: 0 });

  const filterPost = posts.filter((value) => String(value._id) === _postId);

  if (!filterPost.length) {
    return res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
  } else if (
    !password ||
    !title ||
    !content ||
    password !== filterPost[0].password
  ) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
  await Posts.updateOne(
    { _id: _postId },
    {
      $set: {
        title: title,
        content: content,
      },
    }
  );

  res.json({ message: "게시글을 수정하였습니다." });
});

//게시글 삭제 API
router.delete("/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { password } = req.body;

  const posts = await Posts.find({}, { password: 1 });
  const filterPost = posts.filter((value) => String(value._id) === _postId);

  if (!filterPost.length) {
    return res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
  } else if (!password || password !== filterPost[0].password) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
  await Posts.deleteOne({ _id: _postId });
  res.json({ message: "게시글을 삭제하였습니다." });
});
module.exports = router;
