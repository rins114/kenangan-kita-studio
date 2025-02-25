"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../atoms/Logo";
import { Avatar, Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useNavigation } from "@/contexts/NavigationContext";
import { useAuthUser } from "@/contexts/AuthUserContext";

export default function NavbarCustom() {
  const navigate = useRouter();
  const pathname = usePathname();
  const { scrollToSection } = useNavigation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuthUser();

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  useEffect(() => {
    console.log(user);
  }, [user]);
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
          path="/assets/images/logonew.png"
          rounded={false}
          widthSize="210"
          heightSize="55"
        ></Logo>
      </div>
      <ul className="md:flex gap-5 h-full justify-start items-center font-semibold hidden">
        <li
          className={`cursor-pointer hover:text-secondaryColor ${
            pathname === "/landing" ? "text-secondaryColor" : ""
          }`}
        >
          <div
            className="py-2 lg:px-3"
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
            className="py-2 lg:px-3"
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
            className="py-2 lg:px-3"
            onClick={() => navigate.push("/landing/galeri")}
          >
            <p>GALERI</p>
          </div>
        </li>
        <li>
          {!isAuthenticated ? (
            <Button
              className="bg-secondaryColor rounded-full !text-white font-semibold py-2 px-5"
              onPress={() => navigate.push("/signin")}
            >
              MASUK
            </Button>
          ) : (
            <div
              className="cursor-pointer rounded-full border-2 border-secondaryColor h-10 w-10 flex justify-center items-center overflow-hidden"
              onClick={() => (window.location.href = "/dashboard")}
            >
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="default"
                size="sm"
              ></Avatar>
              {/* <h1 className="!font-normal">
                Logged in as{" "}
                <span className="text-secondaryColor">{user?.name}</span>
              </h1> */}
            </div>
          )}
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
          <>
            {!isAuthenticated ? (
              <div className="block rounded-md px-3 py-2">
                <Button
                  className="!w-full font-bold bg-secondaryColor text-white text-base py-2"
                  onPress={() => (window.location.href = "/signin")}
                >
                  MASUK
                </Button>
              </div>
            ) : (
              <div
                className="flex flex-row gap-3 justify-start items-center cursor-pointer px-2 mb-2"
                onClick={() => (window.location.href = "/dashboard")}
              >
                <Avatar></Avatar>
                <h1>{user?.name}</h1>
              </div>
            )}
            <div
              className={`block rounded-md px-3 py-2 text-base font-bold text-gray-700 hover:bg-gray-200 hover:text-gray-900 cursor-pointer ${
                pathname === "/landing" ? "text-secondaryColor" : ""
              }`}
              onClick={() => {
                setIsMenuOpen(false);
                navigate.push("/landing");
              }}
            >
              BERANDA
            </div>
            <div
              className={`block rounded-md px-3 py-2 text-base font-bold text-gray-700 hover:bg-gray-200 hover:text-gray-900 cursor-pointer ${
                pathname === "/landing/peraturan" ? "text-secondaryColor" : ""
              }`}
              onClick={() => {
                setIsMenuOpen(false);
                navigate.push("/landing/peraturan");
              }}
            >
              PERATURAN
            </div>
            <div
              className={`block rounded-md px-3 py-2 text-base font-bold text-gray-700 hover:bg-gray-200 hover:text-gray-900 cursor-pointer ${
                pathname === "/landing/galeri" ? "text-secondaryColor" : ""
              }`}
              onClick={() => {
                setIsMenuOpen(false);
                navigate.push("/landing/galeri");
              }}
            >
              GALERI
            </div>
          </>
        </div>
      </div>
    </nav>
  );
}
