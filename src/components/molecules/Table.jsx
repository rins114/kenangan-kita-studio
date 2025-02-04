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
                  onClick={() => {}}
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
        autoClose={1000}
        hideProgressBar={false}
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
            <h1 className="font-semibold text-2xl">Detail Permohonan</h1>
            <div
              className="w-full h-[95%] overflow-auto flex flex-col gap-2"
              id="print-area"
            >
              <p className="text-md">
                <strong>Nama Pemohon:</strong> {openedDetail?.nama_pemohon}
              </p>
              <p className="text-md">
                <strong>OPD:</strong> {openedDetail?.opd}
              </p>
              <p className="text-md">
                <strong>Paket Kegiatan:</strong> {openedDetail?.paket_kegiatan}
              </p>
              <p className="text-md">
                <strong>Barang/Jasa:</strong> {openedDetail?.barang_jasa}
              </p>
              <p className="text-md">
                <strong>KLPD:</strong> {openedDetail?.klpd}
              </p>
              <p className="text-md">
                <strong>Nomor SIRUP:</strong> {openedDetail?.nomor_sirup}
              </p>
              <p className="text-md">
                <strong>Tahun Anggaran:</strong> {openedDetail?.tahun_anggaran}
              </p>
              <p className="text-md">
                <strong>Pagu Anggaran:</strong> Rp {openedDetail?.pagu_anggaran}
              </p>
              <p className="text-md">
                <strong>Nilai HPS:</strong> Rp {openedDetail?.nilai_hps}
              </p>
              <p className="text-md">
                <strong>Lokasi Pelaksanaan:</strong>{" "}
                {openedDetail?.lokasi_pelaksanaan}
              </p>
              <p className="text-md">
                <strong>Metode Pemilihan:</strong>{" "}
                {openedDetail?.metode_pemilihan}
              </p>
              <div className="text-md flex flex-row justify-start items-center gap-1">
                <strong>Status:</strong>{" "}
                <Chip
                  className="capitalize"
                  color={statusColorMap[openedDetail?.status]}
                  size="sm"
                  variant="flat"
                >
                  {openedDetail?.status}
                </Chip>
              </div>
              <p className="text-md">
                <strong>Catatan:</strong> {openedDetail?.catatan}
              </p>
              <p className="text-md">
                <strong>Surat Permohonan:</strong>{" "}
                <a
                  // href={URL.createObjectURL(openedDetail?.file)}
                  href={openedDetail?.file?.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {openedDetail?.file?.name}
                </a>
              </p>
              <div className="flex flex-col gap-1">
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
