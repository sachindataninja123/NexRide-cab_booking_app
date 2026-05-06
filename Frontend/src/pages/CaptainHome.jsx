import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { RiCheckboxFill, RiMoneyRupeeCircleFill } from "react-icons/ri";

const CaptainHome = () => {
  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">

      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-4 pt-4">
        <img
          className="w-14"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
        />
        <div className="bg-white p-2 rounded-full shadow-md">
          <IoLogOutOutline size={18} />
        </div>
      </div>

      {/* MAP */}
      <div className="h-[55%] relative">
        <img
          src="https://i.sstatic.net/B6fEt.png"
          alt="map"
          className="w-full h-full object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* status */}
        <div className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm shadow-lg">
          ● Online
        </div>
      </div>

      {/* BOTTOM SHEET */}
      <div className="h-[45%] bg-white  p-5 shadow-2xl">

        {/* drag handle */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5"></div>

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
            <h2 className="text-lg font-semibold">Sachin</h2>
            <p className="text-sm text-gray-500">Maruti Suzuki Alto</p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4 mt-5">

          <div className="bg-gray-100 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <RiMoneyRupeeCircleFill size={26} className="text-green-600" />
            <div>
              <h3 className="text-lg font-bold">₹2,450</h3>
              <p className="text-xs text-gray-500">Earnings</p>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <RiCheckboxFill size={26} className="text-blue-600" />
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
    </div>
  );
};

export default CaptainHome;