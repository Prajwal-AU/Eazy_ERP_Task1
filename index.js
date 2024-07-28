require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const router = require("./controller/crud");
const auth = require("./controller/auth");
app.use("/api", router);
app.use("/auth", auth);

const port = 8080;

app.listen(port, () => {
  console.log(`Listening on ${port} with process id ${process.pid}`);
});
