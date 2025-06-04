import React from "react";
import SiginOut from "./SiginOut";

const AppBar = () => {
  return (
    <nav className="w-[100%] flex flex-row items-center justify-between p-3">
      <div className="flex flex-row items-center gap-2">
        <img
          src="/logo.png"
          className="w-[100px] h-[40px] md:w-[120px] md:h-[40px]"
        ></img>
        <div className="text-gray-500 mt-3 text-[16px] md:text-[17px] mb-1">
          Status
        </div>
      </div>
      <SiginOut />
    </nav>
  );
};

export default AppBar;
