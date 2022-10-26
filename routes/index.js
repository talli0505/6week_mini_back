const express = require("express");
const router = express.Router();

const usersRouter = require("./users.routes");
const comments = require("./comments.routes");
const postRouter = require('./posts.routes');

// 회원가입, 로그인
router.use("/users", usersRouter);

// 댓글
router.use("/comments", comments);

// 게시글
router.use('/posts', postRouter);

module.exports = router;