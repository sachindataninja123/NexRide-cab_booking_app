const rideModel = require("../models/ride.model");

const {
  getDistanceAndDuration,
  getAddressCoordinate,
} = require("./maps.service");

function getOtp(num) {
  return Math.floor(Math.random() * Math.pow(10, num))
    .toString()
    .padStart(num, "0");
}

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  // Convert address -> coordinates
  const pickupCoordinates = await getAddressCoordinate(pickup);

  const destinationCoordinates = await getAddressCoordinate(destination);

  console.log("Pickup Coordinates:", pickupCoordinates);

  console.log("Destination Coordinates:", destinationCoordinates);

  // Get distance + duration
  const distanceTime = await getDistanceAndDuration(
    pickupCoordinates,
    destinationCoordinates,
  );
  
  const baseFare = {
    auto: 25,
    car: 40,
    moto: 15,
  };

  const perKmRate = {
    auto: 7,
    car: 10,
    moto: 5,
  };

  const perMinuteRate = {
    auto: 1,
    car: 1.5,
    moto: 0.8,
  };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto,
    ),

    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car,
    ),

    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto,
    ),
  };

  return fare;
}

const createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    vehicleType,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};

module.exports = {
  createRide,
};
