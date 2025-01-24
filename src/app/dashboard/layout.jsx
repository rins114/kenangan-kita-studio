"use client";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import NavBar from "@/components/molecules/NavBar";
import SideBar from "@/components/molecules/SideBar";
import React from "react";

export default function DashboardLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <div className="flex bg-gray-100 text-poppins">
      <div
        className={`flex flex-row bg-slate-100/0 fixed md:relative translate-x-0 top-0 md:left-0 z-20 transform transition-all ease-in-out duration-300 ${
          isMenuOpen ? "left-0" : "-left-[16.5rem]"
        } md:flex z-[80]`}
      >
        <SideBar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        ></SideBar>
      </div>
      <div className="relative w-full flex flex-col overflow-y-auto h-screen">
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } absolute w-full h-full bg-black/50 z-[50] transition-all duration-300`}
        ></div>
        <div className="w-full">
          <NavBar
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          ></NavBar>
          <div className="px-5 pt-5 flex gap-1">
            <Breadcrumb></Breadcrumb>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
