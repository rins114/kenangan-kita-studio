"use client";
import DataFileView from "@/components/atoms/DataFileView";
import DataView from "@/components/atoms/DataView";
import JoyStepper from "@/components/molecules/JoyStepper";
import HorizontalStepperWithError from "@/components/molecules/Stepper";
import APP_CONFIG from "@/globals/app-config";
import { getClearingsHouseRequest } from "@/services/ClearingHouse";
import { showToast } from "@/utils/ShowToast";
import React, { useEffect, useState } from "react";
const TOKEN = localStorage.getItem("access_token");

import scanFileGif from "../../../../../public/assets/gif/scan_doc_3";
import rejectedFileGif from "../../../../../public/assets/gif/rejected_doc";
import acceptedFileGif from "../../../../../public/assets/gif/accepted_doc";
import Lottie from "react-lottie";

export default function PermohonanDetailPage({ params }) {
  const { id } = React.use(params);
  const [section, setSection] = useState("Step-1");
  const [clearingHouseData, setClearingHouseData] = useState(null);

  useEffect(() => {
    async function fetchClearingHouseData() {
      const result = await getClearingsHouseRequest(TOKEN);
      if (result.status !== 200) {
        await showToast(
          "error",
          "Kesalahan pada server: getClearingsHouseRequest"
        );
        return;
      }

      const chData = result.data.clearing_requests.find(
        (data) => data.request_id === parseInt(id)
      );
      setClearingHouseData(chData);
    }
    fetchClearingHouseData();
  }, []);

  const getUserStatus = (status) => {
    const statusMap = {
      0: "Diproses",
      1: "Terverifikasi",
      2: "Ditolak",
      3: "Dihapus",
      5: "Selesai",
    };

    return statusMap[status] || "Tidak Diketahui";
  };

  return (
    <div className="w-full flex flex-col justify-start items-center p-7 gap-7">
      <section className="p-5 rounded-xl h-full bg-blue-950/0 flex flex-col w-full">
        {/* <HorizontalStepperWithError></HorizontalStepperWithError> */}
        <JoyStepper
          setSection={setSection}
          data={{ status: getUserStatus(clearingHouseData?.status) }}
        ></JoyStepper>
      </section>
      {section === "Step-1" && (
        <section className="h-full min-h-96 rounded-xl w-full px-2 py-1 bg-white shadow-md">
          <div className="p-5 flex flex-col gap-3">
            <DataView
              _key="Status Dokumen"
              value={getUserStatus(clearingHouseData?.status)}
            />
            <DataView
              _key="Nama Pemohon"
              value={clearingHouseData?.nama_pemohon}
            />
            <DataView _key="Nama OPD" value={clearingHouseData?.nama_opd} />
            <DataView
              _key="Nama Paket Kegiatan"
              value={clearingHouseData?.nama_paket_kegiatan}
            />
            <DataView
              _key="Nama Barang/Jasa"
              value={clearingHouseData?.nama_barang_jasa}
            />
            <DataView
              _key="Nama K/L/PD"
              value={clearingHouseData?.nama_kl_pd}
            />
            <DataView
              _key="Nomor Sirup"
              value={clearingHouseData?.nomor_sirup}
            />
            <DataView
              _key="Tahun Anggaran"
              value={clearingHouseData?.tahun_anggaran}
            />
            <DataView
              _key="Pagu Anggaran"
              value={clearingHouseData?.pagu_anggaran}
            />
            <DataView _key="Nilai HPS" value={clearingHouseData?.nilai_hps} />
            <DataView
              _key="Lokasi Pelaksanaan"
              value={clearingHouseData?.lokasi_pelaksanaan}
            />
            <DataView
              _key="Metode Pemilihan"
              value={clearingHouseData?.metode_pemilihan}
            />
            <DataView _key="Catatan" value={clearingHouseData?.catatan} />
            <DataFileView
              _key={"Surat Permohonan"}
              fileUrl={`${
                APP_CONFIG.STORAGE_URL
              }${clearingHouseData?.surat_permohonan.replace(
                /\/storage\//,
                ""
              )}`}
            ></DataFileView>
          </div>
        </section>
      )}
      {section === "Step-2" && (
        <section className="h-full min-h-96 border-2 rounded-xl w-full px-2 py-1 bg-white shadow-md flex justify-center items-center">
          {getUserStatus(clearingHouseData.status) === "Diproses" && (
            <div className="p-5 flex flex-col justify-center items-center">
              <h1 className="font-medium text-3xl">
                Permohonan berhasil diajukan
              </h1>
              <h1>Mohon menunggu proses verifikasi berkas</h1>

              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: scanFileGif,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={200}
                width={200}
              />
            </div>
          )}
          {getUserStatus(clearingHouseData.status) === "Ditolak" && (
            <div className="p-5 flex flex-col justify-center items-center w-full max-w-3xl">
              <h1 className="font-medium text-3xl">
                Permohonan Ditolak, dengan alasan:
              </h1>
              <p className="text-lg text-red-500">
                {clearingHouseData.remarks}
              </p>
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: rejectedFileGif,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={200}
                width={200}
              />
            </div>
          )}
          {getUserStatus(clearingHouseData.status) === "Terverifikasi" && (
            <div className="p-5 flex flex-col justify-center items-center w-full max-w-3xl">
              <h1 className="font-medium text-3xl">Permohonan Terverifikasi</h1>

              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: acceptedFileGif,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={200}
                width={200}
              />
            </div>
          )}
          {getUserStatus(clearingHouseData.status) === "Selesai" && (
            <div className="p-5 flex flex-col justify-center items-center w-full max-w-3xl">
              <h1 className="font-medium text-3xl">Permohonan Terverifikasi</h1>

              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: acceptedFileGif,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={200}
                width={200}
              />
            </div>
          )}
        </section>
      )}
      {section === "Step-3" && (
        <section className="h-full min-h-96 border-2 rounded-xl w-full px-2 py-1 bg-white shadow-md">
          <h1>Content Step 3</h1>
        </section>
      )}
    </div>
  );
}
