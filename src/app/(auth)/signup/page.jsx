"use client";
import Logo from "@/components/atoms/Logo";
import AuthContainer from "@/components/molecules/AuthContainer";
import AuthImage from "@/components/molecules/AuthImage";
import SignUpForm from "@/components/molecules/SignUpForm";
import { register } from "@/services/Authentication";
import { getUserRoles } from "@/services/UserRole";
import { showToast } from "@/utils/ShowToast";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function SignUpPage() {
  const navigate = useRouter();
  const [userRoles, setUserRoles] = useState([]);
  const [userSubRoles, setUserSubRoles] = useState([]);
  const [selectedRolesName, setSelectedRolesName] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState(null);
  const [selectedSubRolesName, setSelectedSubRolesName] = useState(null);
  const [isNonPenyedia, setIsNonPenyedia] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    nama_perusahaan: "",
    nik: "",
    nip: "",
    sk_jabatan: null,
  });

  function handleFormDataChange(event) {
    console.log(event.target);
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleFileChange = async (name, file) => {
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isNonPenyedia) {
      if (!formData.sk_jabatan) {
        await showToast("warning", "SK Jabatan wajib diisi");
        return;
      }
    }

    if (formData.password !== confirmPassword) {
      await showToast("warning", "Konfirmasi Password salah");
      return;
    }

    const result = await register(formData);
    if (result.status !== 201) {
      await showToast("error", "Kesalahan pada server: register");
      return;
    }
    await showToast("success", "Pendaftaran berhasil");
    navigate.push("/signin");
  };

  useEffect(() => {
    async function fetchRoles() {
      const result = await getUserRoles();
      if (result.status !== 200) {
        await showToast("error", "Kesalahan pada server: roles");
        return;
      }
      console.log(result.data);
      setUserRoles(result.data?.roles);
    }
    fetchRoles();
  }, []);

  useEffect(() => {
    if (selectedRolesName) {
      const _selectedUserRoles = userRoles.find(
        (data) => data.name === selectedRolesName
      );

      if (_selectedUserRoles.subroles.length > 0) {
        setSelectedRoles(_selectedUserRoles);
        console.log(_selectedUserRoles);
        setIsNonPenyedia(true);
        setUserSubRoles(_selectedUserRoles.subroles);
      } else {
        setIsNonPenyedia(false);
        setUserSubRoles([]);
        setSelectedSubRolesName(null);
      }
    }
  }, [selectedRolesName]);

  useEffect(() => {
    console.log(userRoles);
  }, [userRoles]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    console.log(selectedRolesName);
  }, [selectedRolesName]);

  useEffect(() => {
    console.log(selectedSubRolesName);
    const combinedRoles = `${selectedRolesName}_${selectedSubRolesName}`;
    console.log(combinedRoles);
  }, [selectedSubRolesName]);

  useEffect(() => {
    if (isNonPenyedia) {
      if (selectedSubRolesName) {
        const combinedRoles = `${selectedRolesName}_${selectedSubRolesName}`;
        setFormData((prevState) => ({
          ...prevState,
          role: combinedRoles,
        }));
        console.log(combinedRoles);
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        role: selectedRolesName,
      }));
    }
    console.log(selectedSubRolesName);
  }, [selectedRolesName, selectedSubRolesName, isNonPenyedia]);

  return (
    <div className="relative flex justify-center items-center h-screen bg-zinc-100 w-full">
      <div className="absolute h-full w-full">
        <Image
          src="/assets/images/authimg.jpg"
          width={1000}
          height={1000}
          className="w-full h-full"
          alt="auth img"
        ></Image>
      </div>
      <div className="absolute h-full w-full bg-black opacity-50"></div>
      <div className="top-2 left-2 fixed">
        <Button
          className="p-1 bg-transparent"
          isIconOnly
          onPress={() => navigate.push("/landing")}
        >
          <IoClose className="text-3xl text-gray-500"></IoClose>
        </Button>
      </div>
      <section className="flex flex-col justify-center items-center w-full md:w-1/2 h-full px-2 sm:px-5">
        <AuthContainer maxWidth="60rem" classMinWidth="sm:min-w-[40rem]">
          {/* <Logo size={150} bordered></Logo> */}
          <div className="md:w-1/3 justify-center items-center flex flex-col gap-1 mb-3">
            <h1 className="text-2xl">Daftar Akun</h1>
            <hr className="border-2 w-1/2 border-mainColor" />
          </div>
          <SignUpForm
            handleRegister={handleRegister}
            formData={formData}
            setFormData={setFormData}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleFormDataChange={handleFormDataChange}
            handleFileChange={handleFileChange}
            userRoles={userRoles}
            userSubRoles={userSubRoles}
            selectedRolesName={selectedRolesName}
            setSelectedRolesName={setSelectedRolesName}
            selectedSubRolesName={selectedSubRolesName}
            setSelectedSubRolesName={setSelectedSubRolesName}
          />
        </AuthContainer>
      </section>
      {/* <AuthImage></AuthImage> */}
    </div>
  );
}
