"use client";
import { Button, CircularProgress, Input } from "@nextui-org/react";
import React from "react";

export default function GantiPassForm({ isEditMode, setIsEditMode }) {
  const [file, setFile] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setIsUploading(true);
    // Simulasi upload
    sleep(2000).then(() => {
      setIsUploading(false);
      setFile(file);
      console.log(file?.name);
    });
  };

  const handleSendCode = () => {
    // Fungsi untuk mengirim kode verifikasi
    console.log("Kode verifikasi dikirim!");
  };

  return (
    <form action="" className="pt-7 w-full flex flex-col gap-3">
      <Input
        isRequired
        type="text"
        label="Password Lama"
        variant="bordered"
        radius="none"
        placeholder="Masukkan Password Lama"
        labelPlacement="outside"
        className="w-full"
      />
      <Input
        isRequired
        type="text"
        label="Password Baru"
        variant="bordered"
        radius="none"
        placeholder="Masukkan Password Baru"
        labelPlacement="outside"
        className="w-full"
      />
      <Input
        isRequired
        type="text"
        label="Konfirmasi Password Baru"
        variant="bordered"
        radius="none"
        placeholder="Masukkan Kembali Password Baru"
        labelPlacement="outside"
        className="w-full"
      />
      <div className="flex flex-row justify-center items-end gap-3 w-1/2">
        <Input
          isRequired
          type="text"
          label="Kode Verifikasi"
          variant="bordered"
          radius="none"
          placeholder="Masukkan Kode Verifikasi"
          labelPlacement="outside"
          className=""
        />
        <Button
          onPress={handleSendCode}
          className="bg-mainColor text-white font-medium"
        >
          Kirim Kode
        </Button>
      </div>
      <div className="w-full flex justify-end items-center">
        <Button
          className="bg-secondaryColor text-white font-medium"
          type="submit"
        >
          Simpan
        </Button>
      </div>
    </form>
  );
}
