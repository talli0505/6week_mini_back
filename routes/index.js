const express = require('express');
const router = express.Router();

const usersRouter = require('./users.routes');

router.use('/users', usersRouter); // 회원가입, 로그인

module.exports = router;