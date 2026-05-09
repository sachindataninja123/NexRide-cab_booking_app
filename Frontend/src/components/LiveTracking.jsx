import React, { useState, useEffect } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "100%" };
const defaultCenter = { lat: -3.745, lng: -38.523 };

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);

  useEffect(() => {
    // Get initial position
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCurrentPosition({ lat: coords.latitude, lng: coords.longitude });
    });

    // Watch for changes (fires automatically on movement)
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        setCurrentPosition({ lat: coords.latitude, lng: coords.longitude });
      },
      (error) => console.error("Geolocation error:", error),
      { enableHighAccuracy: true, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId); // ✅ Cleanup
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
      >
        <Marker position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;