const { validationResult } = require("express-validator");
const { createRide } = require("../services/ride.service");

const createRideController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    return res.status(201).json(ride);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { createRideController };
