import React from "react";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { RiArrowDownWideLine } from "react-icons/ri";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingforDrivers from "../components/LookingforDrivers";
import WaitingforDrivers from "../components/WaitingforDrivers";

const Home = () => {
  const [pickup, setPickup] = useState();
  const [destination, setDestination] = useState();
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const closePanelRef = useRef(null);

  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);

  const [confirmRidePanelOpen, setconfirmRidePanelOpen] = useState(false);
  const confirmRidePanelRef = useRef(null);

  const [vehicleFound, setvehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);

  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null);

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

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (confirmRidePanelOpen) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanelOpen]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

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
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-7 pt-10"
      >
        <VehiclePanel
          setVehiclePanelOpen={setVehiclePanelOpen}
          setconfirmRidePanelOpen={setconfirmRidePanelOpen}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-6 pt-12"
      >
        <ConfirmRide
          setconfirmRidePanelOpen={setconfirmRidePanelOpen}
          setvehicleFound={setvehicleFound}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-6 pt-12"
      >
        <LookingforDrivers setvehicleFound={setvehicleFound} />
      </div>

      <div
       ref={waitingForDriverRef}
        className="fixed w-full  z-10 bottom-0 bg-white px-3 py-6 pt-12"
      >
        <WaitingforDrivers
          waitingForDriver={waitingForDriver}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
