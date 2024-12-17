"use client";
import { showAlert } from "@/components/atoms/SweetAlert";
import VerifikasiBerkasForm from "@/components/molecules/VerifikasiBerkasForm";
import React, { useEffect, useRef, useState } from "react";

export default function VerifikasiBerkasPage() {
  const VerifikasiBerkasRef = useRef(null);
  const [formData, setFormData] = useState({
    nama_pemohon: "",
    opd: "",
    barang_jasa: "",
    klpd: "",
    tahun_anggaran: "",
    pagu_anggaran: "",
    nilai_hps: "",
    catatan: "",
    suratKeputusan: null,
    spesifikasiTeknis: null,
    kerangkaAjuan: null,
    rancanganKontak: null,
    dokumenAnggaran: null,
    waktuPenggunaan: null,
    analisisPasar: null,
    probityAudit: null,
    uraianPekerjaan: null,
  });

  const [isUploading, setIsUploading] = React.useState(false);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (name, file) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: file,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="p-5 flex flex-col justify-center items-center">
      <div className="flex flex-col gap-1 w-full border-2 border-slate-200 rounded-md bg-white overflow-hidden">
        <div className="bg-slate-300 p-3">
          <h1 className="text-md">Formulir Permohonan Verifikasi Berkas</h1>
        </div>
        <VerifikasiBerkasForm
          formData={formData}
          ref={VerifikasiBerkasRef}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          isUploading={isUploading}
        ></VerifikasiBerkasForm>
      </div>
    </div>
  );
}
