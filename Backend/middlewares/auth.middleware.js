const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const userModel = require("../models/user.model");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized , Token is missing!",
      });
    }
    const isBlackListed = await blacklistTokenModel.findOne({ token: token });

    if (isBlackListed) {
      return res.status(401).json({
        message: "Unauthorized , Token is missing!",
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded._id);

    req.user = user;

    return next();
  } catch (error) {
    console.error("Error:", error.message);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const isCaptainAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({
        message: "Token is missing",
      });
    }
    const isBlackListed = await blacklistTokenModel.findOne({
      token,
    });

    if (isBlackListed) {
      return res.status(401).json({
        message: "Unauthorized , Token expired!",
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);

    req.captain = captain;

    return next();
  } catch (error) {
    console.error("Error:", error.message);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

module.exports = { isAuth, isCaptainAuth };
