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

export const columns = [
  { name: "NAMA", uid: "nama_pemohon" },
  { name: "OPD", uid: "opd" },
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
    status: "Terverifikasi",
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
    status: "Ditolak",
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
    status: "Diproses",
  },
];

const statusColorMap = {
  Terverifikasi: "success",
  Ditolak: "danger",
  Diproses: "warning",
  Selesai: "success",
};

export default function TableCustom() {
  const navigate = useRouter();
  const { user: authUser } = useAuthUser();
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const [openedDetail, setOpenedDetail] = useState(null);
  const [keterangan, setKeterangan] = useState("");

  const handleOpenDetail = (id) => {
    const dataDetail = users.filter((data) => data.id === id);
    console.log(dataDetail);
    setOpenedDetail(dataDetail[0]);
    setIsModalEditOpen(true);
  };

  const handleChangeStatus = (status) => {
    if (keterangan == "") {
      toast.warn("Harap isi keterangan!");
      return;
    }
    handleClose();
    setKeterangan("");
    return;
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
            {authUser.roles !== "Pemohon" ? (
              <h1>{user.nama_pemohon}</h1>
            ) : (
              <div
                className="flex flex-row-reverse justify-end items-center gap-1 cursor-pointer"
                onClick={() =>
                  navigate.push(`/dashboard/permohonan/${user.id}`)
                }
              >
                <MdInsertLink className="text-lg" />
                <h1 className="font-semibold line-clamp-1">
                  {user.nama_pemohon}
                </h1>
              </div>
            )}
          </>
        );
      case "opd":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.opd}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {user.status}
          </Chip>
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
                  onClick={() => handleOpenDetail(user.id)}
                >
                  <BiEditAlt className="text-xl text-primary" />
                </span>
              </Tooltip>
            )}
            {authUser.roles === "Sekretariat" && (
              <Tooltip content="Lihat Detail">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => {
                    navigate.push(`/dashboard/permohonan/hasil/${user.id}`);
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

  return (
    <>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
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
                  {openedDetail?.status}
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
                    value={openedDetail?.opd}
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold">Pagu Anggaran</label>
                  <input
                    disabled
                    type="text"
                    value={openedDetail?.pagu_anggaran}
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold">Nama Paket Kegiatan</label>
                  <input
                    disabled
                    type="text"
                    value={openedDetail?.paket_kegiatan}
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold">Nilai HPS</label>
                  <input
                    disabled
                    type="text"
                    value={openedDetail?.nilai_hps}
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block font-bold">Nama Barang/Jasa</label>
                  <input
                    disabled
                    type="text"
                    value={openedDetail?.barang_jasa}
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
                    value={openedDetail?.klpd}
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
                    href={openedDetail?.file?.path} // Gunakan path yang benar
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600
                    w-full text-center flex items-center justify-center"
                  >
                    <HiDocumentText className="inline mr-2" />
                    Lihat Surat: {openedDetail?.file?.name}
                  </a>
                </div>
              </div>

              <p className="text-md mt-3 px-3">
                <strong>Catatan:</strong> {openedDetail?.catatan}
              </p>

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
            </div>
            <div className="flex flex-row gap-3 justify-end mt-5">
              <Button onPress={() => handleClose()}>Close</Button>
              <Button
                className="bg-red-500 text-white"
                onPress={() => handleChangeStatus("Ditolak")}
              >
                Tolak
              </Button>
              <Button
                className="text-white bg-secondaryColor"
                onPress={() => handleChangeStatus("Terverifikasi")}
              >
                Verifikasi
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
