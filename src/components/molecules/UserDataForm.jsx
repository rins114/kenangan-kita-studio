"use client";
import { Button, CircularProgress, Input } from "@nextui-org/react";
import { FileInput, Label } from "flowbite-react";
import React from "react";
import { FaFileAlt } from "react-icons/fa";

export default function UserDataForm({ isEditMode, setIsEditMode }) {
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
        isDisabled
        type="text"
        label="Nama Pengguna"
        variant="bordered"
        radius="none"
        placeholder="@johndoe123"
        labelPlacement="outside"
        className="w-full shadow-md"
      />
      <Input
        isDisabled={!isEditMode}
        type="text"
        label="Nama Perusahaan"
        variant="bordered"
        radius="none"
        placeholder="Masukkan nama perusahaan"
        labelPlacement="outside"
        className="w-full shadow-md"
      />
      <Input
        isDisabled={!isEditMode}
        type="text"
        label="Alamat Perusahaan"
        variant="bordered"
        radius="none"
        placeholder="Masukkan alamat perusahaan"
        labelPlacement="outside"
        className="w-full shadow-md"
      />
      <Input
        isDisabled={!isEditMode}
        type="text"
        label="Nomor Induk Kependudukan (NIK)"
        variant="bordered"
        radius="none"
        placeholder="Masukkan Nomor Induk Kependudukan"
        labelPlacement="outside"
        className="w-full shadow-md"
      />
      <Input
        isDisabled={!isEditMode}
        type="text"
        label="Nomor Induk Pegawai (NIP)"
        variant="bordered"
        radius="none"
        placeholder="Masukkan Nomor Induk Pegawai"
        labelPlacement="outside"
        className="w-full shadow-md"
      />
      <Input
        isDisabled={!isEditMode}
        type="text"
        label="Nomor Pokok Wajib Pajak (NPWP)"
        variant="bordered"
        radius="none"
        placeholder="Masukkan Nomor Pokok Wajib Pajak"
        labelPlacement="outside"
        className="w-full shadow-md"
      />
      <Input
        isDisabled={!isEditMode}
        type="text"
        label="Nomor Handphone"
        variant="bordered"
        radius="none"
        placeholder="Masukkan Nomor Handphone"
        labelPlacement="outside"
        className="w-full shadow-md"
      />
      <div className={`${!isEditMode ? "hidden" : "flex"} flex-col gap-2`}>
        <h1>Unggah SK Jabatan</h1>
        <div
          className="flex w-full items-center justify-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (files.length > 0) {
              handleFileChange({ target: { files } });
            }
          }}
          >
          <Label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {isUploading && (
              <div className="flex flex-col items-center justify-center pb-6 pt-5 gap-2">
                <CircularProgress color="warning" aria-label="Loading..." />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Uploading...
                </p>
              </div>
            )}
            {file && !isUploading ? (
              <div className="flex flex-col items-center justify-center pb-6 pt-5 gap-2">
                <FaFileAlt className="text-3xl text-gray-500" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Uploaded: {file.name}
                </p>
              </div>
            ) : (
              ""
            )}
            {!file && !isUploading && (
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Klik untuk upload</span> atau
                  drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF, DOC, atau DOCX (MAX. 5MB)
                </p>
              </div>
            )}
            <FileInput
              id="dropzone-file"
              name="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </Label>
        </div>
      </div>
    </form>
  );
}
