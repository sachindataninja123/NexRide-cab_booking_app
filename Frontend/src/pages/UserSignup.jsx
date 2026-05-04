import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserSignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setlastName] = useState();
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    setUserData({
      name: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });

    setEmail("");
    setFirstName("");
    setPassword("");
    setlastName("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white px-6 py-8">
      {/* Top Section */}
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
                className="w-1/2 bg-gray-100 rounded-md px-4 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-black"
                required
                placeholder="First name"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                className="w-1/2 bg-gray-100 rounded-md px-4 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-black"
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
              className="w-full bg-gray-100 rounded-md px-4 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-black"
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
              className="w-full bg-gray-100 rounded-md px-4 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-black"
              required
              placeholder="Enter password"
            />
          </div>

          {/* Button */}
          <button className="w-full bg-black text-white rounded-md py-2 text-sm font-medium hover:bg-gray-900 transition">
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-medium">
            Login
          </Link>
        </p>
      </div>

      {/* Bottom Privacy Section */}
      <div className="text-xs text-gray-500 text-center mt-8 max-w-md mx-auto">
        By signing up, you agree to our{" "}
        <span className="underline cursor-pointer">Terms of Service</span> and{" "}
        <span className="underline cursor-pointer">Privacy Policy</span>.
        <br />
        Your data is securely encrypted and never shared without consent.
      </div>
    </div>
  );
};

export default UserSignUp;
