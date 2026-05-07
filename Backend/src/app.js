const express = require("express");
const cors = require("cors");
const userRouter = require("../routes/user.routes");
const cookieParser = require("cookie-parser");
const captainRouter = require("../routes/captain.routes");
const mapsRouter = require("../routes/maps.routes");
const rideRouter = require("../routes/ride.routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("server is starting");
});

app.use("/user", userRouter);
app.use("/captains", captainRouter);
app.use("/maps", mapsRouter);
app.use("/rides", rideRouter);

module.exports = app;
