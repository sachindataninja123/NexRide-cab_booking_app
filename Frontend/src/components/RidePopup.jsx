import React from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { MdLocationPin } from "react-icons/md";
import { RiCheckboxFill } from "react-icons/ri";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const RidePopup = ({ setRidePopupPanel, setConfirmRidePopupPanel }) => {
  return (
    <div>
      <h5
        onClick={() => setRidePopupPanel(false)}
        className="absolute w-[93%] flex items-center justify-center mx-auto text-gray-300 top-2 right-5 "
      >
        <RiArrowDownWideLine size={26} />
      </h5>
      <h2 className="text-lg font-semibold mb-4">New Ride Available!</h2>

      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 shadow-sm rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <img
            className="w-14 h-14 object-cover rounded-full border"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60"
            alt="user"
          />

          <div>
            <h4 className="font-semibold text-gray-800">Sofia Ansari</h4>
            <p className="text-sm text-gray-500">Passenger</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">2.2 KM</p>
          <h3 className="text-2xl font-bold text-green-600">₹65.55</h3>
        </div>
      </div>

      <div className="flex gap-1 justify-between flex-col items-center">
        {/* Ride Details */}
        <div className="mt-6 bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
          {/* Pickup */}
          <div className="flex gap-4 p-4">
            <MdLocationPin size={22} className="text-blue-500 mt-1" />

            <div>
              <h3 className="font-semibold text-gray-800">562/11-A</h3>

              <p className="text-sm text-gray-500">
                Bharat Colony, Faridabad, Haryana
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex gap-4 p-4 border-t border-gray-200">
            <RiCheckboxFill size={22} className="text-green-500 mt-1" />

            <div>
              <h3 className="font-semibold text-gray-800">Third Wave Coffee</h3>

              <p className="text-sm text-gray-500">
                17th Cross Road, Sarita Colony, Badarpur, Delhi
              </p>
            </div>
          </div>

          {/* Payment */}
          <div className="flex gap-4 p-4 border-t border-gray-200">
            <RiMoneyRupeeCircleFill
              size={22}
              className="text-yellow-500 mt-1"
            />

            <div>
              <h3 className="font-semibold text-gray-800">₹65.55</h3>

              <p className="text-sm text-gray-500">Cash Payment</p>
            </div>
          </div>
        </div>

        <div className="flex w-full mt-5 gap-2 items-center justify-between ">
          <button
            onClick={() => setRidePopupPanel(false)}
            className="w-full  bg-gray-300 font-semibold p-2 rounded-lg text-gray-800 "
          >
            Ignore
          </button>
          <button
            onClick={() => setConfirmRidePopupPanel(true)}
            className="w-full  bg-green-600 font-semibold p-2 rounded-lg text-white "
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopup;
