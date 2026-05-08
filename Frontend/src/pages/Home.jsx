import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import { RiArrowDownWideLine } from "react-icons/ri";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingforDrivers from "../components/LookingforDrivers";
import WaitingforDrivers from "../components/WaitingforDrivers";
import { SocketContext } from "../context/SocketContext";
import { userDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
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
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [pickupData, setPickupData] = useState(null);
  const [destinationData, setDestinationData] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const { socket } = useContext(SocketContext);
  const { user } = useContext(userDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  // replace the socket.on that's outside useEffect with this:
  useEffect(() => {
    socket.on("ride-confirmed", (ride) => {
      console.log("✅ Ride confirmed:", ride);
      setvehicleFound(false);
      setWaitingForDriver(true);
      setRide(ride);
    });

    return () => socket.off("ride-confirmed"); // cleanup
  }, []);

  socket.on("ride-started", (ride) => {
    setWaitingForDriver(false);
    navigate("/riding");
  });

  const handlePickUpChange = async (e) => {
    const value = e.target.value;

    setPickup(value);

    if (value.trim().length < 3) {
      setPickupSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setPickupSuggestions(res.data);
    } catch (error) {
      console.log("Handle pickup suggestions error", error.message);
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;

    setDestination(value);

    if (value.trim().length < 3) {
      setDestinationSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setDestinationSuggestions(res.data);
    } catch (error) {
      console.log("Handle Destination suggestions error", error.message);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
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

  async function findTrip() {
    if (!pickupData || !destinationData) return;

    try {
      setVehiclePanelOpen(true);
      setPanelOpen(false);

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,

        {
          params: {
            pickup,
            destination,
          },

          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      // console.log(res.data);
      setFare(res.data);
    } catch (error) {
      console.log("Fare Error", error.response?.data || error.message);
    }
  }

  async function createRide() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          vehicleType,
          destination,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(res.data);
    } catch (error) {
      console.log("Create Ride Error", error.response?.data || error.message);
    }
  }

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
                setActiveField("pickup");
              }}
              className="bg-[#eee] w-full text-base rounded-lg px-10 py-2 mt-4"
              type="text"
              value={pickup}
              onChange={handlePickUpChange}
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              className="bg-[#eee] w-full text-base rounded-lg px-10 py-2 mt-3 "
              type="text"
              value={destination}
              onChange={handleDestinationChange}
              placeholder="Enter your destination"
            />
          </form>
          <button
            disabled={!pickup || !destination}
            onClick={findTrip}
            className={`px-4 py-2 mt-3 rounded-md w-full text-white ${
              pickup && destination
                ? "bg-black"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="bg-white h-0 ">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            setPickupData={setPickupData}
            setDestinationData={setDestinationData}
            activeField={activeField}
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
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
          fare={fare}
          setVehicleType={setVehicleType}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-6 pt-12"
      >
        <ConfirmRide
          fare={fare}
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          createRide={createRide}
          setconfirmRidePanelOpen={setconfirmRidePanelOpen}
          setvehicleFound={setvehicleFound}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full translate-y-full z-10 bottom-0 bg-white px-3 py-6 pt-12"
      >
        <LookingforDrivers
          createRide={createRide}
          fare={fare}
          vehicleType={vehicleType}
          pickup={pickup}
          destination={destination}
          setvehicleFound={setvehicleFound}
        />
      </div>

      <div
        ref={waitingForDriverRef}
        className="fixed w-full translate-y-full  z-10 bottom-0 bg-white px-3 py-6 pt-12"
      >
        <WaitingforDrivers
          ride={ride}
          setVehicleFound={setvehicleFound}
          waitingForDriver={waitingForDriver}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
