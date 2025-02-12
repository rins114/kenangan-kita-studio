import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
  CircularProgress,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/contexts/AuthUserContext";
import Modal from "../atoms/Modal";
import gsap from "gsap";
import { toast, ToastContainer } from "react-toastify";
import { BiEditAlt } from "react-icons/bi";
import { HiDocumentText } from "react-icons/hi2";
import {
  MdDeleteOutline,
  MdInsertLink,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import Swal from "sweetalert2";
import {
  getClearingsHouseRequest,
  rejectClearingsHouseRequest,
  verifyClearingsHouseRequest,
} from "@/services/ClearingHouse";
import { showToast } from "@/utils/ShowToast";
import APP_CONFIG from "@/globals/app-config";

export const columns = [
  { name: "NAMA", uid: "nama_pemohon" },
  { name: "ORGANISASI PERANGKAT DAERAH", uid: "nama_opd" },
  { name: "TANGGAL PENGAJUAN", uid: "created_at" },
  { name: "STATUS", uid: "status" },
  { name: "AKSI", uid: "actions" },
];

export const users = [
  {
    id: 1,
    nama_pemohon: "Andi Prasetyo",
    opd: "Dinas Pekerjaan Umum dan Penataan Ruang",
    paket_kegiatan: "Pembangunan Jalan Lingkungan",
    barang_jasa: "Jasa Konstruksi",
    klpd: "Kementerian PUPR",
    nomor_sirup: "1234567890",
    tahun_anggaran: "2024",
    pagu_anggaran: "1.500.000.000",
    nilai_hps: "1.450.000.000",
    lokasi_pelaksanaan: "Kabupaten Lombok Tengah",
    metode_pemilihan: "Tender Umum",
    catatan:
      "Pastikan dokumen pendukung sudah lengkap dan akurat sebelum diajukan untuk memastikan proses verifikasi berjalan lancar.",
    file: { name: "Docs 1", path: "/assets/pdf/diazka.pdf" },
    status: 0,
  },
  {
    id: 2,
    nama_pemohon: "Siti Rahmawati",
    opd: "Dinas Kesehatan Provinsi NTB",
    paket_kegiatan: "Pengadaan Alat Kesehatan Puskesmas",
    barang_jasa: "Barang Medis",
    klpd: "Kementerian Kesehatan",
    nomor_sirup: "0987654321",
    tahun_anggaran: "2023",
    pagu_anggaran: "850.000.000",
    nilai_hps: "825.000.000",
    lokasi_pelaksanaan: "Kota Mataram",
    metode_pemilihan: "E-Purchasing",
    catatan: "Pengadaan harus sesuai dengan spesifikasi teknis.",
    file: { name: "Docs 1", path: "/assets/pdf/diazka.pdf" },
    status: 0,
  },
  {
    id: 3,
    nama_pemohon: "Budi Santoso",
    opd: "Dinas Pendidikan dan Kebudayaan",
    paket_kegiatan: "Renovasi Gedung Sekolah Dasar",
    barang_jasa: "Jasa Renovasi",
    klpd: "Kementerian Pendidikan",
    nomor_sirup: "1122334455",
    tahun_anggaran: "2025",
    pagu_anggaran: "2.000.000.000",
    nilai_hps: "1.950.000.000",
    lokasi_pelaksanaan: "Kabupaten Sumbawa",
    metode_pemilihan: "Pengadaan Langsung",
    catatan: "Perhatikan ketentuan K3 saat pelaksanaan proyek.",
    file: { name: "Docs 1", path: "/assets/pdf/diazka.pdf" },
    status: 0,
  },
];

const statusColorMap = {
  1: "success",
  2: "danger",
  0: "warning",
  5: "success",
};

const TOKEN = localStorage.getItem("access_token");

export default function TableCustom() {
  const navigate = useRouter();
  const { user: authUser } = useAuthUser();
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const [openedDetail, setOpenedDetail] = useState(null);
  const [keterangan, setKeterangan] = useState("");
  const [clearingHouseData, setClearingHouseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenDetail = async (id) => {
    const result = await getClearingsHouseRequest(TOKEN);
    if (result.status !== 200) {
      await showToast(
        "error",
        "Kesalahan pada server: getClearingsHouseRequest"
      );
      return;
    }
    const dataDetail = result?.data?.clearing_requests?.find(
      (data) => data.request_id === id
    );
    console.log("Data Detail:", dataDetail);
    setOpenedDetail(dataDetail);
    setIsModalEditOpen(true);
  };

  useEffect(() => {
    async function fetchClearingHouseRequest() {
      const result = await getClearingsHouseRequest(TOKEN);
      if (result.status !== 200) {
        await showToast(
          "error",
          "Kesalahan pada server: getClearingsHouseRequest"
        );
        return;
      }
      console.log(result.data);

      setClearingHouseData(result.data.clearing_requests);
      setIsLoading(false);
    }
    fetchClearingHouseRequest();
  }, []);

  useEffect(() => {
    console.log(clearingHouseData);
  }, [clearingHouseData]);

  async function handleVerifyClearingHouseRequest(id) {
    const result = await verifyClearingsHouseRequest(TOKEN, id);
    if (result.status !== 200) {
      await showToast(
        "error",
        "Kesalahan pada server: verifyClearingsHouseRequest"
      );
      return;
    }
    await showToast("success", "Verifikasi berhasil");
    window.location.reload();
  }

  async function handleRejectClearingHouseRequest(id) {
    if (!keterangan.trim()) {
      toast.warn("Harap Isi Keterangan!");
      return;
    }
    const result = await rejectClearingsHouseRequest(TOKEN, id, keterangan);
    if (result.status !== 200) {
      await showToast(
        "error",
        "Kesalahan pada server: rejectClearingsHouseRequest"
      );
      return;
    }
    await showToast("success", "Verifikasi berhasil");
    window.location.reload();
  }

  const [usersData, setUsersData] = useState(users); // Simpan data users ke dalam state
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
    console.log("openedDetail:", openedDetail);
    console.log("usersData:", usersData);

    if (!openedDetail?.id || !usersData?.length) return;

    const userKeterangan =
      usersData.find((user) => user.id === openedDetail.id)?.keterangan || "";

    console.log("userKeterangan:", userKeterangan);
    setKeterangan(userKeterangan);
  }, [openedDetail, usersData]);

  const handleKeteranganChange = (e) => {
    const newKeterangan = e.target.value;
    setKeterangan(newKeterangan);

    // Simpan perubahan keterangan ke dalam usersData
    setUsersData((prevUsers) =>
      prevUsers.map((user) =>
        user.id === openedDetail?.id
          ? { ...user, keterangan: newKeterangan }
          : user
      )
    );
  };

  const handleChangeStatus = (status) => {
    if (!keterangan.trim()) {
      toast.warn("Harap Isi Keterangan!");
      return;
    }

    if (!openedDetail) return;

    // Perbarui status dokumen dalam tabel
    setUsersData((prevUsers) =>
      prevUsers.map((user) =>
        user.id === openedDetail.id ? { ...user, status, keterangan } : user
      )
    );

    // Tampilkan Toast
    if (status === "Terverifikasi") {
      Swal.fire({
        title: "Berhasil Diverifikasi!",
        text: "Permohonan Telah Diverifikasi.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    } else if (status === "Ditolak") {
      Swal.fire({
        title: "Permohonan Ditolak!",
        text: "Dokumen Telah Ditolak.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
    }

    // Tutup modal setelah mengubah status
    handleClose();
  };

  useEffect(() => {
    if (isModalEditOpen) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isModalEditOpen]);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setIsModalEditOpen(false),
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setIsModalEditOpen(false),
    });
  };

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "nama_pemohon":
        return (
          <>
            {["Admin", "Sekretariat", "Kepala_upbj"].includes(
              authUser.roles
            ) ? (
              <h1>{user.nama_pemohon}</h1> // Peran ini hanya bisa melihat nama, tidak bisa klik
            ) : (
              <div
                className="flex flex-row-reverse justify-end items-center gap-1 cursor-pointer"
                onClick={() =>
                  navigate.push(`/dashboard/permohonan/${user?.request_id}`)
                }
              >
                <MdInsertLink className="text-lg" />
                <h1 className="font-semibold line-clamp-1">
                  {user?.nama_pemohon}
                </h1>
              </div>
            )}
          </>
        );
      case "nama_opd":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user?.status]}
            size="sm"
            variant="flat"
          >
            {getUserStatus(user.status)}
          </Chip>
        );
      case "created_at":
        return (
          <h1 className="capitalize" size="sm" variant="flat">
            {new Date(user.created_at).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </h1>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-2">
            {/* <Tooltip content="Details">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => handleOpenDetail(user.id)}
              >
                <EyeIcon />
              </span>
            </Tooltip> */}
            {authUser.roles === "Admin" && (
              <Tooltip content="Edit Status" color="primary">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => handleOpenDetail(user?.request_id)}
                >
                  <BiEditAlt className="text-xl text-primary" />
                </span>
              </Tooltip>
            )}
            {authUser.roles !== "Admin" &&
              authUser.roles !== "Sekretariat" &&
              authUser.roles !== "Kepala_upbj" && (
                <Tooltip content="Lihat Detail" color="primary">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={() => handleOpenDetail(user?.request_id)}
                  >
                    <MdOutlineRemoveRedEye className="text-xl text-primary" />
                  </span>
                </Tooltip>
              )}
            {authUser.roles === "Sekretariat" && (
              <Tooltip content="Lihat Detail">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => {
                    navigate.push(
                      `/dashboard/permohonan/hasil/${user?.request_id}`
                    );
                  }}
                >
                  <MdOutlineRemoveRedEye className="text-xl" />
                </span>
              </Tooltip>
            )}

            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <MdDeleteOutline className="text-xl" />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={
                column.uid === "actions" ||
                column.uid === "status" ||
                column.uid === "nama_opd"
                  ? "center"
                  : "start"
              }
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={clearingHouseData}>
          {(item) => (
            <TableRow key={item.request_id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

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

      {isModalEditOpen && (
        <Modal handleCloseModal={handleClose} overlayRef={overlayRef}>
          <div
            ref={modalRef}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="h-[33rem] w-full max-w-3xl bg-white rounded-3xl px-7 pt-7 pb-5 flex flex-col gap-1"
          >
            <h1 className="font-bold text-2xl mb-3 text-center">
              DETAIL PERMOHONAN
            </h1>
            <div
              className="w-full h-[95%] overflow-auto flex flex-col gap-2"
              id="print-area"
            >
              <div className="text-md flex flex-row justify-center items-center gap-2 mb-4 text-center">
                <strong className="text-center">Status Dokumen :</strong>{" "}
                <Chip
                  className="capitalize"
                  color={statusColorMap[openedDetail?.status]}
                  size="sm"
                  variant="flat"
                >
                  {getUserStatus(openedDetail?.status)}
                </Chip>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm px-3">
                <div>
                  <label className="block font-bold">Nama Pemohon</label>
                  <input
                    disabled
                    type="text"
                    value={openedDetail?.nama_pemohon}
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold">Tahun Anggaran</label>
                  <input
                    disabled
                    type="text"
                    value={openedDetail?.tahun_anggaran}
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold">Nama OPD</label>
                  <input
                    disabled
                    type="text"
                    value={openedDetail?.nama_opd}
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold">Pagu Anggaran</label>
                  <input
                    disabled
                    type="text"
                    value={
                      openedDetail?.pagu_anggaran
                        ? `Rp. ${openedDetail.pagu_anggaran}`
                        : ""
                    }
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold">Nama Paket Kegiatan</label>
                  <input
                    disabled
                    type="text"
                    value={openedDetail?.nama_paket_kegiatan}
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold">Nilai HPS</label>
                  <input
                    disabled
                    type="text"
                    value={
                      openedDetail?.nilai_hps
                        ? `Rp. ${openedDetail.nilai_hps}`
                        : ""
                    }
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold">Nama Barang/Jasa</label>
                  <input
                    disabled
                    type="text"
                    value={openedDetail?.nama_barang_jasa}
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold">Lokasi Pelaksanaan</label>
                  <input
                    disabled
                    type="text"
                    value={openedDetail?.lokasi_pelaksanaan}
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold">Nama K/L/PD</label>
                  <input
                    disabled
                    type="text"
                    value={openedDetail?.nama_kl_pd}
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold">Metode Pemilihan</label>
                  <input
                    disabled
                    type="text"
                    value={openedDetail?.metode_pemilihan}
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold">Nomor Sirup</label>
                  <input
                    disabled
                    type="text"
                    value={openedDetail?.nomor_sirup}
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold">Surat Permohonan</label>
                  <a
                    href={`${
                      APP_CONFIG.STORAGE_URL
                    }${openedDetail?.surat_permohonan.replace(
                      "/storage/",
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600
                    w-full text-center flex items-center justify-center"
                  >
                    <HiDocumentText className="inline mr-2" />
                    Lihat Surat Permohonan
                  </a>
                </div>
              </div>

              <p className="text-md mt-3 px-3">
                <strong>Catatan:</strong> {openedDetail?.catatan}
              </p>
              {authUser.roles === "Admin" && (
                <div className="flex flex-col gap-1 px-3 mt-3">
                  <h1 className="font-bold">Keterangan</h1>
                  <textarea
                    className="border-2 rounded-md w-full p-2"
                    placeholder="Masukkan keterangan di sini..."
                    rows={7}
                    name=""
                    id=""
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                  ></textarea>
                </div>
              )}
            </div>
            <div className="flex flex-row gap-3 justify-end mt-5">
              <Button onPress={() => handleClose()}>Tutup</Button>
              {authUser.roles === "Admin" && (
                <Button
                  disabled={
                    openedDetail.status === 3 ||
                    openedDetail.status === 2 ||
                    openedDetail.status === 5
                  }
                  className={`text-white ${
                    openedDetail.status === 2
                      ? "bg-gray-500 cursor-not-allowed text-black"
                      : "bg-red-500"
                  }`}
                  onPress={async () => {
                    if (openedDetail.status !== 2) {
                      await handleRejectClearingHouseRequest(
                        openedDetail.request_id
                      );
                    }
                  }}
                  isDisabled={openedDetail.status === 2}
                >
                  Tolak
                </Button>
              )}
              {authUser.roles === "Admin" && (
                <Button
                  disabled={
                    openedDetail.status === 1 ||
                    openedDetail.status === 2 ||
                    openedDetail.status === 5
                  }
                  className={`text-white ${
                    openedDetail.status === 1
                      ? "bg-gray-500 cursor-not-allowed text-black"
                      : "bg-secondaryColor"
                  }`}
                  onPress={async () => {
                    if (openedDetail.status !== 1) {
                      await handleVerifyClearingHouseRequest(
                        openedDetail.request_id
                      );
                    }
                  }}
                  isDisabled={openedDetail.status === 1}
                >
                  Verifikasi
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
