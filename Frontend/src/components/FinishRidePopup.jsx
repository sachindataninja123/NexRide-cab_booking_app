import React from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { MdLocationPin } from "react-icons/md";
import { RiCheckboxFill } from "react-icons/ri";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FinishRidePopup = ({ setFinishRidePanel, rideData }) => {

  const navigate = useNavigate()

  const endRide = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        {
          rideId: rideData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (res.status === 200) {
        setFinishRidePanel(false);
        navigate("/captain-home");
      }
    } catch (error) {}
  };

  return (
    <div>
      <h5
        onClick={() => setFinishRidePanel(false)}
        className="absolute w-[93%] flex items-center justify-center mx-auto text-gray-300 top-2 right-5 "
      >
        <RiArrowDownWideLine size={26} />
      </h5>
      <h2 className="text-lg font-semibold mb-4">Finish this Ride</h2>

      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 shadow-sm rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <img
            className="w-14 h-14 object-cover rounded-full border"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60"
            alt="user"
          />

          <div>
            <h4 className="font-semibold text-gray-800">
              {rideData?.user.firstname}
            </h4>
            <p className="text-sm text-gray-500">Passenger</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">2.2 KM</p>
          <h3 className="text-2xl font-bold text-green-600">
            ₹{rideData?.fare}
          </h3>
        </div>
      </div>

      <div className="flex gap-1  justify-between flex-col  items-center">
        {/* Ride Details */}
        <div className="mt-6 bg-gray-50 rounded-2xl w-full overflow-hidden border border-gray-200">
          {/* Pickup */}
          <div className="flex gap-4 p-4">
            <MdLocationPin size={22} className="text-blue-500 mt-1" />

            <div>
              <h3 className="font-semibold text-gray-800">Pickup Point</h3>

              <p className="text-sm text-gray-500">{rideData?.pickup}</p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex gap-4 p-4 border-t border-gray-200">
            <RiCheckboxFill size={22} className="text-green-500 mt-1" />

            <div>
              <h3 className="font-semibold text-gray-800">Destination</h3>

              <p className="text-sm text-gray-500">{rideData?.destination}</p>
            </div>
          </div>

          {/* Payment */}
          <div className="flex gap-4 p-4 border-t border-gray-200">
            <RiMoneyRupeeCircleFill
              size={22}
              className="text-yellow-500 mt-1"
            />

            <div>
              <h3 className="font-semibold text-gray-800">₹{rideData?.fare}</h3>

              <p className="text-sm text-gray-500">Cash Payment</p>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="mt-8 w-full">
          <button
            onClick={endRide}
            className="w-full bg-green-600 hover:bg-green-700 transition-all duration-200 text-white font-semibold py-3 rounded-lg flex items-center justify-center"
          >
            Finish Ride
          </button>

          <p className="text-center text-sm text-red-500 mt-2">
            Finish the ride only after completing the trip.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRidePopup;
