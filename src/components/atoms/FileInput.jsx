"use client";
import React, { useEffect } from "react";
import { MdFileUpload } from "react-icons/md";

export default function FileInput({
  label = "Upload Surat Izin",
  fileName = "",
  name = "",
  handleFileChange = () => {},
  jenisFile = [".pdf", ".doc", ".docx"],
}) {
  useEffect(() => {
    console.log(fileName[name]);
  }, [fileName]);
  return (
    <div className="flex flex-col gap-0">
      <h1 className="text-sm">{label}</h1>
      <div className="border-2 w-full rounded-md overflow-hidden h-10">
        <label
          htmlFor={name}
          className="cursor-pointer flex justify-start items-center w-full h-full bg-gray-100 hover:bg-gray-200"
        >
          <div className="w-[150px] bg-slate-500 py-2 px-3 flex justify-center items-center gap-1 text-white">
            <MdFileUpload className="text-lg"></MdFileUpload>
            Upload File
          </div>
          <div className="py-2 px-3 text-gray-500 truncate">
            {fileName[name]?.name ? fileName[name].name : "No file uploaded"}
          </div>
        </label>
        <input
          name={name}
          id={name}
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <div className="flex text-sm text-gray-500">
        <h1>Jenis File:</h1>
        <ul className="list-none pl-2 flex gap-2">
          {jenisFile.map((fileType, index) => (
            <li key={index}>{fileType}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
