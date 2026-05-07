const { getAddressCoordinate } = require("../services/maps.service");
const { validationResult } = require("express-validator");

const getCoordinates = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    const coordinates = await getAddressCoordinate(address);
    return res.status(200).json(coordinates);
  } catch (error) {
    return res.status(404).json({
      message: "Coordinates not found",
      error: error.message,
    });
  }
};

module.exports = { getCoordinates };
