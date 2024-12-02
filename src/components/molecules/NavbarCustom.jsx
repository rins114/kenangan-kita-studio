"use client";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../atoms/Logo";
import { Button } from "@nextui-org/react";
import { redirect, useRouter } from "next/navigation";
import { useNavigation } from "@/contexts/NavigationContext";
import DropdownHover from "../atoms/DropdownHover";
import DropdownHoverItem from "../atoms/DropdownHoverItem";
export default function NavbarCustom() {
  const navigate = useRouter();
  const { scrollToSection } = useNavigation();
  return (
    <nav className="flex bg-white shadow-md h-20 w-full justify-between items-center px-10 text-montserrat top-7 fixed z-[99]">
      <div
        className="flex gap-2 justify-start items-center"
        onClick={() => navigate.push("/landing")}
      >
        <Logo
          path="/assets/images/logo-4.png"
          rounded={false}
          size="190"
        ></Logo>
        {/* <div className="flex flex-col justify-center items-start">
          <h1 className="text-xl font-bold">SIMPRO PBJ</h1>
          <span>Kabupaten Sumbawa</span>
        </div> */}
      </div>
      <ul className="flex gap-5 h-full justify-start items-center font-medium">
        <li className="cursor-pointer hover:text-secondaryColor">
          <div className="py-2 px-3" onClick={() => scrollToSection("home")}>
            <p>Home</p>
          </div>
        </li>

        <li className="h-full">
          <DropdownHover>
            <DropdownHoverItem>Clearing House</DropdownHoverItem>
            <DropdownHoverItem>Verifikasi Berkas</DropdownHoverItem>
          </DropdownHover>
        </li>
        <li className="cursor-pointer hover:text-secondaryColor">
          <div className="py-2 px-3" onClick={() => scrollToSection("about")}>
            <p>About</p>
          </div>
        </li>
        <li className="cursor-pointer hover:text-secondaryColor">
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
