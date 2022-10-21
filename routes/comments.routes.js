const express = require("express");
const authMiddleware = require("../middlewares/auth-middlewares");
const router = express.Router();
Commentscontroller = require("../controllers/comments");
commentscontroller = new Commentscontroller();

//코멘트 작성
router.post("/:postId", commentscontroller.createComment);
//코멘트 리스트
router.get("/:postId", commentscontroller.Commentlist);
//코멘트 수정
router.put("/:commentId", commentscontroller.Commentedit);
//코멘트 삭제
router.delete("/:commentId", commentscontroller.Commentdelete);

module.exports = router;
