import React, { useState, useRef } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { RiArrowDownWideLine } from "react-icons/ri";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import FinishRidePopup from "../components/FinishRidePopup";
import { useLocation } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const CaptainRide = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        y: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen w-full relative overflow-hidden bg-black">
      {/* HEADER */}
      <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-3">
        <img
          className="w-14"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
        />

        <button className="bg-white p-3 rounded-full shadow-lg">
          <IoLogOutOutline size={20} />
        </button>
      </div>

      {/* MAP */}
      <div className="h-full w-full">
        <LiveTracking />
      </div>

      {/* BOTTOM RIDE CARD */}
      <div
        onClick={() => setFinishRidePanel(true)}
        className="absolute bottom-0 left-0 w-full bg-yellow-400 rounded-t-3xl px-6 py-5 shadow-2xl cursor-pointer"
      >
        {/* Top Indicator */}
        <div className="flex justify-center mb-3">
          <RiArrowDownWideLine size={30} className="text-gray-800" />
        </div>

        {/* Ride Info */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700 font-medium">Ride Distance</p>

            <h3 className="text-xl font-bold text-gray-900">4 KM Away</h3>
          </div>

          <button className="bg-green-600 hover:bg-green-700 transition-all duration-200 text-white font-semibold px-6 py-3 rounded-xl shadow-md">
            Complete Ride
          </button>
        </div>
      </div>

      {/* FINISH RIDE POPUP */}
      <div
        ref={finishRidePanelRef}
        className="fixed bottom-0 left-0 z-60 w-full h-[88%] bg-white rounded-t-3xl translate-y-full shadow-2xl overflow-y-auto"
      >
        <div className="px-5 py-6">
          <FinishRidePopup
            rideData={rideData}
            setFinishRidePanel={setFinishRidePanel}
          />
        </div>
      </div>
    </div>
  );
};

export default CaptainRide;
