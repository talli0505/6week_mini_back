const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(" ");
  if (tokenType !== "Bearer") {
    res.status(401).send({ errorMessage: "로그인 후 이용 가능한 기능입니다" });
    return;
  }
  try {
    const { userId } = jwt.verify(tokenValue, process.env.JWT_SECRET_KEY);
    User.findByPk(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (error) {
    res.status(401).send({ errorMessage: "로그인 후 이용 가능한 기능입니다." });
    return;
  }
};