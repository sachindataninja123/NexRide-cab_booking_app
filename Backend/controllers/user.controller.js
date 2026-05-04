const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");

const registerController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        message: "User Already Exists!",
      });
    }

    const user = await userModel.create({
      firstname,
      lastname,
      email,
      password,
    });

    user.password = await user.hashPassword(password);

    await user.save();

    const token = user.generateAuthToken();

    return res.status(201).json({
      message: "User Created successfully",
      user: {
        name: user.firstname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error:", error.message);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

const loginController = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and passwords are required!",
      });
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid email & password!",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email & password!",
      });
    }

    const token = user.generateAuthToken();

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        name: user.firstname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error:", error.message);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};



module.exports = { registerController, loginController };
