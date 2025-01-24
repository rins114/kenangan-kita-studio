"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../atoms/Logo";
import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useNavigation } from "@/contexts/NavigationContext";

export default function NavbarCustom() {
  const navigate = useRouter();
  const pathname = usePathname();
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
    <nav className="flex bg-white shadow-md h-20 w-full justify-between items-center px-5 lg:px-10 text-poppins md:top-7 fixed z-[99]">
      <div
        className="flex gap-2 justify-start items-center"
        onClick={() => navigate.push("/landing")}
      >
        <Logo
          path="/assets/images/logo-4.png"
          rounded={false}
          widthSize="210"
          heightSize="55"
        ></Logo>
      </div>
      {!pathname.startsWith("/landing/peraturan") && (
        <ul className="md:flex gap-5 h-full justify-start items-center font-bold hidden">
          <li
            className={`cursor-pointer hover:text-secondaryColor ${
              pathname === "/landing" ? "text-secondaryColor" : ""
            }`}
          >
            <div
              className="py-2 lg:px-3 font-bold"
              onClick={() => scrollToSection("home")}
            >
              <p>BERANDA</p>
            </div>
          </li>
          <li
            className={`cursor-pointer hover:text-secondaryColor ${
              pathname === "/landing/peraturan" ? "text-secondaryColor" : ""
            }`}
          >
            <div
              className="py-2 lg:px-3 font-bold"
              onClick={() => navigate.push("/landing/peraturan")}
            >
              <p>PERATURAN</p>
            </div>
          </li>
          <li
            className={`cursor-pointer hover:text-secondaryColor ${
              pathname === "/landing/galeri" ? "text-secondaryColor" : ""
            }`}
          >
            <div
              className="py-2 lg:px-3 font-bold"
              onClick={() => navigate.push("/landing/galeri")}
            >
              <p>GALERI</p>
            </div>
          </li>
          <li>
            <Button
              className="!rounded-3xl bg-mainColor text-white px-7 font-bold shadow-xl"
              onClick={() => navigate.push("/signin")}
            >
              MASUK
            </Button>
          </li>
        </ul>
      )}
      {pathname.startsWith("/landing/peraturan") && (
        <ul className="md:flex gap-5 h-full justify-start items-center font-bold hidden">
          <li
            className={`cursor-pointer hover:text-secondaryColor ${
              pathname === "/landing" ? "text-secondaryColor" : ""
            }`}
          >
            <div
              className="py-2 lg:px-3 font-bold"
              onClick={() => navigate.push("/landing")}
            >
              <p>BERANDA</p>
            </div>
          </li>
          <li
            className={`cursor-pointer hover:text-secondaryColor ${
              pathname === "/landing/peraturan" ? "text-secondaryColor" : ""
            }`}
          >
            <div
              className="py-2 lg:px-3 font-bold"
              onClick={() => navigate.push("/landing/peraturan")}
            >
              <p>PERATURAN</p>
            </div>
          </li>
          <li
            className={`cursor-pointer hover:text-secondaryColor ${
              pathname === "/landing/galeri" ? "text-secondaryColor" : ""
            }`}
          >
            <div
              className="py-2 lg:px-3 font-bold"
              onClick={() => navigate.push("/landing/galeri")}
            >
              <p>GALERI</p>
            </div>
          </li>
          <li>
            <Button
              className="!rounded-md font-bold bg-mainColor text-white px-7"
              onClick={() => navigate.push("/signin")}
            >
              MASUK
            </Button>
          </li>
        </ul>
      )}

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
          {!pathname.startsWith("/landing/peraturan") && (
            <>
              <div
                className={`block rounded-md px-3 py-2 text-base font-bold text-gray-700 hover:bg-gray-200 hover:text-gray-900 cursor-pointer ${
                  pathname === "/landing" ? "text-secondaryColor" : ""
                }`}
                onClick={() => scrollToSection("home")}
              >
                BERANDA
              </div>
              <div
                className={`block rounded-md px-3 py-2 text-base font-bold text-gray-700 hover:bg-gray-200 hover:text-gray-900 cursor-pointer ${
                  pathname === "/landing/peraturan" ? "text-secondaryColor" : ""
                }`}
                onClick={() => navigate.push("/landing/peraturan")}
              >
                PERATURAN
              </div>
              <div
                className={`block rounded-md px-3 py-2 text-base font-bold text-gray-700 hover:bg-gray-200 hover:text-gray-900 cursor-pointer ${
                  pathname === "/landing/galeri" ? "text-secondaryColor" : ""
                }`}
                onClick={() => navigate.push("/landing/galeri")}
              >
                GALERI
              </div>
            </>
          )}
          <div className="block rounded-md px-3 py-2">
            <Button
              className="!w-full font-bold bg-mainColor text-white text-base py-2"
              onClick={() => navigate.push("/signin")}
            >
              MASUK
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
