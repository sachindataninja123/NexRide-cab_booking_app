import React from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { MdLocationPin } from "react-icons/md";
import { RiCheckboxFill } from "react-icons/ri";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const ConfirmRide = ({
  setconfirmRidePanelOpen,
  setvehicleFound,
  createRide,
  pickup,
  destination,
  vehicleType,
  fare,
}) => {
  return (
    <div>
      <h5
        className="absolute w-[93%] flex items-center justify-center mx-auto text-gray-300 top-2 right-5 "
        onClick={() => setconfirmRidePanelOpen(false)}
      >
        <RiArrowDownWideLine size={26} />
      </h5>
      <h2 className="text-lg font-semibold mb-4">Conifrm your Ride</h2>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          className="h-26 w-40 object-cover"
          alt="car"
        />
        <div className="bg-gray-50 w-full rounded-xl p-3 mt-4 shadow-sm border border-gray-100">
          {/* PICKUP */}
          <div className="flex items-start gap-4 pb-4">
            <div className="bg-green-100 p-2 rounded-full">
              <MdLocationPin size={20} className="text-green-600" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-base">
                Pickup Location
              </h3>
              <p className="text-sm text-gray-500 mt-1 wrap-break-word">
                {pickup}
              </p>
            </div>
          </div>

          {/* DESTINATION */}
          <div className="flex items-start gap-4 py-4 border-t border-gray-200">
            <div className="bg-blue-100 p-2 rounded-full">
              <RiCheckboxFill size={20} className="text-blue-600" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-base">
                Destination
              </h3>
              <p className="text-sm text-gray-500 mt-1 wrap-break-word">
                {destination}
              </p>
            </div>
          </div>

          {/* FARE */}
          <div className="flex items-start gap-4 pt-4 border-t border-gray-200">
            <div className="bg-yellow-100 p-2 rounded-full">
              <RiMoneyRupeeCircleFill size={20} className="text-yellow-600" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 text-base flex gap-1 items-center justify-center">
                Total Fare
                <span className="text-sm text-gray-500">(Cash)</span>
              </h3>

              <div className="flex  flex-col mt-1">
                <span className="text-xl font-semibold text-gray-900">
                  ₹{fare?.[vehicleType]}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setvehicleFound(true);
            setconfirmRidePanelOpen(false);
            createRide();
          }}
          className="w-full mt-5 bg-green-600 font-semibold p-2 rounded-lg text-white "
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
