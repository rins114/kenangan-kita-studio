"use client";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import ClearingHouseForm from "@/components/molecules/ClearingHouseForm";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { IoHome } from "react-icons/io5";

export default function ClearingHousePage() {
  const ClearingHouseFormRef = useRef(null);
  const [file, setFile] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const [formData, setFormData] = useState({
    nama_pemohon: "",
    opd: "",
    paket_kegiatan: "",
    barang_jasa: "",
    klpd: "",
    nomor_sirup: "",
    tahun_anggaran: "",
    pagu_anggaran: "",
    nilai_hps: "",
    lokasi_pelaksanaan: "",
    metode_pemilihan: "",
    file: null,
    catatan: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData((prev) => ({
      ...prev,
      file: files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Form Data:", formData);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="p-5 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-1 w-full border-2 border-slate-200 rounded-md bg-white overflow-hidden">
        <div className="bg-slate-300 p-3">
          <h1 className="text-md">Formulir Permohonan Clearing House</h1>
        </div>
        <ClearingHouseForm
          formData={formData}
          ref={ClearingHouseFormRef}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
          file={file}
          isUploading={isUploading}
        ></ClearingHouseForm>
      </div>
    </div>
  );
}
