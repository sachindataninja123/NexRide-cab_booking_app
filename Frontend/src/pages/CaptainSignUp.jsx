import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { captainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = useContext(captainDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate,
        capacity,
        vehicleType,
      },
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      captainData,
    );

    if (res.status === 201) {
      const data = res.data;
      setCaptain(data.captain);
      localStorage.setItem("token" , data.token)

      navigate("/captain-login");
    }

    // reset
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVehicleColor("");
    setPlate("");
    setCapacity("");
    setVehicleType("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white px-6 py-8">
      {/* Main Section */}
      <div className="max-w-md mx-auto w-full">
        <img
          className="w-16 mb-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
        />

        <form onSubmit={submitHandler} className="space-y-5">
          {/* Name */}
          <div>
            <h3 className="text-sm font-medium mb-2">Full Name</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/2 bg-gray-100 rounded-md px-4 py-2 text-sm border focus:ring-2 focus:ring-black outline-none"
                required
                placeholder="First name"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-1/2 bg-gray-100 rounded-md px-4 py-2 text-sm border focus:ring-2 focus:ring-black outline-none"
                required
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <h3 className="text-sm font-medium mb-2">Email</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 rounded-md px-4 py-2 text-sm border focus:ring-2 focus:ring-black outline-none"
              required
              placeholder="email@example.com"
            />
          </div>

          {/* Password */}
          <div>
            <h3 className="text-sm font-medium mb-2">Password</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 rounded-md px-4 py-2 text-sm border focus:ring-2 focus:ring-black outline-none"
              required
              placeholder="Enter password"
            />
          </div>

          {/* Vehicle Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Vehicle Details</h3>

            <div className="flex  gap-3">
              <input
                type="text"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                placeholder="Vehicle color"
                className="w-1/2 bg-gray-100 rounded-md px-4 py-2 text-sm border focus:ring-2 focus:ring-black outline-none"
                required
              />

              <input
                type="text"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                placeholder="Plate number"
                className="w-1/2 bg-gray-100 rounded-md px-4 py-2 text-sm border focus:ring-2 focus:ring-black outline-none"
                required
              />
            </div>

            <div className="flex gap-3">
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Passenger capacity"
                className="w-1/2 bg-gray-100 rounded-md px-4 py-2 text-sm border focus:ring-2 focus:ring-black outline-none"
                required
              />

              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-1/2 bg-gray-100 rounded-md px-1 py-2 text-sm border focus:ring-2 focus:ring-black outline-none"
                required
              >
                <option value="">Vehicle type</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>

          {/* Button */}
          <button className="w-full bg-black text-white rounded-md py-2 text-sm font-medium hover:bg-gray-900 transition">
            Register as Captain
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-500 font-medium">
            Login
          </Link>
        </p>
      </div>

      {/* Bottom Privacy */}
      <div className="text-xs text-gray-500 text-center mt-8 max-w-md mx-auto">
        By signing up, you agree to our{" "}
        <span className="underline cursor-pointer">Terms</span> and{" "}
        <span className="underline cursor-pointer">Privacy Policy</span>.
      </div>
    </div>
  );
};

export default CaptainSignUp;
