"use client";
import React from "react";
import Logo from "../atoms/Logo";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  Button,
} from "@nextui-org/react";
import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
export default function NavBar({ isMenuOpen, setIsMenuOpen }) {
  const pathname = usePathname();
  const navigate = useRouter();
  return (
    <Navbar className="shadow-md justify-between bg-white nav-nextui pr-5">
      {/* <NavbarBrand>
        <Logo></Logo>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand> */}
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        {pathname.startsWith("/beranda") ? (
          <NavbarItem>
            {isMenuOpen ? (
              <Button
                isIconOnly
                color="default"
                onClick={() => setIsMenuOpen(false)}
                className="!rounded-none !rounded-r-full"
              >
                <IoIosArrowForward  className="text-lg"/>
              </Button>
            ) : (
              <Button
                isIconOnly
                color="default"
                onClick={() => setIsMenuOpen(true)}
                className="!rounded-none !rounded-r-full"
              >
                <IoIosArrowBack className="text-lg"/>
              </Button>
            )}
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              <Link color="foreground" href="#">
                Features
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="#" aria-current="page" color="secondary">
                Customers
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Integrations
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarContent 
        as="div" 
        justify="center" 
        className="relative cursor-pointer" 
        onClick={() => {navigate.push("/landing");}}>
        <Logo
          path="/assets/images/logo-4.png"
          rounded={false}
          widthSize="210"
          heightSize="55"
        ></Logo>
      </NavbarContent>

      <NavbarContent as="div" justify="end" className="relative">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="flex justify-center items-center gap-4 cursor-pointer">
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
              <p>Diaz</p>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem
              key="team_settings"
              onClick={() => {
                navigate.push("/beranda/profile");
              }}
            >
              <p className="text-md text-black">Profil Pengguna</p>
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={() => {
                navigate.push("/signin");
              }}
            >
              <p className="text-md text-danger-500">Keluar</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
