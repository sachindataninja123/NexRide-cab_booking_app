import React from "react";
import { RiCheckboxFill, RiMoneyRupeeCircleFill } from "react-icons/ri";

const CaptainDetails = () => {
  return (
    <div>
      {/* DRIVER INFO */}
      <div className="flex items-center justify-between">
        <div className="relative flex items-center">
          <img
            className="h-16 w-28 object-contain"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt="car"
          />
          <img
            className="absolute left-16 w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
            src="https://images.pexels.com/photos/17785909/pexels-photo-17785909.jpeg"
            alt="driver"
          />
        </div>

        <div className="text-right">
          <h2 className="text-md font-semibold">Sachin</h2>
          <h4 className="font-bold">BR29 AF 2363</h4>
          <p className="text-sm text-gray-500">Maruti Suzuki Alto</p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
          <RiMoneyRupeeCircleFill size={26} className="text-yellow-500" />
          <div>
            <h3 className="text-lg font-bold">₹2,450</h3>
            <p className="text-xs text-gray-500">Earnings</p>
          </div>
        </div>

        <div className="bg-gray-50  border border-gray-200  p-4 rounded-2xl flex items-center gap-3 shadow-sm">
          <RiCheckboxFill size={26} className="text-green-600" />
          <div>
            <h3 className="text-lg font-bold">12</h3>
            <p className="text-xs text-gray-500">Trips</p>
          </div>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <button className="w-full mt-7 bg-black text-white py-3 rounded-xl font-medium text-md active:scale-95 transition">
        Go Offline
      </button>
    </div>
  );
};

export default CaptainDetails;
