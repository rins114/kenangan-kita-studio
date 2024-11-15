"use client";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import NavBar from "@/components/molecules/NavBar";
import SideBar from "@/components/molecules/SideBar";
import SideBar2 from "@/components/molecules/SideBar2";
import React from "react";

export default function DashboardLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(true);
  return (
    <div className="flex bg-gray-100">
      <SideBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}></SideBar>
      <div className="w-full flex flex-col overflow-y-auto h-screen">
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
