const express = require("express");
const { body } = require("express-validator");

const { createRideController } = require("../controllers/ride.controller");

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

module.exports = rideRouter;
