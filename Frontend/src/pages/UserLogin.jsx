import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { user, setUser } = useContext(userDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const loginUser = {
      email: email,
      password: password,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/login`,
      loginUser,
    );

    if (res.status === 200) {
      const data = res.data;
      setUser(data.user);

      navigate("/home");
    }

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

          {/* Login Button */}
          <button className="w-full bg-black text-white rounded-md py-2 text-sm font-medium hover:bg-gray-900 transition">
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          New here?{" "}
          <Link to="/signup" className="text-blue-500 font-medium">
            Create Account
          </Link>
        </p>
      </div>

      <div className="max-w-md mx-auto w-full space-y-4">
        <Link
          to="/captain-login"
          className="bg-green-600 text-white flex items-center justify-center rounded-md py-2 text-sm font-medium hover:bg-green-700 transition"
        >
          Sign in as Captain
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

export default UserLogin;
