// const axios = require("axios");

// const nominatimClient = axios.create({
//   baseURL: "https://nominatim.openstreetmap.org",
//   headers: { "User-Agent": "NexRide/1.0" },
// });

// const photonClient = axios.create({
//   baseURL: "https://photon.komoot.io",
//   headers: { "User-Agent": "NexRide/1.0" },
// });

// const getAddressCoordinate = async (address) => {
//   try {
//     console.log("Trying Nominatim for:", address);
//     const nominatimRes = await nominatimClient.get("/search", {
//       params: { q: address, format: "json", limit: 1, countrycodes: "in" },
//     });

//     if (nominatimRes.data && nominatimRes.data.length > 0) {
//       //   console.log("✅ Found via Nominatim");
//       return {
//         ltd: parseFloat(nominatimRes.data[0].lat),
//         lng: parseFloat(nominatimRes.data[0].lon),
//       };
//     }

//     console.log("Nominatim empty, trying Photon...");
//     const photonRes = await photonClient.get("/api", {
//       params: { q: address, limit: 1, lang: "en" },
//     });

//     if (photonRes.data?.features?.length > 0) {
//       //   console.log("✅ Found via Photon");
//       const coords = photonRes.data.features[0].geometry.coordinates;
//       return { ltd: coords[1], lng: coords[0] };
//     }

//     throw new Error("No results found for the given address");
//   } catch (error) {
//     console.error("Geocoding error:", error.message);
//     throw error;
//   }
// };

// const getAddressFromCoordinates = async (ltd, lng) => {
//   try {
//     const response = await nominatimClient.get("/reverse", {
//       params: { lat: ltd, lon: lng, format: "json" },
//     });

//     if (!response.data?.display_name) {
//       throw new Error("No address found for the given coordinates");
//     }

//     return {
//       address: response.data.display_name,
//       details: {
//         road: response.data.address.road || null,
//         city:
//           response.data.address.city ||
//           response.data.address.town ||
//           response.data.address.village ||
//           null,
//         state: response.data.address.state || null,
//         country: response.data.address.country || null,
//         postcode: response.data.address.postcode || null,
//       },
//     };
//   } catch (error) {
//     console.error("Reverse geocoding error:", error.message);
//     throw error;
//   }
// };

// const getDistanceAndDuration = async (origin, destination) => {
//   try {
//     const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.ltd};${destination.lng},${destination.ltd}`;
//     const response = await axios.get(url, { params: { overview: "false" } });

//     if (!response.data.routes?.length) {
//       throw new Error("No route found between the given locations");
//     }

//     const route = response.data.routes[0];
//     return {
//       distance: {
//         value: route.distance,
//         text: `${(route.distance / 1000).toFixed(1)} km`,
//       },
//       duration: {
//         value: route.duration,
//         text: `${Math.ceil(route.duration / 60)} mins`,
//       },
//     };
//   } catch (error) {
//     console.error("Distance calculation error:", error.message);
//     throw error;
//   }
// };

// const getAddressSuggestions = async (input) => {
//   try {
//     const response = await photonClient.get("/api", {
//       params: { q: input, limit: 5, lang: "en" },
//     });

//     if (!response.data?.features) return [];

//     return response.data.features.map((place) => {
//       const p = place.properties;

//       // Build terms array like Google Places API
//       const termParts = [
//         p.name,
//         p.street,
//         p.district,
//         p.city || p.town || p.village,
//         p.county,
//         p.state,
//         p.country,
//       ].filter(Boolean); // remove null/undefined parts

//       const display_name = termParts.join(", ");

//       const terms = termParts.map((value, index) => ({
//         offset: index,
//         value,
//       }));

//       return {
//         display_name,
//         terms,
//         ltd: place.geometry.coordinates[1],
//         lng: place.geometry.coordinates[0],
//         type: p.type || p.osm_value || null,
//         details: {
//           name: p.name || null,
//           street: p.street || null,
//           district: p.district || null,
//           city: p.city || p.town || p.village || null,
//           county: p.county || null,
//           state: p.state || null,
//           country: p.country || null,
//           postcode: p.postcode || null,
//           osm_id: p.osm_id || null,
//         },
//       };
//     });
//   } catch (error) {
//     console.error("Suggestions error:", error.message);
//     throw error;
//   }
// };

// module.exports = {
//   getAddressCoordinate,
//   getAddressFromCoordinates,
//   getDistanceAndDuration,
//   getAddressSuggestions,
// };


const axios = require("axios");

/* =========================
   AXIOS CLIENTS
========================= */

const nominatimClient = axios.create({
  baseURL: "https://nominatim.openstreetmap.org",
  headers: {
    "User-Agent": "NexRide/1.0",
  },
});

const photonClient = axios.create({
  baseURL: "https://photon.komoot.io",
  headers: {
    "User-Agent": "NexRide/1.0",
  },
});

