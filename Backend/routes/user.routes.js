const express = require("express");
const { body } = require("express-validator");
const {
  registerController,
  loginController,
  getUserProfile,
} = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/auth.middleware");
const userRouter = express.Router();

userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerController,
);

userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginController,
);

userRouter.get("/profile", isAuth, getUserProfile);

module.exports = userRouter;
