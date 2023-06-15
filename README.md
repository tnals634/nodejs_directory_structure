# 노드입문주차 1 개인 과제
- ## 게시글 CRUD, 댓글 CRUD

##API 상세서
- 내주신 API를 토대로 만들었습니다.<br>

| 기능 | API URL | Method | request | response | response(err) |
| --- | --- | --- | --- | --- | --- |
| 게시글 작성 | /posts | POST | {  "user": "Developer",  "password": "1234",  "title": "안녕하세요", "content": "안녕하세요 content 입니다."} | { "message": "게시글을 생성하였습니다."} | # 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' }
| 게시글 조회 | /posts | GET |  | {  "data": [    {      "postId": 62d6d12cd88cadd496a9e54e",     "user": "Developer",      "title": "안녕하세요",      "createdAt": "2022-07-19T15:43:40.266Z"     }  ] }
| 게시글 상세 조회 | /posts/:_postId | GET |  | {  "data": {    "postId": "62d6cb83bb5a517ef2eb83cb",   "user": "Developer",    "title": "안녕하세요",    "content": "안녕하세요 content 입니다.",    "createdAt": "2022-07-19T15:19:31.730Z"  }} | # 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' } |
| 게시글 수정 | /posts/:_postId | PUT | {  "password": "1234",  "title": "안녕하세요2", "content": "안녕하세요 content 입니다."} | {  "message": "게시글을 수정하였습니다."} | # 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' } # 404 _postId에 해당하는 게시글이 존재하지 않을 경우 { message: '게시글 조회에 실패하였습니다.' } |
| 게시글 삭제 | /posts/:_postId | DELETE | {  "password": "1234"} | {  "message": "게시글을 삭제하였습니다."} | # 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' } # 404 _postId에 해당하는 게시글이 존재하지 않을 경우 { message: '게시글 조회에 실패하였습니다.' } |
| 댓글 생성 | /posts/:_postId/comments | POST | { "user": "Developer",  "password": "1234",  "content": "안녕하세요 댓글입니다."} | {  "message": "댓글을 생성하였습니다."} | # 400 body의 content를 입력받지 못한 경우 { message: '댓글 내용을 입력해주세요.' } # 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' } |
| 댓글 목록 조회 |  /posts/:_postId/comments | GET |  | {  "data": [    {      "commentId": "62d6d3fd30b5ca5442641b94",     "user": "Developer",      "content": "수정된 댓글입니다.",      "createdAt": "2022-07-19T15:55:41.490Z"   }  ] } | # 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' } |
| 댓글 수정 | /posts/:_postId/comments/:_commentId | PUT | { "password": "1234",  "content": "수정된 댓글입니다." } | {  "message": "댓글을 수정하였습니다."} | # 400 body의 content를 입력받지 못한 경우 { message: '댓글 내용을 입력해주세요.' } # 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' } # 404 _commentId에 해당하는 댓글이 존재하지 않을 경우 { message: '댓글 조회에 실패하였습니다. } |
| 댓글 삭제 | /posts/:_postId/comments/:_commentId | DELETE | { "password": "1234"} | {  "message": "댓글을 삭제하였습니다."} | # 400 body 또는 params를 입력받지 못한 경우 { message: '데이터 형식이 올바르지 않습니다.' } # 404 _commentId에 해당하는 댓글이 존재하지 않을 경우 { message: '댓글 조회에 실패하였습니다. } |
