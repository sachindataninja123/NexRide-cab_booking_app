const express = require("express");
const { body, query } = require("express-validator");

const {
  createRideController,
  getFare,
} = require("../controllers/ride.controller");

const { isAuth } = require("../middlewares/auth.middleware");

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

module.exports = rideRouter;
