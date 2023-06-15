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

  //보여줄 값들만 1
  const comments = await Comments.find(
    {},
    { _id: 1, user: 1, content: 1, createdAt: 1, postId: 1 }
  );

  //_postId와 comments에 저장된 postId가 있는지 확인
  const filterComment = comments.filter((post) => post.postId === _postId);

  //_postId값과 일치하는게 없을 경우
  if (!filterComment.length) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }

  //값들 중 _id 이름만 commentId로 변경
  const data = filterComment.map(
    ({ _id: commentId, user, content, createdAt }) => ({
      commentId,
      user,
      content,
      createdAt,
    })
  );
  res.json({ data });
});

//댓글 생성 API
router.post("/:_postId/comments", async (req, res) => {
  const { _postId } = req.params;
  const { user, password, content } = req.body;

  //댓글 생성시 해당 날짜 저장
  const date = new Date();

  //보여줄 값들만 1
  const posts = await Posts.find({}, { _id: 1 });

  //입력받은 _postId값이 있는지 확인
  const filterPost = posts.filter((id) => String(id._id) === _postId);

  //body에 입력한 content값이 없을 경우
  if (!user || !password || !filterPost.length) {
    //body에 입력을 못했거나, filterPost값이 없을 경우
    return res.status(400).json({
      message: "데이터 형식이 올바르지 않습니다.",
    });
  } else if (!content) {
    return res.status(400).json({ message: "댓글 내용을 입력해주세요" });
  }

  //댓글이 어느 게시글의 댓글인지 구분하기위해 postId를 따로 저장
  const id = _postId;
  await Comments.create({
    postId: id,
    user,
    password,
    content,
    createdAt: date,
  });

  res.status(201).json({ message: "댓글을 생성하였습니다." });
});

//댓글 수정 API
router.put("/:_postId/comments/:_commentId", async (req, res) => {
  const { _commentId, _postId } = req.params;
  const { password, content } = req.body;

  //보여줄 값들만 1
  const comments = await Comments.find(
    {},
    { _id: 1, password: 1, content: 1, postId: 1 }
  );

  const resultPosts = comments.filter((postId) => postId.postId === _postId);
  //값들 중 _id와 _commentId값 비교해서 같은값 넣어줌
  const resultComments = resultPosts.filter(
    (comment) => String(comment._id) === _commentId
  );

  //_commentId값이 없어서 resultComments값이 없을 경우
  if (!resultComments.length) {
    return res.status(404).json({
      message: "댓글 조회에 실패하였습니다.",
    });
  } else if (!password) {
    //입력한 값들 중 하나라도 값이 없을 경우
    return res.status(400).json({
      message: "데이터 형식이 올바르지 않습니다.",
    });
  } else if (!content) {
    //content값을 입력하지 않았을 경우
    return res.status(400).json({ message: "댓글 내용을 입력해주세요." });
  }

  // 수정한 댓글 업데이트
  await Comments.updateOne(
    { _id: _commentId },
    {
      $set: {
        password: password,
        content: content,
      },
    }
  );
  res.status(201).json({ message: "댓글을 수정하였습니다." });
});

//댓글 삭제 API
router.delete("/:_postId/comments/:_commentId", async (req, res) => {
  const { _commentId } = req.params;
  const { password } = req.body;

  //보여줄 값들만 1
  const comments = await Comments.find({}, { _id: 1, password: 1 });

  //값들 중 _id와 _commentId값 비교해서 같은값 넣어줌
  const resultComments = comments.filter(
    (comment) => String(comment._id) === _commentId
  );

  //_commentId값과 같은 값이 없을 경우
  if (!resultComments.length) {
    return res.status(404).json({ message: "댓글 조회에 실패하였습니다." });
  } else if (!password || password !== resultComments[0].password) {
    //입력받아야할 password값이 없거나, 저장된 password와 같지않을 경우
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
  //password값이 일치할 경우 삭제
  await Comments.deleteOne({ _id: _commentId });
  return res.json({ message: "댓글을 삭제하였습니다." });
});

module.exports = router;
