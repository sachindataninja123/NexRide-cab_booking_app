// const axios = require("axios");
// const config = require("../config/config");

// const getAddressCoordinate = async (address) => {
//   const apiKey = config.GOOGLE_MAPS_KEY;
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

//   console.log(apiKey)
//   console.log(address)

//   try {
//     const response = await axios.get(url);
//     if (response.data.status === "OK") {
//       const location = response.data.results[0].geometry.location;
//       return {
//         ltd: location.lat,
//         lng: location.lng,
//       };
//     } else {
//       throw new Error("Unable to fetch coordinates");
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// module.exports = { getAddressCoordinate };

const axios = require("axios");

const nominatimClient = axios.create({
  baseURL: "https://nominatim.openstreetmap.org",
  headers: { "User-Agent": "NexRide/1.0" },
});

const photonClient = axios.create({
  baseURL: "https://photon.komoot.io",
  headers: { "User-Agent": "NexRide/1.0" },
});

const getAddressCoordinate = async (address) => {
  try {
    console.log("Trying Nominatim for:", address);
    const nominatimRes = await nominatimClient.get("/search", {
      params: { q: address, format: "json", limit: 1, countrycodes: "in" },
    });

    if (nominatimRes.data && nominatimRes.data.length > 0) {
      //   console.log("✅ Found via Nominatim");
      return {
        ltd: parseFloat(nominatimRes.data[0].lat),
        lng: parseFloat(nominatimRes.data[0].lon),
      };
    }

    console.log("Nominatim empty, trying Photon...");
    const photonRes = await photonClient.get("/api", {
      params: { q: address, limit: 1, lang: "en" },
    });

    if (photonRes.data?.features?.length > 0) {
      //   console.log("✅ Found via Photon");
      const coords = photonRes.data.features[0].geometry.coordinates;
      return { ltd: coords[1], lng: coords[0] };
    }

    throw new Error("No results found for the given address");
  } catch (error) {
    console.error("Geocoding error:", error.message);
    throw error;
  }
};

const getAddressFromCoordinates = async (ltd, lng) => {
  try {
    const response = await nominatimClient.get("/reverse", {
      params: { lat: ltd, lon: lng, format: "json" },
    });

    if (!response.data?.display_name) {
      throw new Error("No address found for the given coordinates");
    }

    return {
      address: response.data.display_name,
      details: {
        road: response.data.address.road || null,
        city:
          response.data.address.city ||
          response.data.address.town ||
          response.data.address.village ||
          null,
        state: response.data.address.state || null,
        country: response.data.address.country || null,
        postcode: response.data.address.postcode || null,
      },
    };
  } catch (error) {
    console.error("Reverse geocoding error:", error.message);
    throw error;
  }
};

const getDistanceAndDuration = async (origin, destination) => {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.ltd};${destination.lng},${destination.ltd}`;
    const response = await axios.get(url, { params: { overview: "false" } });

    if (!response.data.routes?.length) {
      throw new Error("No route found between the given locations");
    }

    const route = response.data.routes[0];
    return {
      distance: {
        value: route.distance,
        text: `${(route.distance / 1000).toFixed(1)} km`,
      },
      duration: {
        value: route.duration,
        text: `${Math.ceil(route.duration / 60)} mins`,
      },
    };
  } catch (error) {
    console.error("Distance calculation error:", error.message);
    throw error;
  }
};

const getAddressSuggestions = async (input) => {
  try {
    const response = await photonClient.get("/api", {
      params: { q: input, limit: 5, lang: "en" },
    });

    if (!response.data?.features) return [];

    return response.data.features.map((place) => ({
      display_name:
        place.properties.name +
        (place.properties.city ? `, ${place.properties.city}` : "") +
        (place.properties.state ? `, ${place.properties.state}` : ""),
      ltd: place.geometry.coordinates[1],
      lng: place.geometry.coordinates[0],
      type: place.properties.type || null,
    }));
  } catch (error) {
    console.error("Suggestions error:", error.message);
    throw error;
  }
};

module.exports = {
  getAddressCoordinate,
  getAddressFromCoordinates,
  getDistanceAndDuration,
  getAddressSuggestions,
};
