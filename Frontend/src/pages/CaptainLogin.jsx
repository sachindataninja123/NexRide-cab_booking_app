import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    setCaptainData({
      email: email,
      password: password,
    });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white px-6 py-8">
      <div className="max-w-md mx-auto w-full">
        <img
          className="w-16 mb-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
        />

        <form onSubmit={submitHandler} className="space-y-5">
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

          {/* Login Button */}
          <button className="w-full bg-black text-white rounded-md py-2 text-sm font-medium hover:bg-gray-900 transition">
            Login as Captain
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          New here?{" "}
          <Link to="/captain-signup" className="text-blue-500 font-medium">
            Register as Captain
          </Link>
        </p>
      </div>

      <div className="max-w-md mx-auto w-full space-y-4">
        <Link
          to="/login"
          className="bg-orange-500 text-white flex items-center justify-center rounded-md py-2 text-sm font-medium hover:bg-orange-600 transition"
        >
          Sign in as User
        </Link>

        <p className="text-xs text-gray-500 text-center">
          By continuing, you agree to our{" "}
          <span className="underline cursor-pointer">Terms</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainLogin;
