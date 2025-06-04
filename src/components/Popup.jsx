import React from "react";
import { HiX } from "react-icons/hi";

const Popup = ({ close, onClose, details }) => {
  return (
    <div className="absolute w-[100%] h-[40%] top-[50%] overflow-hidden">
      <div
        className={`h-auto w-[40%] flex flex-col fixed top-1/2 left-1/2
          -translate-y-1/2 -translate-x-1/2 transform bg-white border-[2px] border-gray-200 p-10 shadow-md text-[16px] rounded-2xl
          transition-transform duration-500 ease-in-out
           ${close ? "-translate-x-1/2" : "-translate-x-[250%]"}`}
      >
        <div className="flex justify-end">
          <HiX
            size={24}
            className="cursor-pointer text-black hover:text-gray-500"
            onClick={onClose}
          />
        </div>
        {details && (
          <>
            <div className="mt-4 font-bold text-[18px]">Server Details</div>
            <div className="flex flex-col gap-5 ">
              <div className="flex flex-row items-center gap-4 mt-10">
                <div className="text-[17px] font-bold flex-1">Name: </div>
                <div className="text-[16px] text-green-500 font-bold">
                  {details.name}
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="text-[17px] font-bold flex-1">IP Address: </div>
                <div className="text-[16px] text-green-500 font-bold">
                  {details.ip}
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="text-[17px] font-bold flex-1">
                  Response Time:{" "}
                </div>
                <div className="text-[16px] text-green-500 font-bold">
                  {details.responseTime}
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                <div className="text-[17px] font-bold flex-1">Uptime: </div>
                <div className="text-[16px] text-green-500 font-bold">
                  {details.uptime}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;
