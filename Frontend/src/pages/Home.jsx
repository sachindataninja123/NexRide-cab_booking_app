import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center h-screen pt-8 flex justify-between flex-col w-full bg-red-300">
        <img
          className="w-16 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="bg-white pb-6 py-4 px-4">
          <h2 className="text-2xl font-bold">Get Started With NexRide</h2>
          <Link to="/login" className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-3">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
