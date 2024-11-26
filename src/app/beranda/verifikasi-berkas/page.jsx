"use client";
import { showAlert } from "@/components/atoms/SweetAlert";
import VerifikasiBerkasForm from "@/components/molecules/VerifikasiBerkasForm";
import React, { useEffect, useRef } from "react";

export default function VerifikasiBerkasPage() {
  const VerifikasiBerkasRef = useRef(null);
  const [file, setFile] = React.useState(null);
  const [files, setFiles] = React.useState({
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = VerifikasiBerkasRef.current;
    const form = new FormData(ref);
    console.log(form.get("analisisPasar"));
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleFilesChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const file = files[0];

      if (allowedTypes.includes(file.type)) {
        setFiles((prev) => ({
          ...prev,
          [name]: file,
        }));
      } else {
        showAlert(
          "warning",
          "Peringatan",
          "Jenis file yang diunggah tidak valid"
        );
      }
    }
  };

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
          <h1 className="text-md">Formulir Permohonan Verifikasi Berkas</h1>
        </div>
        <VerifikasiBerkasForm
          ref={VerifikasiBerkasRef}
          handleSubmit={handleSubmit}
          handleFilesChange={handleFilesChange}
          file={files}
          isUploading={isUploading}
        ></VerifikasiBerkasForm>
      </div>
    </div>
  );
}