/* =========================
   GET COORDINATES FROM ADDRESS
========================= */

const getAddressCoordinate = async (address) => {
  try {
    if (!address) {
      throw new Error("Address is required");
    }

    console.log("Searching address:", address);

    // Try Nominatim first
    const nominatimRes = await nominatimClient.get(
      "/search",
      {
        params: {
          q: address,
          format: "json",
          limit: 1,
          countrycodes: "in",
        },
      }
    );

    if (
      nominatimRes.data &&
      nominatimRes.data.length > 0
    ) {
      return {
        lat: parseFloat(
          nominatimRes.data[0].lat
        ),
        lng: parseFloat(
          nominatimRes.data[0].lon
        ),
      };
    }

    console.log(
      "Nominatim empty, trying Photon..."
    );

    // Fallback to Photon
    const photonRes = await photonClient.get(
      "/api",
      {
        params: {
          q: address,
          limit: 1,
          lang: "en",
        },
      }
    );

    if (
      photonRes.data?.features?.length > 0
    ) {
      const coords =
        photonRes.data.features[0].geometry
          .coordinates;

      return {
        lat: coords[1],
        lng: coords[0],
      };
    }

    throw new Error(
      "No coordinates found for this address"
    );
  } catch (error) {
    console.error(
      "Geocoding Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

/* =========================
   REVERSE GEOCODING
========================= */

const getAddressFromCoordinates = async (
  lat,
  lng
) => {
  try {
    if (!lat || !lng) {
      throw new Error(
        "Latitude and Longitude are required"
      );
    }

    const response =
      await nominatimClient.get("/reverse", {
        params: {
          lat,
          lon: lng,
          format: "json",
        },
      });

    if (!response.data?.display_name) {
      throw new Error(
        "No address found for these coordinates"
      );
    }

    return {
      address: response.data.display_name,

      details: {
        road:
          response.data.address?.road || null,

        city:
          response.data.address?.city ||
          response.data.address?.town ||
          response.data.address?.village ||
          null,

        state:
          response.data.address?.state || null,

        country:
          response.data.address?.country ||
          null,

        postcode:
          response.data.address?.postcode ||
          null,
      },
    };
  } catch (error) {
    console.error(
      "Reverse Geocoding Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

/* =========================
   DISTANCE + DURATION
========================= */

const getDistanceAndDuration = async (
  origin,
  destination
) => {
  try {
    if (!origin || !destination) {
      throw new Error(
        "Origin and destination are required"
      );
    }

    if (
      origin.lat === undefined ||
      origin.lng === undefined ||
      destination.lat === undefined ||
      destination.lng === undefined
    ) {
      throw new Error(
        "Invalid coordinates provided"
      );
    }

    console.log("Origin:", origin);
    console.log(
      "Destination:",
      destination
    );

    const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;

    const response = await axios.get(url, {
      params: {
        overview: "false",
      },
    });

    if (!response.data.routes?.length) {
      throw new Error(
        "No route found between locations"
      );
    }

    const route = response.data.routes[0];

    return {
      distance: {
        value: route.distance,
        text: `${(
          route.distance / 1000
        ).toFixed(1)} km`,
      },

      duration: {
        value: route.duration,
        text: `${Math.ceil(
          route.duration / 60
        )} mins`,
      },
    };
  } catch (error) {
    console.error(
      "Distance Calculation Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

/* =========================
   ADDRESS SUGGESTIONS
========================= */

const getAddressSuggestions = async (
  input
) => {
  try {
    if (!input) {
      return [];
    }

    const response = await photonClient.get(
      "/api",
      {
        params: {
          q: input,
          limit: 5,
          lang: "en",
        },
      }
    );

    if (!response.data?.features) {
      return [];
    }

    return response.data.features.map(
      (place) => {
        const p = place.properties;

        const termParts = [
          p.name,
          p.street,
          p.district,
          p.city ||
            p.town ||
            p.village,
          p.county,
          p.state,
          p.country,
        ].filter(Boolean);

        const display_name =
          termParts.join(", ");

        const terms = termParts.map(
          (value, index) => ({
            offset: index,
            value,
          })
        );

        return {
          display_name,

          terms,

          lat:
            place.geometry.coordinates[1],

          lng:
            place.geometry.coordinates[0],

          type:
            p.type ||
            p.osm_value ||
            null,

          details: {
            name: p.name || null,

            street:
              p.street || null,

            district:
              p.district || null,

            city:
              p.city ||
              p.town ||
              p.village ||
              null,

            county:
              p.county || null,

            state:
              p.state || null,

            country:
              p.country || null,

            postcode:
              p.postcode || null,

            osm_id:
              p.osm_id || null,
          },
        };
      }
    );
  } catch (error) {
    console.error(
      "Suggestions Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

module.exports = {
  getAddressCoordinate,
  getAddressFromCoordinates,
  getDistanceAndDuration,
  getAddressSuggestions,
};