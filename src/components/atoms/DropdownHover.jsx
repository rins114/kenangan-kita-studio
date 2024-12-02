import React from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function DropdownHover({ mainText = "Layanan", children }) {
  return (
    <div className="group relative cursor-pointer h-full flex flex-col justify-start items-end hover:text-secondaryColor">
      <div className="flex items-center justify-center gap-2 h-full">
        <a className="menu-hover">Layanan Kami</a>
        <span className="h-full flex justify-center items-center mt-1">
          <IoIosArrowDown />
        </span>
      </div>
      <div className="absolute z-50 flex max-w-96 min-w-48 overflow-hidden flex-col bg-white text-black border-1 transition-all duration-300 ease-in-out transform scale-y-0 opacity-0 origin-top group-hover:scale-y-100 group-hover:opacity-100 top-16">
        {children}
      </div>
    </div>
  );
}
