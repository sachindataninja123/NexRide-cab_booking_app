const express = require("express");
const {body} = require("express-validator");
const { registerCaptain } = require("../controllers/captain.controller");

const captainRouter = express.Router();

captainRouter.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Firstname must be at least 3 characters long")
      .trim(),

    body("fullname.lastname")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Lastname must be at least 3 characters long")
      .trim(),

    // Email
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),

    // Password
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    // Vehicle
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),

    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),

    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),

    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  registerCaptain,
);

module.exports = captainRouter;
