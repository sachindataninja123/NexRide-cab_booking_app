import React from "react";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { RiArrowDownWideLine } from "react-icons/ri";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";

const Home = () => {
  const [pickup, setPickup] = useState();
  const [destination, setDestination] = useState();
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const closePanelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();

    setPickup("");
    setDestination("");
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
      });
      gsap.to(closePanelRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
      });
      gsap.to(closePanelRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  return (
    <div className="relative h-screen overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="logo"
      />

      <div className="h-screen w-screen">
        {/* image for temporary */}
        <img
          className="h-full w-full object-cover"
          src="https://i.sstatic.net/B6fEt.png"
          alt=""
        />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full ">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={closePanelRef}
            className="absolute top-6 right-6"
            onClick={() => setPanelOpen(false)}
          >
            <RiArrowDownWideLine size={23} />
          </h5>
          <h4 className="font-semibold text-2xl">Find a trip</h4>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="bg-gray-700 absolute h-16 w-1 top-[43%] left-10 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              className="bg-[#eee] w-full text-base rounded-lg px-10 py-2 mt-4"
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              className="bg-[#eee] w-full text-base rounded-lg px-10 py-2 mt-3 "
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0 ">
          <LocationSearchPanel />
        </div>
      </div>

      <div className="fixed w-full z-10 bottom-0 bg-white px-3 py-7 pt-5">
        <VehiclePanel />
      </div>
    </div>
  );
};

export default Home;
