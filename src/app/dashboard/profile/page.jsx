"use client";
import { usePathname, useRouter } from "next/navigation";
import UserDataForm from "@/components/molecules/UserDataForm";
import { Avatar, Button, Input } from "@nextui-org/react";
import React, { useState, useRef } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";

export default function ProfilePage() {
  const navigate = useRouter();
  const pathname = usePathname();
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isNameEditMode, setIsNameEditMode] = React.useState(false);
  const [username, setUsername] = React.useState("John Doe");
  const topRef = useRef(null);

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="p-5 w-full ">
      {" "}
      <div ref={topRef}></div>
      <div
        className="flex flex-col border-2 min-h-96 rounded-md justify-start items-center p-5 shadow-md bg-white"
        // onClick={() => setIsNameEditMode(false)}
      >
        <Avatar
          showFallback
          src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          className="h-20 w-20 md:h-48 md:w-48 mb-3"
        />
        {isNameEditMode ? (
          <div
            className="flex justify-center items-center w-1/3"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={() => setIsNameEditMode(false)}
              className="flex gap-2 justify-center items-center w-full "
            >
              <Input
                type="text"
                size="sm"
                variant="underlined"
                className="w-60"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </form>
          </div>
        ) : (
          <div className="flex gap-2 justify-center items-center pl-11">
            <h1 className="text-2xl lg:text-4xl">{username}</h1>
            <Button
              isIconOnly
              size="sm"
              color="transparent"
              className="flex justify-center items-center"
              onClick={() => setIsNameEditMode(true)}
            >
              <FaRegEdit className="text-xl mb-1 text-warning-500" />
            </Button>
          </div>
        )}
        <p className="text-success-500 mt-1 text-sm md:text-lg">
          johndoe@example.com
        </p>

        <section className="flex mt-5 w-full flex-col">
          <div className="flex justify-start items-center gap-3">
            <h1 className="pb-1 border-b-3 border-success-500 text-md lg:text-lg font-bold">
              PROFIL PENGGUNA
            </h1>
          </div>

          <UserDataForm
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          ></UserDataForm>
        </section>

        <div className="flex flex-col xs:flex-row gap-5 justify-end">
          {!isEditMode ? (
            <Button
              size="l"
              color="warning"
              className="flex justify-center items-center text-white "
              onClick={() => {
                setIsEditMode(true);
                scrollToTop();
              }}
            >
              Ubah Data
            </Button>
          ) : (
            <Button
              size="l"
              color="success"
              className="flex justify-center items-center text-white"
              onClick={() => {
                setIsEditMode(false);
                scrollToTop();
              }}
            >
              Simpan Data
            </Button>
          )}

          <Button
            onClick={() => {
              navigate.push("/dashboard/profile/ganti-password");
            }}
            className={`${
              isEditMode ? "hidden" : "flex"
            } flex-col gap-2 bg-danger-500 text-white font-medium`}
          >
            Ganti Password
          </Button>
        </div>
      </div>
    </div>
  );
}
