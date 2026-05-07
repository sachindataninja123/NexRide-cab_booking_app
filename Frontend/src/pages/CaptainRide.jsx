// import React from "react";
// import { IoLogOutOutline } from "react-icons/io5";
// import { RiArrowDownWideLine } from "react-icons/ri";
// import { useGSAP } from "@gsap/react";
// import { gsap } from "gsap/gsap-core";
// import FinishRidePopup from "../components/FinishRidePopup";
// import { useState, useRef } from "react";

// const CaptainRide = () => {
//   const [finishRidePanel, setFinishRidePanel] = useState(false);
//   const finishRidePanelRef = useRef(null);

//   useGSAP(() => {
//     if (finishRidePanel) {
//       gsap.to(finishRidePanelRef.current, {
//         transform: "translateY(0)",
//       });
//     } else {
//       gsap.to(finishRidePanelRef.current, {
//         transform: "translateY(100%)",
//       });
//     }
//   }, [finishRidePanel]);

//   return (
//     <div className="h-screen ">
//       <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 pt-4">
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
//       <div className="h-[80%] relative">
//         <img
//           src="https://i.sstatic.net/B6fEt.png"
//           alt="map"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <div
//         className="h-1/5 p-6 relative bg-yellow-400"
//         onClick={() => {
//           setFinishRidePanel(true);
//         }}
//       >
//         <h5 className="absolute w-[93%] flex items-center justify-center mx-auto text-gray-900 top-2 right-5 ">
//           <RiArrowDownWideLine size={26} />
//         </h5>
//         <div className="flex justify-between items-center gap-4 mt-8">
//           <h4 className="font-semibold text-xl">4km away</h4>
//           <button className="w-1/2 flex justify-center bg-green-600 font-semibold p-2 rounded-lg text-white ">
//             Complete Ride
//           </button>
//         </div>
//       </div>

//       <div
//         ref={finishRidePanelRef}
//         className="fixed w-full h-[90%] z-10 bottom-0 translate-y-full  bg-white px-3 py-7 pt-12"
//       >
//         <FinishRidePopup setFinishRidePanel={setFinishRidePanel} />
//       </div>
//     </div>
//   );
// };

// export default CaptainRide;

import React, { useState, useRef } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { RiArrowDownWideLine } from "react-icons/ri";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import FinishRidePopup from "../components/FinishRidePopup";

const CaptainRide = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);

  const finishRidePanelRef = useRef(null);

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
        <img
          src="https://i.sstatic.net/B6fEt.png"
          alt="map"
          className="w-full h-full object-cover"
        />
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
          <FinishRidePopup setFinishRidePanel={setFinishRidePanel} />
        </div>
      </div>
    </div>
  );
};

export default CaptainRide;
