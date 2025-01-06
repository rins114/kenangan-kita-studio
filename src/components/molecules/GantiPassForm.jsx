"use client";
import { Button, CircularProgress, Input } from "@nextui-org/react";
import { FileInput, Label } from "flowbite-react";
import React from "react";
import { FaFileAlt } from "react-icons/fa";

export default function GantiPassForm({ isEditMode, setIsEditMode }) {
  const [file, setFile] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setIsUploading(true);
    //async simulation
    sleep(2000).then(() => {
      setIsUploading(false);
      setFile(file);
      console.log(file?.name);
    });
  };
  return (
    <form action="" className="py-5 w-full flex flex-col gap-3">
      <Input
        isDisabled={!isEditMode}
        type="text"
        label="Password Lama"
        variant="bordered"
        radius="none"
        placeholder="Masukkan Password Lama"
        labelPlacement="outside"
        className="w-full shadow-md"
      />
      <Input
        isDisabled={!isEditMode}
        type="text"
        label="Password Baru"
        variant="bordered"
        radius="none"
        placeholder="Masukkan Password Baru"
        labelPlacement="outside"
        className="w-full shadow-md"
      />
      <Input
        isDisabled={!isEditMode}
        type="text"
        label="Konfirmasi Password Baru"
        variant="bordered"
        radius="none"
        placeholder="Masukkan Kembali Password Baru"
        labelPlacement="outside"
        className="w-full shadow-md"
      />
      <Input
        isDisabled={!isEditMode}
        type="text"
        label="Kode Verifikasi"
        variant="bordered"
        radius="none"
        placeholder="Masukkan Kode Verifikasi"
        labelPlacement="outside"
        className="w-full shadow-md"
      />
    </form>
  );
}
