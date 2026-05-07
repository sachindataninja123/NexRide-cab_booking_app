const express = require("express");
const { isAuth } = require("../middlewares/auth.middleware");
const {
  getCoordinates,
  getDistanceAndTime,
  getAutoCompleteSuggestions,
} = require("../controllers/maps.controller");
const { query } = require("express-validator");

const mapsRouter = express.Router();

mapsRouter.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  isAuth,
  getCoordinates,
);

mapsRouter.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  isAuth,
  getDistanceAndTime,
);

mapsRouter.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  isAuth,
  getAutoCompleteSuggestions,
);

module.exports = mapsRouter;
