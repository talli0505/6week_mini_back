const dotenv = require("dotenv");
const express = require("express");
const router = require('./routes');

dotenv.config();
const app = express();
app.use(express.json());

app.use(router);


app.listen(4000, () => {
    console.log(4000, "포트로 서버가 열림");
})

