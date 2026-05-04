const captainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");

const registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      fullname: { firstname, lastname },
      email,
      password,
      vehicle: { color, plate, capacity, vehicleType },
    } = req.body;

    if (
      !firstname ||
      !email ||
      !password ||
      !color ||
      !plate ||
      !capacity ||
      !vehicleType
    ) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const existUser = await captainModel.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        message: "Captain Already Exists!",
      });
    }

    const captain = await captainModel({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    });

    captain.password = await captain.hashPassword(password);

    await captain.save();

    const token = captain.generateAuthToken();

    return res.status(201).json({
      message: "Captain Created successfully",
      captain,
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

module.exports = { registerCaptain };
