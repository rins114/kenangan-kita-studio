"use client";
import { usePathname, useRouter } from "next/navigation";
import GantiPassForm from "@/components/molecules/GantiPassForm";
import { Avatar, Button, Input } from "@nextui-org/react";
import React, { useState, useRef } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";

export default function GantiPass() {
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
        <section className="flex mt-5 w-full flex-col">
          <div className="flex justify-center items-center gap-3">
            <h1 className="pb-1 border-b-3 border-success-500 text-lg font-bold">
              GANTI PASSWORD
            </h1>
          </div>

          <GantiPassForm
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          ></GantiPassForm>
        </section>

        {/* <div className="flex gap-5 justify-end">
          <Button
            size="l"
            color="warning"
            className="flex justify-center items-center text-white"
            onClick={() => {
              navigate.push("/dashboard/profile");
            }}
          >
            Ubah Data
          </Button>

          <Button
            type="submit"
            className={`${
              isEditMode ? "hidden" : "flex"
            } flex-col gap-2 bg-danger-500 text-white font-medium`}
          >
            Ganti Password
          </Button>
        </div> */}
      </div>
    </div>
  );
}
