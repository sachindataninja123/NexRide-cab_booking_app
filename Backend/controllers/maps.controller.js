const {
  getAddressCoordinate,
  getAddressSuggestions,
  getDistanceAndDuration,
} = require("../services/maps.service");
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

const getDistanceAndTime = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    // Step 1: Convert addresses to coordinates first
    const originCoords = await getAddressCoordinate(origin);
    const destinationCoords = await getAddressCoordinate(destination);

    // Step 2: Get distance using coordinates
    const distanceTime = await getDistanceAndDuration(originCoords, destinationCoords);

    return res.status(200).json(distanceTime);
  } catch (error) {
    return res.status(404).json({
      message: "Could not calculate distance",
      error: error.message,
    });
  }
};

const getAutoCompleteSuggestions = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    const suggestions = await getAddressSuggestions(input);

    res.status(200).json(suggestions);
  } catch (error) {
    return res.status(404).json({
      message: "get Address Suggestions Error",
      error: error.message,
    });
  }
};

module.exports = {
  getCoordinates,
  getDistanceAndTime,
  getAutoCompleteSuggestions,
};
