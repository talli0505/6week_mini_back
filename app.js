const dotenv = require("dotenv");
const express = require("express");
const router = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");

dotenv.config();
const app = express();
app.use(express.json());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//cors 미들웨어 사용
const cors = require("cors");
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

app.use(router);

app.listen(4000, () => {
  console.log(4000, "포트로 서버가 열림");
});