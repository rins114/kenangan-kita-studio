"use client";
import React from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/react";

export default function SideBar({ isMenuOpen, setIsMenuOpen }) {
  const navigate = useRouter();
  return (
    <Sidebar
      collapsed={isMenuOpen}
      collapseBehavior="collapse"
      aria-label="Sidebar with multi-level dropdown example"
      className={`z-20 h-screen ${
        !isMenuOpen ? "side" : "sideHide"
      } dark bg-gray-800`}
    >
      {/* <Sidebar.Logo
        href="#"
        img="/assets/images/logo-3.png"
        imgAlt="Flowbite logo"
        className={`flex ${
          !isMenuOpen ? "justify-start" : "justify-center"
        } items-center w-full`}
      >
        Flowbite
      </Sidebar.Logo> */}
      <Sidebar.Items className="mb-5 w-full px-2 flex justify-center items-center border-b-2 border-gray-500 pb-5">
        <div
          className={`flex ${
            isMenuOpen ? "flex-col" : ""
          } w-full gap-3 justify-start items-center text-white`}
        >
          <Avatar
            isBordered
            color="success"
            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
            className="border-2 border-success-500"
          />
          <div className={`${isMenuOpen ? "hidden" : ""}`}>
            <h1 className="text-md">Diaz</h1>
            <p className="text-xs">Non Penyedia</p>
          </div>
        </div>
      </Sidebar.Items>
      <Sidebar.Items className="">
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/beranda" icon={HiChartPie}>
            Beranda
          </Sidebar.Item>
          <Sidebar.Collapse icon={HiShoppingBag} label="Layanan">
            <Sidebar.Item
              href="/beranda/clearing-house"
              icon={isMenuOpen ? HiArrowSmRight : ""}
            >
              Clearing House
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={isMenuOpen ? HiArrowSmRight : ""}>
              Verifikasi Berkas
            </Sidebar.Item>
          </Sidebar.Collapse>
          {/* <Sidebar.Item href="#" icon={HiInbox}>
            
          </Sidebar.Item> */}
          <Sidebar.Item href="#" icon={HiUser}>
            Daftar Permohonan
          </Sidebar.Item>
          {/* <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item> */}
          {/* {[...Array(10)].map((_, index) => (
            <Sidebar.Item key={index} href="#" icon={HiTable}>
              Sign Up {index + 1}
            </Sidebar.Item>
          ))} */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
