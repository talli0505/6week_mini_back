const express = require("express");
const authMiddleware = require("../middlewares/auth-middlewares");
const router = express.Router();
Commentscontroller = require("../controllers/comments");
commentscontroller = new Commentscontroller();

//코멘트 작성
router.post("/:postId", authMiddleware, commentscontroller.createComment);
//코멘트 리스트
router.get("/:postId", authMiddleware, commentscontroller.Commentlist);
//코멘트 수정
router.put("/:commentId", authMiddleware, commentscontroller.Commentedit);
//코멘트 삭제
router.delete("/:commentId", authMiddleware, commentscontroller.Commentdelete);

module.exports = router;
