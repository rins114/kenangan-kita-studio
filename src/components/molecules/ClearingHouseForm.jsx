import { Button, CircularProgress, Input, Textarea } from "@nextui-org/react";
import { FileInput, Label } from "flowbite-react";
import React from "react";
import { FaFileAlt } from "react-icons/fa";

export default function ClearingHouseForm({
  ref,
  handleSubmit,
  handleFileChange,
  file,
  isUploading,
}) {
  return (
    <form onSubmit={handleSubmit} className="flex p-3 gap-3 flex-col" ref={ref}>
      <div className="flex flex-col w-full gap-3">
        <Input
          size="sm"
          key="outside"
          label="Nama Pemohon"
          radius="sm"
          variant="bordered"
          name="nama_pemohon"
        ></Input>
        <div className="flex gap-3">
          <div className="flex flex-col w-1/2 gap-3">
            <Input
              size="sm"
              label="Nama Organisasi Perangkat Daerah"
              radius="sm"
              variant="bordered"
              name="opd"
            ></Input>
            <Input
              size="sm"
              label="Nama Paket Kegiatan"
              radius="sm"
              variant="bordered"
              name="paket_kegiatan"
            ></Input>
            <Input
              label="Nama Barang/Jasa"
              radius="sm"
              variant="bordered"
              size="sm"
              name="barang_jasa"
            ></Input>
            <Input
              size="sm"
              label="Nama K/L/PD"
              radius="sm"
              variant="bordered"
              name="klpd"
            ></Input>
            <Input
              size="sm"
              label="Nomor Sirup"
              radius="sm"
              variant="bordered"
              name="nomor_sirup"
            ></Input>
          </div>
          <div className="flex flex-col w-1/2 gap-3">
            <Input
              size="sm"
              label="Tahun Anggaran"
              radius="sm"
              variant="bordered"
              name="tahun_anggaran"
            ></Input>
            <Input
              size="sm"
              label="Pagu Anggaran"
              radius="sm"
              variant="bordered"
              name="pagu_anggaran"
            ></Input>
            <Input
              size="sm"
              label="Nilai HPS"
              radius="sm"
              variant="bordered"
              name="nilai_hps"
            ></Input>
            <Input
              size="sm"
              label="Lokasi Pelaksanaan"
              radius="sm"
              variant="bordered"
              name="lokasi_pelaksanaan"
            ></Input>
            <Input
              size="sm"
              label="Metode Pemilihan"
              radius="sm"
              variant="bordered"
              name="metode_pemilihan"
            ></Input>
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
                  Uploading...
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
              name="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </Label>
        </div>
        <Textarea
          label="Catatan"
          variant="bordered"
          placeholder="Tuliskan catatan khusus disini"
          disableAnimation
          disableAutosize
          classNames={{
            base: "w-full",
            input: "resize-y min-h-[100px]",
          }}
        />
      </div>
      <div className="flex gap-3 justify-end items-center">
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
