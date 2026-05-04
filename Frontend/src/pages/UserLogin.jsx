import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserLogin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
    });

    console.log(userData)

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex justify-between flex-col">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form
          action=""
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 w-full text-lg border placeholder:text-base py-2"
            required
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-5 rounded px-4 w-full text-lg border placeholder:text-sm py-2"
            required
            placeholder="password"
          />
          <button className="bg-[#111] text-white rounded px-4 w-full text-lg  py-2">
            Login
          </button>
        </form>
        <p className="text-left mt-2">
          New here?{" "}
          <Link to="/signup" className="text-blue-500">
            Create new Account
          </Link>
        </p>
      </div>

      <div>
        <Link to="/captain-login" className="bg-[#10b461] text-white flex items-center justify-center rounded px-4 w-full text-lg py-2">
          Sign as a Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
