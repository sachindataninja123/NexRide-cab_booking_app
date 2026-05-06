import React from "react";
import { Link } from "react-router-dom";
import { TiHomeOutline } from "react-icons/ti";
import { RiCheckboxFill } from "react-icons/ri";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const Riding = () => {
  const ride = {
    captain: {
      fullname: { firstname: "Sachin" },
      vehicle: {
        plate: "BR29 AF 2363",
        model: "Maruti Suzuki Alto",
      },
    },
    destination: "Sector 87, Faridabad, Haryana",
    fare: 249,
  };

  return (
    <div className="h-screen flex flex-col">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow z-10"
      >
        <TiHomeOutline size={20} />
      </Link>

      <div className="h-1/2 relative">
        <img
          src="https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg"
          alt="map placeholder"
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-3 left-3 bg-black/60 text-white px-3 py-1 rounded-lg text-sm">
          Driver is on the way 🚗
        </div>
      </div>

      <div className="h-1/2 p-4 bg-white">
        <div className="flex items-center justify-between">
          <div className="relative flex items-center">
            <img
              className="h-14 w-24 object-contain"
              src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
              alt="car"
            />

            <img
              className="absolute left-12 w-12 h-12 rounded-full object-cover border-2 border-white shadow"
              src="https://images.pexels.com/photos/17785909/pexels-photo-17785909.jpeg"
              alt="driver"
            />
          </div>

          <div className="text-right">
            <h2 className="text-lg font-medium">
              {ride.captain.fullname.firstname}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride.captain.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600">
              {ride.captain.vehicle.model}
            </p>
          </div>
        </div>

        {/* Ride Details */}
        <div className="mt-5">
          <div className="flex items-center gap-3 p-3 border-b">
            <RiCheckboxFill size={20} />
            <div>
              <h3 className="text-lg font-medium">Destination Point</h3>
              <p className="text-sm text-gray-600">{ride.destination}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3">
            <RiMoneyRupeeCircleFill size={20} />
            <div>
              <h3 className="text-lg font-medium">₹{ride.fare}</h3>
              <p className="text-sm text-gray-600">Cash Payment</p>
            </div>
          </div>
        </div>

        {/* Button */}
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
