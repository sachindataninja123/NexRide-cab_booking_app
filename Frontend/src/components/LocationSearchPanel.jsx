import React from "react";
import { MdLocationPin } from "react-icons/md";

const LocationSearchPanel = ({
  setVehiclePanelOpen,
  setPanelOpen,
  suggestions,
  setPickup,
  setDestination,
  activeField,
  setDestinationData,
  setPickupData,
}) => {
  // const handleSuggestionClick = (suggestion) => {
  //   if (activeField === "pickup") {
  //     setPickup(suggestion);
  //   } else if (activeField === "destination") {
  //     setDestination(suggestion);
  //   }
  //   // setVehiclePanel(true)
  //   // setPanelOpen(false)
  // };

  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.display_name);

      setPickupData({
        address: suggestion.display_name,
        lat: suggestion.lat,
        lng: suggestion.lng,
      });
    }

    if (activeField === "destination") {
      setDestination(suggestion.display_name);

      setDestinationData({
        address: suggestion.display_name,
        lat: suggestion.lat,
        lng: suggestion.lng,
      });
    }
  };

  return (
    <div className="space-y-0.5">
      <div className="flex items-start justify-center flex-col gap-2  rounded-lg hover:bg-gray-100 cursor-pointer transition">
        {suggestions.map((location, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(location)}
            className="flex gap-2 border border-gray-100 p-2 rounded-md"
          >
            <div className="bg-gray-200 h-5 w-5 flex items-center justify-center rounded-full shrink-0">
              <MdLocationPin />
            </div>

            <h4 className="text-sm font-medium">{location.display_name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
