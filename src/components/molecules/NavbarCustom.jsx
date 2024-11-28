"use client";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../atoms/Logo";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
export default function NavbarCustom() {
  const navigate = useRouter();
  return (
    <nav className="flex shadow-md h-20 w-full justify-between items-center px-7 text-montserrat">
      <div className="flex gap-2 justify-start items-center">
        <Logo
          path="/assets/images/logo-4.png"
          rounded={false}
          size="200"
        ></Logo>
        {/* <div className="flex flex-col justify-center items-start">
          <h1 className="text-xl font-bold">SIMPRO PBJ</h1>
          <span>Kabupaten Sumbawa</span>
        </div> */}
      </div>
      <ul className="flex gap-5 h-full justify-start items-center font-medium">
        <li className="cursor-pointer hover:text-gray-500">
          <div className="py-2 px-3">
            <a href="">Home</a>
          </div>
        </li>

        <li className="h-full">
          <div className="group relative cursor-pointer h-full flex flex-col justify-start items-end hover:text-gray-500">
            <div className="flex items-center justify-center bg-white gap-2 h-full">
              <a className="menu-hover">Layanan Kami</a>
              <span className="h-full flex justify-center items-center mt-1">
                <IoIosArrowDown />
              </span>
            </div>
            <div className="absolute z-50 flex max-w-96 min-w-48 overflow-hidden flex-col bg-white text-black border-1 transition-all duration-300 ease-in-out transform scale-y-0 opacity-0 origin-top group-hover:scale-y-100 group-hover:opacity-100 top-16">
              <a className="block font-medium hover:bg-gray-200 w-full h-full p-3">
                Clearing House
              </a>
              <a className="block font-medium hover:bg-gray-200 w-full h-full p-3">
                Verifikasi Berkas
              </a>
            </div>
          </div>
        </li>
        <li className="cursor-pointer hover:text-gray-500">
          <div className="py-2 px-3">
            <a href="">About</a>
          </div>
        </li>
        <li className="cursor-pointer hover:text-gray-500">
          <div className="py-2 px-3">
            <a href="">Contact</a>
          </div>
        </li>
        <li>
          <Button
            className="!rounded-md font-medium bg-mainColor text-white px-7"
            onClick={() => navigate.push("/signin")}
          >
            Masuk
          </Button>
        </li>
      </ul>
    </nav>
  );
}
