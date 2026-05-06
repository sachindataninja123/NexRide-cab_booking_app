import React from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { MdLocationPin } from "react-icons/md";
import { RiCheckboxFill } from "react-icons/ri";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const ConfirmRide = ({setconfirmRidePanelOpen}) => {
  return (
    <div>
      <h5
        className="absolute w-[93%] flex items-center justify-center mx-auto text-gray-300 top-2 right-5 "
        onClick={() => setconfirmRidePanelOpen(false)}
      >
        <RiArrowDownWideLine size={26} />
      </h5>
      <h2 className="text-lg font-semibold mb-4">Conifrm your Ride</h2>

      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          className="h-26 w-40 object-cover"
          alt="car"
        />
        <div className="w-full mt-5 ">
          <div className="flex gap-3 justify-start mt-2 items-center">
            <MdLocationPin size={20} />
            <div>
              <h3 className="font-bold text-gray-800 text-lg">562/11-A</h3>
              <p className="text-sm text-gray-500 font-medium">
                Bharat colony, Faridabad, Haryana
              </p>
            </div>
          </div>
          <div className="flex gap-3 border-t pt-2  border-gray-200 justify-start mt-2 items-center">
            <RiCheckboxFill size={20} />
            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                Third Wave Coffee
              </h3>
              <p className="text-sm text-gray-500 font-medium">
                17th Cross Road, PWD Quarters Sarita colony, Badarpur, Delhi
              </p>
            </div>
          </div>
          <div className="flex gap-3 text-gray-800 border-t pt-2 border-gray-200 justify-start mt-2 items-center">
            <RiMoneyRupeeCircleFill size={20} />
            <div>
              <h3 className="font-bold text-lg">562/11-A</h3>
              <p className="text-sm text-gray-500 font-medium">
                Bharat colony, Faridabad, Haryana
              </p>
            </div>
          </div>
        </div>

        <button className="w-full mt-5 bg-green-600 font-semibold p-2 rounded-lg text-white ">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmRide;
