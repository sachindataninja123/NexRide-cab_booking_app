// import React, { useContext, useEffect } from "react";
// import { IoLogOutOutline } from "react-icons/io5";
// import CaptainDetails from "../components/CaptainDetails";
// import RidePopup from "../components/RidePopup";
// import { useGSAP } from "@gsap/react";
// import { gsap } from "gsap/gsap-core";
// import { useState, useRef } from "react";
// import ConfirmRidePopup from "../components/ConfirmRidePopup";
// import { SocketContext } from "../context/SocketContext";
// import { captainDataContext } from "../context/CaptainContext";
// import axios from "axios";

// const CaptainHome = () => {
//   const [ridePopupPanel, setRidePopupPanel] = useState(false);
//   const ridePopupPanelref = useRef(null);

//   const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
//   const confirmRidePopupPanelRef = useRef(null);

//   const { socket } = useContext(SocketContext);
//   const { captain } = useContext(captainDataContext);

//   const [ride, setRide] = useState(null);
//   const rideRef = useRef(null); // ✅ add this

//   useEffect(() => {
//     socket.emit("join", {
//       userId: captain._id,
//       userType: "captain",
//     });

//     const updateLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           socket.emit("update-location-captain", {
//             userId: captain._id,
//             location: {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             },
//           });
//         });
//       }
//     };

//     const locationInterval = setInterval(updateLocation, 10000);
//     updateLocation();

//     // return () => {
//     //   clearInterval(locationInterval);
//     //   socket.off("new-ride");
//     // };
//   }, []);

//   socket.on("new-ride", (data) => {
//     setRide(data);
//     setRidePopupPanel(true);
//   });

//   async function confirmRide() {
//     const response = await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
//       {
//         rideId: ride._id,
//         captainId: captain._id,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       },
//     );

//     setRidePopupPanel(false);
//     setConfirmRidePopupPanel(true);
//   }

//   useGSAP(() => {
//     if (ridePopupPanel) {
//       gsap.to(ridePopupPanelref.current, {
//         transform: "translateY(0)",
//       });
//     } else {
//       gsap.to(ridePopupPanelref.current, {
//         transform: "translateY(100%)",
//       });
//     }
//   }, [ridePopupPanel]);

//   useGSAP(() => {
//     if (confirmRidePopupPanel) {
//       gsap.to(confirmRidePopupPanelRef.current, {
//         transform: "translateY(0)",
//       });
//     } else {
//       gsap.to(confirmRidePopupPanelRef.current, {
//         transform: "translateY(100%)",
//       });
//     }
//   }, [confirmRidePopupPanel]);

//   return (
//     <div className="h-screen bg-white flex flex-col overflow-hidden">
//       {/* HEADER */}
//       <div className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-4 pt-4">
//         <img
//           className="w-14"
//           src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
//           alt="logo"
//         />
//         <div className="bg-white p-2 rounded-full shadow-md">
//           <IoLogOutOutline size={18} />
//         </div>
//       </div>

//       {/* MAP */}
//       <div className="h-[55%] relative">
//         <img
//           src="https://i.sstatic.net/B6fEt.png"
//           alt="map"
//           className="w-full h-full object-cover"
//         />

//         {/* status */}
//         <div className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm shadow-lg">
//           ● Online
//         </div>
//       </div>

//       {/* BOTTOM SHEET */}
//       <div className="h-[45%] bg-white  p-5 shadow-2xl">
//         {/* drag handle */}
//         <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5"></div>
//         <CaptainDetails />
//       </div>

//       <div
//         ref={ridePopupPanelref}
//         className="fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-7 pt-12"
//       >
//         <RidePopup
//           ride={ride}
//           setRidePopupPanel={setRidePopupPanel}
//           setConfirmRidePopupPanel={setConfirmRidePopupPanel}
//           confirmRide={confirmRide}
//         />
//       </div>

//       <div
//         ref={confirmRidePopupPanelRef}
//         className="fixed w-full h-[90%] z-10 bottom-0 translate-y-full  bg-white px-3 py-7 pt-12"
//       >
//         <ConfirmRidePopup
//           setRidePopupPanel={setRidePopupPanel}
//           setConfirmRidePopupPanel={setConfirmRidePopupPanel}
//         />
//       </div>
//     </div>
//   );
// };

// export default CaptainHome;


import React, { useContext, useEffect, useRef, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import CaptainDetails from "../components/CaptainDetails";
import RidePopup from "../components/RidePopup";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/gsap-core";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { SocketContext } from "../context/SocketContext";
import { captainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const ridePopupPanelref = useRef(null);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const confirmRidePopupPanelRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(captainDataContext);
  const [ride, setRide] = useState(null);
  const rideRef = useRef(null);

  
  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    // ✅ inside useEffect — registers only once
    socket.on("new-ride", (data) => {
      console.log("🚗 New ride received:", data);
      rideRef.current = data;
      setRide(data);
      setRidePopupPanel(true);
    });

    return () => {
      clearInterval(locationInterval);
      socket.off("new-ride"); // ✅ cleanup
    };
  }, []);

  async function confirmRide() {
    try {
      const currentRide = rideRef.current;
      if (!currentRide) return;

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        { rideId: currentRide._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setRidePopupPanel(false);
        setConfirmRidePopupPanel(true);
      }
    } catch (error) {
      console.error("Confirm ride error:", error.response?.data || error.message);
    }
  }

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelref.current, { transform: "translateY(0)" });
    } else {
      gsap.to(ridePopupPanelref.current, { transform: "translateY(100%)" });
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, { transform: "translateY(0)" });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, { transform: "translateY(100%)" });
    }
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
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

      <div className="h-[55%] relative">
        <img src="https://i.sstatic.net/B6fEt.png" alt="map" className="w-full h-full object-cover" />
        <div className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-1 rounded-full text-sm shadow-lg">
          ● Online
        </div>
      </div>

      <div className="h-[45%] bg-white p-5 shadow-2xl">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5"></div>
        <CaptainDetails />
      </div>

      <div
        ref={ridePopupPanelref}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-7 pt-12"
      >
        <RidePopup
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full h-[90%] z-10 bottom-0 translate-y-full bg-white px-3 py-7 pt-12"
      >
        <ConfirmRidePopup
          ride={ride}                            // 
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;