"use client";
import UserDataForm from "@/components/molecules/UserDataForm";
import { Avatar, Button, Input } from "@nextui-org/react";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";

export default function ProfilePage() {
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isNameEditMode, setIsNameEditMode] = React.useState(false);
  const [username, setUsername] = React.useState("Jane Doe");
  return (
    <div className="p-5 w-full ">
      {" "}
      <div
        className="flex flex-col border-2 min-h-96 rounded-md justify-start items-center p-5 shadow-md bg-white"
        // onClick={() => setIsNameEditMode(false)}
      >
        <Avatar
          showFallback
          src="https://i.pravatar.cc/150?u=a04258114e29026708c"
          className="h-48 w-48 mb-3"
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
            <h1 className="text-4xl">{username}</h1>
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
        <p className="text-success-500 mt-1">xyz@example.com</p>
        <section className="flex mt-5 w-full flex-col">
          <div className="flex justify-start items-center gap-3">
            <h1 className="pb-1 border-b-3 border-success-500 text-lg font-medium">
              Data User Penyedia
            </h1>
            {!isEditMode ? (
              <Button
                isIconOnly
                size="sm"
                color="warning"
                className="flex justify-center items-center"
                onClick={() => setIsEditMode(true)}
              >
                <FaRegEdit className="text-xl mb-1 text-white" />
              </Button>
            ) : (
              <Button
                isIconOnly
                size="sm"
                color="success"
                className="flex justify-center items-center"
                onClick={() => setIsEditMode(false)}
              >
                <IoIosSave className="text-xl mb-1 text-white" />
              </Button>
            )}
          </div>

          <UserDataForm
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          ></UserDataForm>
        </section>
      </div>
    </div>
  );
}
