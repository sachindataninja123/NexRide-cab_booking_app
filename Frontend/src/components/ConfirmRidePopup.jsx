import React from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { MdLocationPin } from "react-icons/md";
import { RiCheckboxFill } from "react-icons/ri";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmRidePopup = ({
  setRidePopupPanel,
  setConfirmRidePopupPanel,
  ride,
}) => {
  const [otp, setOtp] = useState();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (res.status === 200) {
      setConfirmRidePopupPanel(false);
      setRidePopupPanel(false);
      navigate("/captain-riding");
    }
  };

  return (
    <div>
      <h5
        onClick={() => setConfirmRidePopupPanel(false)}
        className="absolute w-[93%] flex items-center justify-center mx-auto text-gray-300 top-2 right-5 "
      >
        <RiArrowDownWideLine size={26} />
      </h5>
      <h2 className="text-lg font-semibold mb-4">User Ride Details</h2>

      <div className="flex items-center justify-between bg-gray-50 border border-gray-200 shadow-sm rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <img
            className="w-14 h-14 object-cover rounded-full border"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&auto=format&fit=crop&q=60"
            alt="user"
          />

          <div>
            <h4 className="font-semibold text-gray-800">
              {ride?.user.firstname}
            </h4>
            <p className="text-sm text-gray-500">Passenger</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">2.2 KM</p>
          <h3 className="text-2xl font-bold text-green-600">₹{ride?.fare}</h3>
        </div>
      </div>

      <div className="flex gap-1  justify-between flex-col items-center">
        {/* Ride Details */}
        <div className="mt-4 bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
          {/* Pickup */}
          <div className="flex gap-4 p-4">
            <MdLocationPin size={25} className="text-blue-500 mt-1" />

            <div>
              <h3 className="font-semibold text-gray-800">Pickup Point</h3>

              <p className="text-sm text-gray-500">{ride?.pickup}</p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex gap-4 p-4 border-t border-gray-200">
            <RiCheckboxFill size={22} className="text-green-500 mt-1" />

            <div>
              <h3 className="font-semibold text-gray-800">Destination</h3>

              <p className="text-sm text-gray-500">{ride?.destination}</p>
            </div>
          </div>

          {/* Payment */}
          <div className="flex gap-4 p-4 border-t border-gray-200">
            <RiMoneyRupeeCircleFill
              size={22}
              className="text-yellow-500 mt-1"
            />

            <div>
              <h3 className="font-semibold text-gray-800">₹{ride?.fare}</h3>

              <p className="text-sm text-gray-500">Cash Payment</p>
            </div>
          </div>
        </div>

        <div className="flex w-full mt-7 gap-2 items-center justify-between ">
          <form className="w-full flex flex-col gap-2" onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="number"
              className="w-full border border-gray-300 px-5 py-2 rounded-md font-mono"
              placeholder="Enter OTP"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  setConfirmRidePopupPanel(false);
                  setRidePopupPanel(false);
                }}
                className="w-full  bg-red-600 font-semibold p-2 rounded-lg text-gray-100 "
              >
                Cancel
              </button>

              <button className="w-full flex justify-center  bg-green-600 font-semibold p-2 rounded-lg text-white ">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
