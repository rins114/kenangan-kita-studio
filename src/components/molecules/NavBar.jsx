"use client";
import React, { useEffect, useState } from "react";
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
import { logout } from "@/services/Authentication";
import { showToast } from "@/utils/ShowToast";
import { useAuthUser } from "@/contexts/AuthUserContext";
export default function NavBar({ isMenuOpen, setIsMenuOpen }) {
  const pathname = usePathname();
  const navigate = useRouter();
  const { user } = useAuthUser();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    console.log(user);
    setAuthUser(user);
  }, [user]);

  const handleLogout = async () => {
    const token = localStorage.getItem("access_token");
    const result = await logout(token);
    if (result.status === 500) {
      await showToast("error", "Kesalahan pada server");
      return;
    }
    localStorage.removeItem("access_token");
    window.location.href = "/signin";
  };
  return (
    <Navbar className="shadow-md justify-between bg-white nav-nextui pr-5 py-2 z-[99]">
      {/* <NavbarBrand>
        <Logo></Logo>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand> */}
      <NavbarContent className="flex md:hidden gap-4" justify="start">
        {pathname.startsWith("/dashboard") ? (
          <NavbarItem>
            {isMenuOpen ? (
              <Button
                isIconOnly
                color="default"
                onPress={() => setIsMenuOpen(false)}
                className="!rounded-none !rounded-r-full"
              >
                <IoIosArrowBack className="text-lg" />
              </Button>
            ) : (
              <Button
                isIconOnly
                color="default"
                onPress={() => setIsMenuOpen(true)}
                className="!rounded-none !rounded-r-full"
              >
                <IoIosArrowForward className="text-lg" />
              </Button>
            )}
          </NavbarItem>
        ) : (
          <></>
        )}
      </NavbarContent>

      <NavbarContent
        as="div"
        justify="center"
        className="relative cursor-pointer md:pl-5"
        onClick={() => {
          window.location.href = "/landing";
        }}
      >
        <Logo
          path="/assets/images/logo-4.png"
          rounded={false}
          widthSize="210"
          heightSize="50"
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
              <p className="hidden sm:block">{user?.name}</p>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
            {!["Admin", "Sekretariat", "Penyedia", "Kepala_upbj"].includes(
              authUser?.roles
            ) && (
              <DropdownItem
                key="team_settings"
                onPress={() => {
                  navigate.push("/dashboard/profile");
                }}
              >
                <p className="text-md text-black">Profil Pengguna</p>
              </DropdownItem>
            )}
            <DropdownItem
              key="logout"
              color="danger"
              onPress={() => {
                handleLogout();
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
