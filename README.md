# 노드입문주차 1 개인 과제
- ## 게시글 CRUD, 댓글 CRUD

##API 상세서
- 내주신 API를 토대로 만들었습니다.<br>
| Aa 기능 | API URL | Method | request | response | response(error) |
| --- | --- | --- | --- | --- | --- |
| 게시글 작성 | /posts | POST | { "user":"Develpoer","password":"1234","title":"hi","content":"content입니다."} | {"message":"게시글을 생성하였습니다."} | /400 body 또는 params를 입력받지 못한 경우,{"message":"데이터 형식이 올바르지 않습니다."} |
| 게시글 조회 | /posts | GET | 1 | 2 | 3 |
| 게시글 상세 조회 | /posts/:postId | GET | 1 | 2 | 3 |
| 게시글 수정 | /posts/:postId | PUT | 1 | 2 | 3 |
| 게시글 삭제 | /posts/:postId | DELETE | 1 | 2 | 3 |
|  |  |  |  |  |  |
| 댓글 생성 | /posts/:postId/comments | POST | 1 | 2 | 3 |
| 댓글 목록 조회 | /posts/:postId/comments | GET | 1 | 2 | 3 |
| 댓글 수정 | /posts/:postId/comments/:commentId | PUT | 1 | 2 | 3 |
| 댓글 삭제 | /posts/:postId/comments/:commentId | DELETE | 1 | 2 | 3 |
