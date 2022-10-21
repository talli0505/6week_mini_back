const UserService = require("../services/users");
const jwt = require("jsonwebtoken");
const must_nickname = /^[a-zA-Z0-9]{3,}$/;
const strongPasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/;

class UsersController {
  userService = new UserService();

  createUserAccount = async (req, res, next) => {
    const { email, nickname, password, confirmPassword } = req.body;
    const isSameUser = await this.userService.findUserAccount(email, nickname);

    if (isSameUser)
      return res
        .status(400)
        .send({ errorMessage: "이미 가입된 이메일 또는 닉네임 입니다" });
    if (nickname.search(must_nickname) === -1)
      return res
        .status(400)
        .send({
          errorMessage:
            "닉네임은 `최소 3자 이상, 특수 문자를 포함하면 안됩니다`",
        });
    if (password.search(strongPasswordRegex) === -1)
      return res
        .status(400)
        .send({
          errorMessage:
            "비밀번호는 최소 4글자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9), 특수문자`를 포함해야 합니다",
        });
    if (password !== confirmPassword)
      return res
        .status(400)
        .send({ errorMessage: "비밀번호가 일치하지 않습니다" });

    const createUserData = await this.userService.createAccount(
      email,
      nickname,
      password
    );
    res.json({ data: createUserData });
  };

  login = async (req, res, next) => {
    const { email, password } = req.body;
    const login = await this.userService.login(email, password);
    if (login === null)
      return res
        .status(404)
        .send({ errorMessage: "가입 정보를 찾을 수 없습니다" });
    return res.json({
      token: jwt.sign({ userId: login.userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30m",
      }),
    });
  };
}

module.exports = UsersController;
