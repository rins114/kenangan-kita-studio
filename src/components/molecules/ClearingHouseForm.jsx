import { Button, CircularProgress, Input, Textarea } from "@nextui-org/react";
import { FileInput, Label } from "flowbite-react";
import React from "react";
import { FaFileAlt } from "react-icons/fa";

export default function ClearingHouseForm({
  formData,
  ref,
  handleSubmit,
  handleChange,
  handleFileChange,
  file,
  isUploading,
  fileInputRef,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex p-3 gap-3 flex-col z-0 truncate"
      ref={ref}
    >
      <div className="flex flex-col w-full gap-3">
        <Input
          labelPlacement="outside"
          placeholder="Masukkan nama pemohon"
          size="md"
          key="outside"
          label="Nama Pemohon"
          radius="sm"
          variant="bordered"
          name="nama_pemohon"
          value={formData.nama_pemohon}
          onChange={handleChange}
        />
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="flex flex-col w-full lg:w-1/2 gap-3">
            <Input
              labelPlacement="outside"
              placeholder="Masukkan nama Organisasi Perangkat Daerah"
              size="md"
              label="Nama Organisasi Perangkat Daerah"
              radius="sm"
              variant="bordered"
              name="nama_opd"
              value={formData.nama_opd}
              onChange={handleChange}
            />
            <Input
              labelPlacement="outside"
              placeholder="Masukkan nama Paket Kegiatan"
              size="md"
              label="Nama Paket Kegiatan"
              radius="sm"
              variant="bordered"
              name="paket_kegiatan"
              value={formData.paket_kegiatan}
              onChange={handleChange}
            />
            <Input
              labelPlacement="outside"
              placeholder="Masukkan nama Barang/Jasa"
              label="Nama Barang/Jasa"
              radius="sm"
              variant="bordered"
              size="md"
              name="nama_barang_jasa"
              value={formData.nama_barang_jasa}
              onChange={handleChange}
            />
            <Input
              labelPlacement="outside"
              placeholder="Masukkan nama K/L/PD"
              size="md"
              label="Nama K/L/PD"
              radius="sm"
              variant="bordered"
              name="nama_klpd"
              value={formData.nama_klpd}
              onChange={handleChange}
            />
            <Input
              labelPlacement="outside"
              placeholder="Masukkan Nomor Sirup"
              size="md"
              label="Nomor Sirup"
              radius="sm"
              variant="bordered"
              name="no_sirup"
              value={formData.no_sirup}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col w-full lg:w-1/2 gap-3">
            <Input
              labelPlacement="outside"
              placeholder="Masukkan Tahun Anggaran"
              size="md"
              label="Tahun Anggaran"
              radius="sm"
              variant="bordered"
              name="thn_anggaran"
              value={formData.thn_anggaran}
              onChange={handleChange}
            />
            <Input
              labelPlacement="outside"
              placeholder="Masukkan Pagu Anggaran"
              size="md"
              label="Pagu Anggaran"
              radius="sm"
              variant="bordered"
              name="pagu_anggaran"
              value={formData.pagu_anggaran}
              onChange={handleChange}
            />
            <Input
              labelPlacement="outside"
              placeholder="Masukkan Nilai HPS"
              size="md"
              label="Nilai HPS"
              radius="sm"
              variant="bordered"
              name="nilai_hps"
              value={formData.nilai_hps}
              onChange={handleChange}
            />
            <Input
              labelPlacement="outside"
              placeholder="Masukkan Lokasi Pelaksanaan"
              size="md"
              label="Lokasi Pelaksanaan"
              radius="sm"
              variant="bordered"
              name="lokasi_pelaksana"
              value={formData.lokasi_pelaksana}
              onChange={handleChange}
            />
            <Input
              labelPlacement="outside"
              placeholder="Masukkan Metode Pemilihan"
              size="md"
              label="Metode Pemilihan"
              radius="sm"
              variant="bordered"
              name="metode_pemilihan"
              value={formData.metode_pemilihan}
              onChange={handleChange}
            />
          </div>
        </div>
        <h1>Upload Surat Permohonan</h1>
        <div
          className="flex w-full items-center justify-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const files = e.dataTransfer.files;
            if (files.length > 0) {
              handleFileChange({ target: { files } });
            }
          }}
        >
          <Label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {isUploading && (
              <div className="flex flex-col items-center justify-center pb-6 pt-5 gap-2">
                <CircularProgress color="warning" aria-label="Loading..." />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Memproses...
                </p>
              </div>
            )}
            {file && !isUploading ? (
              <div className="flex flex-col items-center justify-center pb-6 pt-5 gap-2">
                <FaFileAlt className="text-3xl text-gray-500" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Uploaded: {file.name}
                </p>
              </div>
            ) : (
              ""
            )}
            {!file && !isUploading && (
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Klik untuk upload</span> atau
                  drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF, DOC, atau DOCX (MAX. 5MB)
                </p>
              </div>
            )}
            <FileInput
              id="dropzone-file"
              name="surat_permohonan"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </Label>
        </div>
        <Textarea
          label="Catatan"
          variant="bordered"
          size="md"
          labelPlacement="outside"
          placeholder="Tuliskan catatan khusus disini"
          disableAnimation
          disableAutosize
          name="catatan"
          value={formData.catatan}
          onChange={handleChange}
          classNames={{
            base: "w-full catatan",
            input: "resize-y min-h-[170px] !rounded-none",
          }}
        />
      </div>

      <div className="flex flex-col xs:flex-row gap-3 justify-end items-center">
        <Button type="submit" className="bg-green-500 text-white font-medium">
          Simpan
        </Button>
        <Button type="submit" className="bg-warning-500 text-white font-medium">
          Simpan & Ajukan
        </Button>
      </div>
    </form>
  );
}
