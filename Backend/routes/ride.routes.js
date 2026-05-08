const express = require("express");
const { body, query } = require("express-validator");

const {
  createRideController,
  getFare,
  confirmRideController,
  startRide,
  endRide,
} = require("../controllers/ride.controller");

const { isAuth, isCaptainAuth } = require("../middlewares/auth.middleware");

const rideRouter = express.Router();

rideRouter.post(
  "/create",

  isAuth,

  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Pickup address"),

  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),

  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "moto"])
    .withMessage("Invalid vehicle type"),

  createRideController,
);

rideRouter.get(
  "/get-fare",
  isAuth,
  query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid pickup"),

  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination"),

  getFare,
);

rideRouter.post(
  "/confirm",
  isCaptainAuth,
  body("rideId").isMongoId().withMessage("Invalid ride Id"),
  confirmRideController,
);

rideRouter.get(
  "/start-ride",
  isCaptainAuth,
  query("rideId").isMongoId().withMessage("Invalid ride id"),
  query("otp")
    .isString()
    .isLength({ min: 6, max: 6 })
    .withMessage("Invalid OTP"),
  startRide,
);

rideRouter.post(
  "/end-ride",
  isCaptainAuth,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  endRide,
);

module.exports = rideRouter;
