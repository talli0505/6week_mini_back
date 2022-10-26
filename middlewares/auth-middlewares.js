const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { refreshToken } = req.cookies;
  
  const [tokenType, tokenValue] = authorization.split(" ");
  if (tokenType !== "Bearer" || refreshToken === null ) {
    res.status(403).send({ errorMessage: "로그인 후 이용 가능한 기능입니다" });
    return;
  }

  try {
    const { userId } = jwt.verify(tokenValue, process.env.JWT_SECRET_KEY);
    User.findByPk(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    // 그냥 에세스 토큰이 만료된 것일 수도 있잖아? 리프레쉬 토큰을 이용해 로그인 상태를 유지할건지 확인하자
    // 리프레쉬 토큰이 만료되었는지 부터 확인
    if ( validateRefreshToken(refreshToken) === false ) {
      res.status(401).send({ errorMessage: "로그인 후 이용 가능한 기능입니다." });
      return;
    }
    // 만료 안되었으면 그걸로 사용자 정보 찾아서 넘겨준다
    const { userId } = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    User.findByPk(userId).then((user) => {
      res.locals.user = user;
      next();
    }) 
  }
};

// RefreshToken 유효성 검증
function validateRefreshToken(refreshToken) {
  try {
    jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
}

