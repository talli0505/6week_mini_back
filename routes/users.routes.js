const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const usersController = new UsersController();

router.post("/", usersController.createUserAccount); // 회원가입
router.post("/login", usersController.login); // 로그인

module.exports = router;
