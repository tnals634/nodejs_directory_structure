// /routes/comments.js
const express = require("express");

const router = express.Router();

const data = [
  {
    commentId: "62d6d34b256e908fc79feaf8",
    user: "Developer",
    content: "안녕하세요 댓글입니다.",
    createdAt: "2022-07-19T15:52:43.212Z",
  },
  {
    commentId: "62d6d34b256e908fc79feaf8",
    user: "Developer",
    content: "안녕하세요 댓글입니다.",
    createdAt: "2022-07-19T15:52:43.212Z",
  },
];

const Comments = require("../schemas/comment.js");
const Posts = require("../schemas/post.js");
//댓글 목록 조회 API
router.get("/:_postId/comments", async (req, res) => {
  const { _postId } = req.params;

  const comments = await Comments.find({}, { password: 0, _v: 0 });

  const filterComment = comments.filter((value) => value.postId === _postId);

  const data = filterComment.map((value) => {
    return {
      commentId: value._id,
      user: value.user,
      content: value.content,
      createdAt: value.createdAt,
    };
  });

  res.json({ data });
});

//댓글 생성 API
router.post("/:_postId/comments", async (req, res) => {
  const { _postId } = req.params;
  const { user, password, content } = req.body;

  const date = new Date();

  if (!user || !password) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  } else if (!content) {
    return res.status(400).json({ message: "댓글 내용을 입력해주세요" });
  }

  await Comments.create({
    postId: _postId,
    user,
    password,
    content,
    createdAt: date,
  });

  res.status(201).json({ message: "댓글을 생성하였습니다." });
});

//댓글 수정 API
router.put("/:_postId/comments/:_commentId", async (req, res) => {
  const { _postId, _commentId } = req.params;
  const { password, content } = req.body;

  const comments = await Comments.find({ postId: _postId }, { user: 0, _v: 0 });

  const filterComment = comments.filter(
    (value) => String(value._id) === _commentId
  );

  if (!filterComment.length) {
    return res.status(404).json({ message: "댓글 조회에 실패하였습니다." });
  } else if (!password || password !== filterComment[0].password) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  } else if (!content) {
    return res.status(400).json({ message: "댓글 내용을 입력해주세요" });
  }

  await Comments.updateOne(
    { _id: _commentId },
    {
      $set: {
        content: content,
      },
    }
  );

  return res.json({ message: "댓글을 수정하였습니다." });
});

//댓글 삭제 API
router.delete("/:_postId/comments/:_commentId", async (req, res) => {
  const { _postId, _commentId } = req.params;
  const { password } = req.body;

  const comments = await Comments.find({ postId: _postId }, { password: 1 });

  const filterComment = comments.filter(
    (value) => String(value._id) === _commentId
  );

  if (!filterComment.length) {
    return res.status(404).json({ message: "댓글 조회에 실패하였습니다." });
  } else if (!password || password !== filterComment[0].password) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }

  await Comments.deleteOne({ _id: _commentId });
  res.json({ message: "댓글을 삭제하였습니다." });
});
module.exports = router;
