"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../atoms/Logo";
import { Button } from "@nextui-org/react";
import { redirect, useRouter } from "next/navigation";
import { useNavigation } from "@/contexts/NavigationContext";

export default function NavbarCustom() {
  const navigate = useRouter();
  const { scrollToSection } = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.1,
        ease: "power1.out",
        display: "block",
      });
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.1,
        ease: "power1.in",
        onComplete: () => {
          menuRef.current.style.display = "none";
        },
      });
    }
  }, [isMenuOpen]);

  return (
    <nav className="flex bg-white shadow-md h-20 w-full justify-between items-center px-5 lg:px-10 text-montserrat md:top-7 fixed z-[99]">
      <div
        className="flex gap-2 justify-start items-center"
        onClick={() => navigate.push("/landing")}
      >
        <Logo
          path="/assets/images/logo-4.png"
          rounded={false}
          size="190"
        ></Logo>
      </div>
      <ul className="md:flex gap-5 h-full justify-start items-center font-medium hidden">
        <li className="cursor-pointer hover:text-secondaryColor">
          <div
            className="py-2 lg:px-3 "
            onClick={() => scrollToSection("home")}
          >
            <p>Home</p>
          </div>
        </li>

        <li className="cursor-pointer hover:text-secondaryColor">
          <div
            className="py-2 lg:px-3 "
            onClick={() => scrollToSection("about")}
          >
            <p>About</p>
          </div>
        </li>
        <li className="cursor-pointer hover:text-secondaryColor">
          <div
            className="py-2 lg:px-3 "
            onClick={() => scrollToSection("layanan")}
          >
            <p>Layanan</p>
          </div>
        </li>
        <li className="cursor-pointer hover:text-secondaryColor">
          <div
            className="py-2 lg:px-3 "
            onClick={() => scrollToSection("kinerja")}
          >
            <p>Kinerja</p>
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

      <div className="absolute inset-y-0 right-5 flex items-center md:hidden">
        <button
          type="button"
          className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400"
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className={`${isMenuOpen ? "hidden" : "block"} size-6`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <svg
            className={`${isMenuOpen ? "block" : "hidden"} size-6`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div
        ref={menuRef}
        className="hidden absolute top-20 left-0 w-full bg-white shadow-lg z-[98] opacity-0 transform"
      >
        <div className="space-y-1 px-4 pb-3 pt-2">
          <a
            href="#"
            className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          >
            Team
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          >
            Projects
          </a>
          <a
            href="#"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          >
            Calendar
          </a>
        </div>
      </div>
    </nav>
  );
}
