"use client";
import DataFileView from "@/components/atoms/DataFileView";
import DataView from "@/components/atoms/DataView";
import FileInputAtom from "@/components/atoms/FileInput";
import FormContainer from "@/components/molecules/FormContainer";
import PdfViewer from "@/components/molecules/ReactPdfView";
import { useAuthUser } from "@/contexts/AuthUserContext";
import APP_CONFIG from "@/globals/app-config";
import { getClearingsHouseRequest } from "@/services/ClearingHouse";
import {
  getClearingHouseRequestOutput,
  postClearingHouseRequestOutput,
} from "@/services/ClearingHouseOutput";
import { showToast } from "@/utils/ShowToast";
import {
  Button,
  CircularProgress,
  Input,
  Radio,
  RadioGroup,
  Select,
  Textarea,
} from "@nextui-org/react";
import { FileInput, Label } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
const TOKEN = localStorage.getItem("access_token");

export default function HasilPage({ params }) {
  const { id } = React.use(params);
  const [isLangsung, setIsLangsung] = useState(true);
  const navigate = useRouter();
  const [file, setFile] = useState({ name: "", keluaran: "" });
  const [keterangan, setKeterangan] = useState("");
  const { user } = useAuthUser();

  const [clearingHouseData, setClearingHouseData] = useState(null);
  const [clearingRequestOutput, setClearingRequestOutput] = useState(null);
  const [isUpdateToggle, setIsUpdateToggle] = useState(false);
  const [isUpdateTogglePressed, setIsUpdateTogglePressed] = useState(false);
  const [laporanExist, setLaporanExist] = useState(true);

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

  useEffect(() => {
    async function fetchClearingHouseOutput() {
      const result = await getClearingHouseRequestOutput(TOKEN, id);
      if (result.status === 404) {
        return;
      }
      if (result.status !== 200) {
        await showToast(
          "error",
          "Kesalahan pada server: getClearingHouseOutput"
        );
        return;
      }
      console.log(result.data.data);
      setClearingRequestOutput(result.data.data);
    }
    fetchClearingHouseOutput();
  }, []);

  async function handlePostHasil(e) {
    e.preventDefault();
    if (keterangan === "") {
      toast.warn("Harap isi Balasan");
      return;
    }
    if (!isLangsung && file.keluaran === "") {
      toast.warn("Harap upload hasil diskusi");
      return;
    }
    const data = {
      request_id: id,
      tipe_process: isLangsung ? "langsung" : "tidak langsung",
      keluaran: file.keluaran,
      remarks: keterangan,
    };

    const formDataToSend = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formDataToSend.append(key, value);
      }
    });

    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }

    const result = await postClearingHouseRequestOutput(TOKEN, formDataToSend);

    if (result.status !== 201) {
      await showToast(
        "error",
        "Kesalahan pada server: postClearingHouseRequestOutput"
      );
      return;
    }
    Swal.fire({
      title: "Memproses...",
      text: "Mohon tunggu sebentar",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data telah berhasil disimpan!",
        confirmButtonColor: "#3B82F6",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate.push(`/dashboard/permohonan/hasil`);
        }
      });
    }, 3000);
  }

  function handleFileChange(name, keluaran) {
    setFile((prevState) => ({ ...prevState, name, keluaran }));
  }

  const formatWithDots = (number) => {
    return (Number(number) || 0).toLocaleString("id-ID");
  };

  return (
    <div className="p-5 flex flex-col gap-3">
      <FormContainer
        title="Detail Permohonan Clearing House"
        className="text-center"
      >
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
          <DataView _key="Nama K/L/PD" value={clearingHouseData?.nama_kl_pd} />
          <DataView _key="Nomor Sirup" value={clearingHouseData?.nomor_sirup} />
          <DataView
            _key="Tahun Anggaran"
            value={clearingHouseData?.tahun_anggaran}
          />
          <DataView
            _key="Pagu Anggaran"
            value={`Rp. ${formatWithDots(
              clearingHouseData?.pagu_anggaran || 0
            )},00`}
          />
          <DataView
            _key="Nilai HPS"
            value={`Rp. ${formatWithDots(
              clearingHouseData?.nilai_hps || 0
            )},00`}
          />
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
            }${clearingHouseData?.surat_permohonan.replace(/\/storage\//, "")}`}
          ></DataFileView>
        </div>
      </FormContainer>
      <FormContainer title="Keputusan Akhir">
        {!clearingRequestOutput || isUpdateToggle ? (
          <form onSubmit={async (e) => await handlePostHasil(e)}>
            <div className="p-5 flex flex-col gap-3">
              <RadioGroup
                color="primary"
                label="Pilih Tipe Keputusan Akhir"
                orientation="horizontal"
                onValueChange={setIsLangsung}
                defaultValue={isLangsung}
              >
                <Radio description="Tuliskan Balasan Langsung" value={true}>
                  Langsung
                </Radio>
                <div className="w-5"></div>
                <Radio description="Perlu Diskusi Lebih Lanjut" value={false}>
                  Tidak Langsung
                </Radio>
              </RadioGroup>
              {!isLangsung && (
                <FileInputAtom
                  handleFileChange={handleFileChange}
                  labelSize="text-md"
                  labelColor="text-zinc-500"
                  label="Upload Berkas Hasil Diskusi"
                  name="keluaran"
                  fileName={file.keluaran}
                ></FileInputAtom>
              )}
              <div className="flex flex-col gap-1">
                <h1 className="font-normal text-zinc-500">Balasan</h1>
                <textarea
                  className="border-2 rounded-md w-full p-2"
                  placeholder="Tuliskan balasan di sini..."
                  rows={7}
                  name=""
                  id=""
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="px-5 pb-5 w-full flex flex-row gap-3 justify-end items-center">
              {isUpdateTogglePressed && (
                <Button
                  onPress={() => {
                    setIsUpdateToggle(false);
                  }}
                  className="w-full rounded-xl max-w-[10rem] bg-red-500 text-white font-medium"
                >
                  Batal Update
                </Button>
              )}
              <Button
                className="bg-default text-zinc-700 font-medium"
                onPress={() => navigate.back()}
              >
                Kembali
              </Button>
              <Button
                type="submit"
                className="bg-secondaryColor text-white font-medium"
              >
                Submit
              </Button>
            </div>
          </form>
        ) : (
          <div className="p-5">
            <div className="flex flex-col gap-3">
              <DataView
                _key="Tipe Keputusan Akhir"
                value={
                  clearingRequestOutput.tipe_process === "langsung"
                    ? "Langsung"
                    : "Tidak Langsung"
                }
              />
              <DataView
                _key="Hasil Diskusi"
                value={clearingRequestOutput?.remarks}
              />
              {clearingRequestOutput.tipe_process !== "langsung" && (
                <DataFileView
                  labelButton="Lihat File"
                  _key={"File Hasil Akhir"}
                  fileUrl={`${APP_CONFIG.STORAGE_URL}${clearingRequestOutput?.keluaran}`}
                ></DataFileView>
              )}
              {user.roles === "Sekretariat" && (
                <Button
                  onPress={() => {
                    setIsUpdateTogglePressed(true);
                    setIsUpdateToggle(true);
                  }}
                  className="w-full rounded-xl max-w-[10rem] bg-orange-400 text-white font-medium"
                >
                  Update Data
                </Button>
              )}
            </div>
          </div>
        )}
      </FormContainer>
      <FormContainer title={"Upload Laporan"}>
        <div className="p-5 flex flex-col gap-3">
          {!laporanExist ? (
            <>
              <FileInputAtom
                handleFileChange={handleFileChange}
                labelSize="text-md"
                labelColor="text-zinc-500"
                label="Upload Laporan Hasil"
                name="laporan"
                fileName={""}
              ></FileInputAtom>
              <div className="flex flex-row gap-3 w-full justify-end items-end">
                <Button
                  className="bg-default text-zinc-700 font-medium"
                  onPress={() => navigate.back()}
                >
                  Kembali
                </Button>
                <Button
                  type="submit"
                  className="bg-secondaryColor text-white font-medium"
                >
                  Submit
                </Button>
              </div>
            </>
          ) : (
            <>
              <DataFileView
                labelButton="Lihat File"
                _key={"File Laporan"}
                fileUrl={`${APP_CONFIG.STORAGE_URL}${clearingRequestOutput?.keluaran}`}
              ></DataFileView>
            </>
          )}
        </div>
      </FormContainer>
      <ToastContainer
        position="top-center"
        autoClose={300}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 999999 }}
        limit={1}
      />
    </div>
  );
}
