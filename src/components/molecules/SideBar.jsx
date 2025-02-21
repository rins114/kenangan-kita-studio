"use client";
import React, { useEffect } from "react";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiUser } from "react-icons/hi";
import { usePathname, useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/react";
import { useAuthUser } from "@/contexts/AuthUserContext";
import { IoDocumentsSharp } from "react-icons/io5";
import { FaClipboardList, FaListUl, FaImages, FaImage } from "react-icons/fa";
import { MdOutlineFeaturedPlayList } from "react-icons/md";
import useLogin from "@/hooks/useLogin";
import Swal from "sweetalert2";

export default function SideBar({ isMenuOpen, setIsMenuOpen }) {
  const navigate = useRouter();
  const { user, isAuthenticated } = useAuthUser();
  const { isLoading } = useLogin();
  const pathname = usePathname();
  return (
    <Sidebar
      // collapsed={true}
      // collapseBehavior="collapse"
      aria-label="Sidebar with multi-level dropdown example"
      className={`z-20 h-screen ${
        !isMenuOpen ? "side" : "sideHide"
      } dark bg-gray-800 z-20 top-20 md:top-0 relative`}
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
            isMenuOpen ? "" : ""
          } w-full gap-3 justify-start items-center text-white`}
        >
          <Avatar
            isBordered
            color="success"
            src="https://i.pravatar.cc/150?u=a04258114e29026302d"
            className="border-2 border-success-500"
          />

          <div className={`${isMenuOpen ? "" : ""}`}>
            <h1 className="text-md">{user?.name}</h1>
            <p className="text-xs">
              {user?.roles?.startsWith("Non_Penyedia_")
                ? user?.roles.split("_")[2]
                : user?.roles}
            </p>
          </div>
        </div>
      </Sidebar.Items>

      <Sidebar.Items className="">
        <Sidebar.ItemGroup>
          <Sidebar.Item
            className={`${
              pathname === "/dashboard" ? "bg-slate-500/40" : ""
            } cursor-pointer`}
            onClick={() => {
              navigate.push("/dashboard");
            }}
            icon={HiChartPie}
          >
            Dashboard
          </Sidebar.Item>

          {user?.roles !== "Admin" &&
            user?.roles !== "Sekretariat" &&
            user?.roles !== "Kepala_upbj" && (
              <Sidebar.Collapse
                icon={MdOutlineFeaturedPlayList}
                label="Layanan"
              >
                <Sidebar.Item
                  onClick={() => {
                    navigate.push("/dashboard/clearing-house");
                  }}
                  icon={isMenuOpen ? "" : ""}
                  className={`cursor-pointer ${
                    pathname === "/dashboard/clearing-house"
                      ? "bg-slate-500/40"
                      : ""
                  }`}
                >
                  Clearing House
                </Sidebar.Item>

                <Sidebar.Item
                  onClick={() => {
                    Swal.fire({
                      title: "Peringatan!",
                      text: "Layanan dalam pengembangan",
                      icon: "warning",
                      confirmButtonColor: "#3085d6",
                    });
                    // navigate.push("/dashboard/verifikasi-berkas");
                  }}
                  icon={isMenuOpen ? "" : ""}
                  className={`cursor-pointer ${
                    pathname === "/dashboard/verifikasi-berkas"
                      ? "bg-slate-500/40"
                      : ""
                  }`}
                >
                  Verifikasi Berkas
                </Sidebar.Item>
              </Sidebar.Collapse>
            )}
          {/* <Sidebar.Item href="#" icon={HiInbox}>
            
          </Sidebar.Item> */}
          <Sidebar.Item
            className={`${
              pathname === "/dashboard/permohonan" ? "bg-slate-500/40" : ""
            } cursor-pointer`}
            onClick={() => {
              navigate.push("/dashboard/permohonan");
            }}
            icon={FaListUl}
          >
            Daftar Permohonan
          </Sidebar.Item>

          {user?.roles === "Admin" && (
            <Sidebar.Item
              className={`${
                pathname === "/dashboard/users" ? "bg-slate-500/40" : ""
              } cursor-pointer`}
              onClick={() => {
                navigate.push("/dashboard/users");
              }}
              icon={HiUser}
            >
              Daftar Pengguna
            </Sidebar.Item>
          )}

          {user?.roles === "Admin" && (
            <Sidebar.Item
              className={`${
                pathname === "/dashboard/dokumen" ? "bg-slate-500/40" : ""
              } cursor-pointer`}
              onClick={() => {
                navigate.push("/dashboard/dokumen");
              }}
              icon={IoDocumentsSharp}
            >
              Dokumen Peraturan
            </Sidebar.Item>
          )}

          {user?.roles === "Admin" && (
            <Sidebar.Item
              className={`${
                pathname === "/dashboard/upgaleri" ? "bg-slate-500/40" : ""
              } cursor-pointer`}
              onClick={() => {
                navigate.push("/dashboard/upgaleri");
              }}
              icon={FaImage}
            >
              Foto Galeri
            </Sidebar.Item>
          )}

          {user?.roles === "Admin" && (
            <Sidebar.Item
              className={`${
                pathname === "/dashboard/upslider" ? "bg-slate-500/40" : ""
              } cursor-pointer`}
              onClick={() => {
                navigate.push("/dashboard/upslider");
              }}
              icon={FaImages}
            >
              Foto Slider
            </Sidebar.Item>
          )}

          {user?.roles === "Kepala_upbj" && (
            <Sidebar.Item
              className={`${
                pathname === "/dashboard/daftar-laporan"
                  ? "bg-slate-500/40"
                  : ""
              } cursor-pointer`}
              onClick={() => {
                navigate.push("/dashboard/daftar-laporan");
              }}
              icon={FaClipboardList}
            >
              Daftar Laporan
            </Sidebar.Item>
          )}

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
