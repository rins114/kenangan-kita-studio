"use client";
import { usePathname, useRouter } from "next/navigation";
import UserDataForm from "@/components/molecules/UserDataForm";
import { Avatar, Button, Input } from "@nextui-org/react";
import React, { useState, useRef, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { useAuthUser } from "@/contexts/AuthUserContext";
import { updateUserProfile } from "@/services/Users";
import { showToast } from "@/utils/ShowToast";
const TOKEN = localStorage.getItem("access_token");

export default function ProfilePage() {
  const navigate = useRouter();
  const pathname = usePathname();
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [isNameEditMode, setIsNameEditMode] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const topRef = useRef(null);
  const { user, toggleUpdate, setToggleUpdateAuth } = useAuthUser();
  const [formData, setFormData] = useState({
    alamat: "",
    no_npwp: "",
    no_telp: "",
    name: "",
  });
  useEffect(() => {
    setUsername(user?.name);
    setFormData((prev) => ({
      ...prev,
      name: user?.name,
      alamat: user?.pemohon?.alamat_perusahaan,
      no_npwp: user?.pemohon?.no_npwp,
      no_telp: user?.pemohon?.no_telp ?? "-",
    }));
  }, [user]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  async function handleUpdateProfile() {
    const result = await updateUserProfile(TOKEN, formData);
    console.log(result);
    if (result.status !== 200) {
      await showToast("error", result.message);
      return;
    }
    setToggleUpdateAuth(!toggleUpdate);
    setIsNameEditMode(false);
  }

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
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProfile();
              }}
              className="flex gap-2 justify-center items-center w-full "
            >
              <Input
                type="text"
                size="sm"
                variant="underlined"
                className="w-60"
                value={formData?.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </form>
          </div>
        ) : (
          <div className="flex gap-2 justify-center items-center pl-11">
            <h1 className="text-2xl lg:text-4xl">{formData?.name}</h1>
            <Button
              isIconOnly
              size="sm"
              color="transparent"
              className="flex justify-center items-center"
              onPress={() => setIsNameEditMode(true)}
            >
              <FaRegEdit className="text-xl mb-1 text-warning-500" />
            </Button>
          </div>
        )}
        <p className="text-success-500 mt-1 text-sm md:text-lg">
          {user?.email}
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
            fixedData={user?.pemohon}
            formData={formData}
            setFormData={setFormData}
          ></UserDataForm>
        </section>

        <div className="flex flex-col xs:flex-row gap-5 justify-end">
          {!isEditMode ? (
            <Button
              size="l"
              color="warning"
              className="flex justify-center items-center text-white "
              onPress={() => {
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
              onPress={() => {
                setIsEditMode(false);
                scrollToTop();
                handleUpdateProfile();
              }}
            >
              Simpan Data
            </Button>
          )}

          <Button
            onPress={() => {
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
