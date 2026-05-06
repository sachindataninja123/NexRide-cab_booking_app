import React, { useState } from "react";
import { IoIosPeople } from "react-icons/io";
import { RiArrowDownWideLine } from "react-icons/ri";

const VehiclePanel = ({ setVehiclePanelOpen, setconfirmRidePanelOpen }) => {
  return (
    <div className="px-4 py-3">
      <h5
        className="absolute w-[93%] flex items-center justify-center mx-auto text-gray-300 top-2 right-5 "
        onClick={() => setVehiclePanelOpen(false)}
      >
        <RiArrowDownWideLine size={26} />
      </h5>
      <h2 className="text-lg font-semibold mb-4">Choose a ride</h2>

      {/* CARD TEMPLATE */}
      {/* CAR */}
      <div
        onClick={() => setconfirmRidePanelOpen(true)}
        className={`flex items-center justify-between p-4 rounded-xl border  mb-3  border-gray-200 active:border-black  cursor-pointer transition-all
       `}
      >
        <div className="flex items-center gap-4">
          <img
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            className="h-12 w-16 object-cover"
            alt="car"
          />

          <div>
            <h3 className="text-sm gap-1 flex justify-start items-center font-semibold">
              UberGo{" "}
              <span className="text-gray-700 flex items-center justify-center text-md font-normal">
                <IoIosPeople className="text-blue-800" size={15} /> 4
              </span>
            </h3>
            <p className="text-xs text-gray-500">5 mins away</p>
            <p className="text-xs text-gray-700">Comfortable rides</p>
          </div>
        </div>

        <h4 className="text-sm font-semibold">₹150.55</h4>
      </div>

      {/* AUTO */}
      <div
        onClick={() => setconfirmRidePanelOpen(true)}
        className={`flex items-center justify-between p-4 rounded-xl border border-gray-200 active:border-black  mb-3 cursor-pointer transition-all
        `}
      >
        <div className="flex items-center gap-4">
          <img
            src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
            className="h-10 w-14 object-contain"
            alt="auto"
          />

          <div>
            <h3 className="text-sm gap-1 flex justify-start items-center font-semibold">
              UberAuto{" "}
              <span className="text-gray-700 flex items-center justify-center text-md font-normal">
                <IoIosPeople className="text-blue-800" size={15} /> 3
              </span>
            </h3>
            <p className="text-xs text-gray-500">2 mins away</p>
            <p className="text-xs text-gray-700">Affordable rides</p>
          </div>
        </div>

        <h4 className="text-sm font-semibold">₹120.66</h4>
      </div>

      {/* BIKE */}
      <div
        onClick={() => setconfirmRidePanelOpen(true)}
        className={`flex items-center justify-between p-4 rounded-xl border mb-3  border-gray-200 active:border-black  cursor-pointer transition-all
       `}
      >
        <div className="flex items-center gap-4">
          <img
            src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n"
            className="h-10 w-14 object-contain"
            alt="bike"
          />

          <div>
            <h3 className="text-sm font-semibold flex justify-start items-center gap-1">
              Moto{" "}
              <span className="text-gray-700 flex items-center justify-center  text-md font-normal">
                <IoIosPeople className="text-blue-800" size={15} />1
              </span>
            </h3>
            <p className="text-xs text-gray-500">2 mins away</p>
            <p className="text-xs text-gray-700">Fastest rides</p>
          </div>
        </div>

        <h4 className="text-sm font-semibold">₹65.44</h4>
      </div>
    </div>
  );
};

export default VehiclePanel;
