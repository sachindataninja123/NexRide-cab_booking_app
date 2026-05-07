const express = require("express");
const { isAuth } = require("../middlewares/auth.middleware");
const { getCoordinates } = require("../controllers/maps.controller");
const { query } = require("express-validator");

const mapsRouter = express.Router();

mapsRouter.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  isAuth,
  getCoordinates,
);

module.exports = mapsRouter;
