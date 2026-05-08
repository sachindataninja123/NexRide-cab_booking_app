import React, { useContext, useEffect } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { useState, useRef } from "react";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { SocketContext } from "../context/SocketContext";
import { captainDataContext } from "../context/CaptainContext";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const ridePopupPanelref = useRef(null);

  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const confirmRidePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(captainDataContext);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });
  }, [captain]);

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelref.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopupPanelref.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-4 pt-4">
        <img
          className="w-14"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="logo"
        />
        <div className="bg-white p-2 rounded-full shadow-md">
          <IoLogOutOutline size={18} />
        </div>
      </div>

      {/* MAP */}
      <div className="h-[55%] relative">
        <img
          src="https://i.sstatic.net/B6fEt.png"
          alt="map"
          className="w-full h-full object-cover"
        />

        {/* status */}
        <div className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm shadow-lg">
          ● Online
        </div>
      </div>

      {/* BOTTOM SHEET */}
      <div className="h-[45%] bg-white  p-5 shadow-2xl">
        {/* drag handle */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5"></div>
        <CaptainDetails />
      </div>

      <div
        ref={ridePopupPanelref}
        className="fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-7 pt-12"
      >
        <RidePopup
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-[90%] z-10 bottom-0 translate-y-full  bg-white px-3 py-7 pt-12"
      >
        <ConfirmRidePopup
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
