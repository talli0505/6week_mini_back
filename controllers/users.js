const UserService = require("../services/users");
const jwt = require("jsonwebtoken");
const MUST_NICKNAME = /^[a-zA-Z0-9]{3,}$/;
const STRONG_PASSWORD =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/;
const EMAIL_VALIDATION =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.][a-zA-Z]{2,3}$/i;

class UsersController {
  userService = new UserService();

  createUserAccount = async (req, res, next) => {
    const { email, nickname, password, confirmPassword } = req.body;
    const isSameUser = await this.userService.findUserAccount(email, nickname);

    if (email.search(EMAIL_VALIDATION) === -1)
      return res
        .status(400)
        .send({ errorMessage: "잘못된 이메일 형식 입니다" });
    if (isSameUser)
      return res
        .status(400)
        .send({ errorMessage: "이미 가입된 이메일 또는 닉네임 입니다" });
    if (password.includes(nickname) === true)
      return res
        .status(400)
        .send({ errorMessage: "닉네임에는 이메일을 포함할 수 없습니다" });
    if (nickname.search(MUST_NICKNAME) === -1)
      return res.status(400).send({
        errorMessage: "닉네임은 `최소 3자 이상, 특수 문자를 포함하면 안됩니다`",
      });
    if (password === email)
      return res
        .status(400)
        .send({ errorMessage: "이메일과 비밀번호는 달라야합니다" });
    if (password.search(STRONG_PASSWORD) === -1)
      return res.status(400).send({
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

    // 유저 정보가 확인되면 토큰 2개 발급
    const accessToken  = jwt.sign(
      { userId: login.userId }, 
      process.env.JWT_SECRET_KEY, 
      {expiresIn: "15s"}
      );

    const refreshToken  = jwt.sign(
      { userId: login.userId }, 
      process.env.JWT_SECRET_KEY, 
      {expiresIn: "1d"}
      );

    // refreshToken 쿠키에 전달
    console.log(res.cookie('refreshToken', refreshToken));

      
    return res.json({ // accessToken body로 전달
      token: accessToken,
      userNickname : login.nickname,
      });
  };

  logout = async (req, res) => {
    
  }
}

module.exports = UsersController;