"use client";
import Breadcrumb from "@/components/molecules/Breadcrumb";
import ClearingHouseForm from "@/components/molecules/ClearingHouseForm";
import { postClearingHouseRequest } from "@/services/ClearingHouse";
import { showToast } from "@/utils/ShowToast";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { IoHome } from "react-icons/io5";
const TOKEN = localStorage.getItem("access_token");

export default function ClearingHousePage() {
  const ClearingHouseFormRef = useRef(null);
  const [file, setFile] = React.useState(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    nama_pemohon: "",
    nama_opd: "",
    paket_kegiatan: "",
    nama_barang_jasa: "",
    nama_klpd: "",
    no_sirup: "",
    thn_anggaran: "",
    pagu_anggaran: "",
    nilai_hps: "",
    lokasi_pelaksana: "",
    metode_pemilihan: "",
    surat_permohonan: null,
    catatan: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    setIsUploading(true);
    await sleep(500);
    const { files } = e.target;
    setFormData((prev) => ({
      ...prev,
      surat_permohonan: files[0],
    }));
    setIsUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }
    const result = await postClearingHouseRequest(formDataToSend, TOKEN);
    if (result.status !== 200) {
      await showToast("error", "Gagal mengajukan permohonan");
      return;
    }
    await showToast("success", "Berhasil mengajukan permohonan");
    setFormData({
      nama_pemohon: "",
      nama_opd: "",
      paket_kegiatan: "",
      nama_barang_jasa: "",
      nama_klpd: "",
      no_sirup: "",
      thn_anggaran: "",
      pagu_anggaran: "",
      nilai_hps: "",
      lokasi_pelaksana: "",
      metode_pemilihan: "",
      surat_permohonan: null,
      catatan: "",
    });
    fileInputRef.current.value = "";
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="p-5 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-1 w-full border-2 border-slate-200 rounded-md bg-white overflow-hidden">
        <div className="bg-slate-300 p-3">
          <h1 className="text-md font-medium">
            Formulir Permohonan Clearing House
          </h1>
        </div>
        <ClearingHouseForm
          formData={formData}
          ref={ClearingHouseFormRef}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
          file={formData.surat_permohonan}
          isUploading={isUploading}
          fileInputRef={fileInputRef}
        ></ClearingHouseForm>
      </div>
    </div>
  );
}
