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

//게시글 목록 조회 API
router.get("/posts", async (req, res) => {
  //보여줄 값들만 1
  const posts = await Posts.find(
    {},
    { _id: 1, user: 1, title: 1, createdAt: 1 }
  );

  //값들 중 _id 이름만 postId로 변경
  const data = posts.map((post) => {
    let postData = {};
    postData["postId"] = String(post._id);
    postData["user"] = post.user;
    postData["title"] = post.title;
    postData["createdAt"] = post.createdAt;
    return postData;
  });
  console.log(data);
  res.json({ data });
});

//게시글 상세 조회 API
router.get("/posts/:_postId", async (req, res) => {
  const { _postId } = req.params;

  //보여줄 값들만 1
  const posts = await Posts.find(
    {},
    { _id: 1, user: 1, title: 1, content: 1, createdAt: 1 }
  );

  //값들 중 _id 이름만 postId로 변경
  const resultPosts = posts.map(
    ({ _id: postId, user, title, content, createdAt }) => ({
      postId,
      user,
      title,
      content,
      createdAt,
    })
  );

  //위 params로 받은 값과 저장된 값들 중 _id값이 같은게 있는지 확인
  const [data] = resultPosts.filter((post) => String(post.postId) === _postId);

  //data 값이 없으면 if문 충족
  if (!data) {
    return res.status(400).json({
      message: "데이터 형식이 올바르지 않습니다.",
    });
  }
  res.json({ data });
});

//게시글 생성 API
router.post("/posts", async (req, res) => {
  //유저이름,비밀번호,제목,내용을 적음
  const { user, password, title, content } = req.body;

  //저장할때 날짜도 같이 저장
  const createDate = new Date();

  //적은 내용 중 값이 없을 경우 if문 충족
  if (!user || !password || !title || !content) {
    return res.status(400).json({
      message: "데이터 형식이 올바르지 않습니다.",
    });
  }

  //적은 내용을 토대로 게시글 생성
  await Posts.create({
    user,
    password,
    title,
    content,
    createdAt: createDate,
  });

  res.json({ message: "게시글을 생성하였습니다." });
});

//게시글 수정 API
router.put("/posts/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { user, password, title, content } = req.body;

  //보여줄 값들만 1
  const posts = await Posts.find(
    {},
    { _id: 1, user: 1, password: 1, title: 1, content: 1 }
  );

  //값들 중 _id와 _postId값 비교해서 같은값 넣어줌
  const existsPosts = posts.filter((post) => String(post._id) === _postId);

  //_postId값이 없어서 existsPosts값이 없을 경우
  if (!existsPosts.length) {
    return res.status(404).json({
      message: "게시글 조회에 실패하였습니다.",
    });
  } else if (!user || !password || !title || !content) {
    //입력한 값들 중 하나라도 값이 없을 경우
    return res.status(400).json({
      message: "데이터 형식이 올바르지 않습니다.",
    });
  }

  // 수정해서 저자해줌
  await Posts.updateOne(
    { _id: _postId },
    {
      $set: {
        user: user,
        password: password,
        title: title,
        content: content,
      },
    }
  );
  res.json({ message: "게시글을 수정하였습니다." });
});

//게시글 삭제 API
router.delete("/posts/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { password } = req.body;

  //보여줄 값들만 1
  const posts = await Posts.find({}, { _id: 1, password: 1 });

  //값들 중 _id와 _postId값 비교해서 같은값 넣어줌
  const existsPosts = posts.filter((post) => String(post._id) === _postId);

  //_postId값과 일치하는게 없어서 existsPosts값이 없을경우
  if (!existsPosts.length) {
    return res.status(404).json({ message: "게시글 조회에 실패하였습니다." });
  } else if (!password || password != existsPosts[0].password) {
    //password를 입력하지않았거나 저장된 password와 값이 다를경우
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
  //입력한 password값이 저장된 password값과 같을 경우 삭제
  await Posts.deleteOne({ _id: _postId });
  return res.json({ message: "게시글을 삭제하였습니다." });
});
module.exports = router;
