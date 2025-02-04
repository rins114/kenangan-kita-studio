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

export const EyeIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const DeleteIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const EditIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

const statusColorMap = {
  Terverifikasi: "success",
  Ditolak: "danger",
  Diproses: "warning",
};

export default function TableCustom() {
  const navigate = useRouter();
  const { user: authUser } = useAuthUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  // const [idDetail, setIdDetail] = useState(null);
  const [openedDetail, setOpenedDetail] = useState(null);

  const handleOpenDetail = (id) => {
    const dataDetail = users.filter((data) => data.id === id);
    console.log(dataDetail);
    setOpenedDetail(dataDetail[0]);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) {
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
  }, [isModalOpen]);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setIsModalOpen(false),
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setIsModalOpen(false),
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
              <a
                className="font-semibold hover:underline"
                href={`/dashboard/permohonan/${user.id}`}
              >
                {user.nama_pemohon}
              </a>
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
            {cellValue}
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
              <Tooltip content="Edit Status">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => handleOpenDetail(user.id)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
            )}
            {authUser.roles === "Sekretariat" && (
              <Tooltip content="Lihat Detail">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => handleOpenDetail(user.id)}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
            )}

            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
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
      {isModalOpen && (
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
                <strong>File:</strong>{" "}
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
                  className="border-2 rounded-md w-full p-1"
                  placeholder="Masukkan keterangan di sini..."
                  rows={7}
                  name=""
                  id=""
                ></textarea>
              </div>
            </div>
            <div className="flex flex-row gap-3 justify-end mt-5">
              <Button onPress={() => handleClose()}>Close</Button>
              <Button
                className="bg-red-500 text-white"
                onPress={() => handleClose()}
              >
                Tolak
              </Button>
              <Button className="text-white bg-secondaryColor">
                Verifikasi
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
