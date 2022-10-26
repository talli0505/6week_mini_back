const UserService = require("../services/users");
const jwt = require("jsonwebtoken");
const MUST_NICKNAME = /^[a-zA-Z0-9]{3,}$/;
const STRONG_PASSWORD =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/;
const EMAIL_VALIDATION =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*[.][a-zA-Z]{2,3}$/i;

class UsersController {

  // 새 인스턴스 생성
  userService = new UserService();

  // 회원가입 입력받는 부분
  createUserAccount = async (req, res, next) => {

    // 입력 값 받아오기
    const { email, nickname, password, confirmPassword } = req.body;

    // usersService 안에 있는 findUserAccount 함수를 이용해서 선언
    const isSameUser = await this.userService.findUserAccount(email, nickname);

    // 이메일 적합성 검사
    if (email.search(EMAIL_VALIDATION) === -1)
      return res
        .status(400)
        .send({ errorMessage: "잘못된 이메일 형식 입니다" });
    
    // 유저 중복 검사
    if (isSameUser)
      return res
        .status(400)
        .send({ errorMessage: "이미 가입된 이메일 또는 닉네임 입니다" });
    
    // 패스워드 닉네임 중복 여부
    if (password.includes(nickname) === true)
      return res
        .status(400)
        .send({ errorMessage: "닉네임에는 이메일을 포함할 수 없습니다" });

    // 닉네임 적합성 검사
    if (nickname.search(MUST_NICKNAME) === -1)
      return res.status(400).send({
        errorMessage: "닉네임은 `최소 3자 이상, 특수 문자를 포함하면 안됩니다`",
      });

    // 패스워드와 이메일 중복 여부
    if (password === email)
      return res
        .status(400)
        .send({ errorMessage: "이메일과 비밀번호는 달라야합니다" });
      
    // 패스워드 적합성 검사
    if (password.search(STRONG_PASSWORD) === -1)
      return res.status(400).send({
        errorMessage:
          "비밀번호는 최소 4글자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9), 특수문자`를 포함해야 합니다",
      });

    // 패스워드 재확인
    if (password !== confirmPassword)
      return res
        .status(400)
        .send({ errorMessage: "비밀번호가 일치하지 않습니다" });
      
    // usersService 안에 있는 createAccount 함수를 이용해서 선언
    const createUserData = await this.userService.createAccount(
      email,
      nickname,
      password
    );

    res.json({ data: createUserData });
  };

  // 로그인 시 입력받는 부분
  login = async (req, res, next) => {
    // 입력 값 받아오기
    const { email, password } = req.body;

    // usersService 안에 있는 login 함수를 이용해서 선언
    const login = await this.userService.login(email, password);

    if (login === null)
      return res
        .status(404)
        .send({ errorMessage: "가입 정보를 찾을 수 없습니다" });

    // accessToken 발급
    const accessToken  = jwt.sign(
      { userId: login.userId }, 
      process.env.JWT_SECRET_KEY, 
      {expiresIn: "15s"}
      );
    
    // refreshToken 발급
    const refreshToken  = jwt.sign(
      { userId: login.userId }, 
      process.env.JWT_SECRET_KEY, 
      {expiresIn: "1d"}
      );

    // refreshToken 쿠키에 전달
    console.log(res.cookie('refreshToken', refreshToken));

    // accessToken body로 전달
    return res.json({
      token: accessToken,
      userNickname: login.nickname
      });
    
  };

  logout = async (req, res) => {
    
  }
}

module.exports = UsersController;