"use client";
import React, { useEffect } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  FaTableList,
} from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/react";
import { useAuthUser } from "@/contexts/AuthUserContext";
import { IoDocumentsSharp } from "react-icons/io5";
import { FaList, FaListUl } from "react-icons/fa";
import { MdOutlineFeaturedPlayList } from "react-icons/md";

export default function SideBar({ isMenuOpen, setIsMenuOpen }) {
  const navigate = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthUser();
  useEffect(() => {
    function fetchUser() {
      if (isLoading) {
        return;
      }
      console.log(user);
    }
    fetchUser();
  }, [user, isLoading]);
  return (
    <Sidebar
      collapsed={isMenuOpen}
      collapseBehavior="collapse"
      aria-label="Sidebar with multi-level dropdown example"
      className={`z-20 h-screen ${
        !isMenuOpen ? "side" : "sideHide"
      } dark bg-gray-800 z-20`}
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
          <Sidebar.Item href="/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Collapse icon={MdOutlineFeaturedPlayList} label="Layanan">
            <Sidebar.Item
              href="/dashboard/clearing-house"
              icon={isMenuOpen ? HiArrowSmRight : ""}
            >
              Clearing House
            </Sidebar.Item>
            <Sidebar.Item
              href="/dashboard/verifikasi-berkas"
              icon={isMenuOpen ? HiArrowSmRight : ""}
            >
              Verifikasi Berkas
            </Sidebar.Item>
          </Sidebar.Collapse>
          {/* <Sidebar.Item href="#" icon={HiInbox}>
            
          </Sidebar.Item> */}
          <Sidebar.Item href="/dashboard/permohonan" icon={FaListUl}>
            Daftar Permohonan
          </Sidebar.Item>
          <Sidebar.Item href="/dashboard/dokumen" icon={IoDocumentsSharp}>
            Dokumen Peraturan
          </Sidebar.Item>
          {/* <Sidebar.Item href="#" icon={HiArrowSmRight}>
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
