const express = require("express");
const cors = require("cors");
const userRouter = require("../routes/user.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is starting");
});

app.use("/user", userRouter);

module.exports = app;
