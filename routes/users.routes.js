const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const usersController = new UsersController();

const middleware = require('../middlewares/auth-middlewares')

// 회원가입
router.post("/", usersController.createUserAccount);

 // 로그인
router.post("/login", usersController.login);

module.exports = router;