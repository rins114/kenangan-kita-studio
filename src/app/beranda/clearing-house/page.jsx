"use client";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import ClearingHouseForm from "@/components/molecules/ClearingHouseForm";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";
import { IoHome } from "react-icons/io5";

export default function ClearingHousePage() {
  const ClearingHouseFormRef = useRef(null);
  const [file, setFile] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = ClearingHouseFormRef.current;
    const form = new FormData(ref);
    console.log(form.get("file"));
  };

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
    <div className="p-5 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-1 w-full border-2 border-slate-200 rounded-md bg-white overflow-hidden">
        <div className="bg-slate-300 p-3">
          <h1 className="text-sm">Formulir Permohonan Clearing House</h1>
        </div>
        <ClearingHouseForm
          ref={ClearingHouseFormRef}
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
          file={file}
          isUploading={isUploading}
        ></ClearingHouseForm>
      </div>
    </div>
  );
}
