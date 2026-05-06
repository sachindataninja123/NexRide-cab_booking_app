import React from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { MdLocationPin } from "react-icons/md";
import { RiCheckboxFill } from "react-icons/ri";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const WaitingforDrivers = ({setWaitingForDriver}) => {
  return (
    <div>
      <h5
        className="absolute w-[93%] flex items-center justify-center mx-auto text-gray-300 top-2 right-5 "
        onClick={() => setWaitingForDriver(false)}
      >
        <RiArrowDownWideLine size={26} />
      </h5>

      <div className="flex items-center justify-between p-3  rounded-xl shadow-sm">
        <div className="relative flex items-center">
          <img
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            className="h-18 w-30 object-contain"
            alt="car"
          />

          <img
            className="absolute left-1 top-5 w-12 h-12 rounded-full object-cover border-2 border-white shadow"
            src="https://plus.unsplash.com/premium_photo-1691032016317-639a11f71b85?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwZHJpdmVyfGVufDB8fDB8fHww"
            alt="driver"
          />
        </div>

        <div className="text-right">
          <h2 className="text-lg font-medium">Sachin</h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">BR29 AF 2363</h4>
          <p className="text-sm text-gray-700">Maruti Suzuki 800</p>
        </div>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
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
      </div>
    </div>
  );
};

export default WaitingforDrivers;
