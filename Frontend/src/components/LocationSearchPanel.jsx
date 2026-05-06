import React from "react";
import { MdLocationPin } from "react-icons/md";

const LocationSearchPanel = ({ setVehiclePanelOpen, setPanelOpen }) => {
  const locations = [
    "45 Foot Road, Bharat Colony, Neharpar, Sector 87, Faridabad, Haryana",
    "Sector 15, Faridabad, Haryana",
    "NIT 1, Faridabad, Haryana",
    "Sector 21C, Faridabad, Haryana",
    "Ballabgarh, Faridabad, Haryana",
  ];

  return (
    <div className="space-y-0.5">
      <div className="flex items-start justify-center flex-col gap-2  rounded-lg hover:bg-gray-100 cursor-pointer transition">
        {locations.map((location, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                setVehiclePanelOpen(true);
                setPanelOpen(false);
              }}
              className="flex gap-2 border border-gray-100 p-2 rounded-md active:border-black transition-all items-center justify-center"
            >
              <div className="bg-gray-200 h-5 w-5 flex items-center justify-center rounded-full shrink-0">
                <MdLocationPin className="text-gray-700 text-md" />
              </div>

              {/* Address */}
              <h4 className="text-sm font-medium text-gray-800 leading-tight">
                {location}
              </h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LocationSearchPanel;
