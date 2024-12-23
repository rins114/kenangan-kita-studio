import { Button, Input, Textarea } from "@nextui-org/react";
import React from "react";
import FileInputAtom from "../atoms/FileInput";

export default function VerifikasiBerkasForm({
  ref,
  handleSubmit,
  handleFilesChange,
  file,
  isUploading,
}) {
  return (
    <form onSubmit={handleSubmit} className="flex p-3 gap-3 flex-col" ref={ref}>
        <div className="flex gap-3">
          <div className="flex flex-col w-1/2 gap-3">
            <Input
            size="md"
            label="Nama Pemohon"
            radius="sm"
            labelPlacement="outside"
            placeholder="Masukkan nama pemohon"
            variant="bordered"
            name="nama_pemohon"
            ></Input>
            <Input
              size="md"
              label="Nama Organisasi Perangkat Daerah"
              radius="sm"
              labelPlacement="outside"
              placeholder="Masukkan nama OPD"
              variant="bordered"
              name="opd"
            ></Input>

            <Input
              label="Nama Paket Kegiatan/Pekerjaan"
              radius="sm"
              labelPlacement="outside"
              placeholder="Masukkan nama barang/jasa"
              variant="bordered"
              size="md"
              name="barang_jasa"
            ></Input>
          </div>
          <div className="flex flex-col w-1/2 gap-3">
            <Input
              size="md"
              label="ID Paket Dalam RUP"
              radius="sm"
              labelPlacement="outside"
              placeholder="Masukkan ID Paket"
              variant="bordered"
              name="klpd"
            ></Input>
            <Input
              size="md"
              label="Pagu Anggaran"
              radius="sm"
              labelPlacement="outside"
              placeholder="Masukkan pagu anggaran"
              variant="bordered"
              name="pagu_anggaran"
            ></Input>
            <Input
              size="md"
              label="Nilai HPS"
              radius="sm"
              labelPlacement="outside"
              placeholder="Masukkan Nilai HPS"
              variant="bordered"
              name="nilai_hps"
            ></Input>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex flex-col w-1/2 gap-3">
            <FileInputAtom
              handleFileChange={handleFilesChange}
              label="Surat Keputusan Penetapan PPK"
              name="suratKeputusan"
              fileName={file}
            />
            <FileInputAtom
              fileName={file}
              handleFileChange={handleFilesChange}
              label="Spesifikasi Teknis Dan Rancangan Detail"
              name="spesifikasiTeknis"
            />
            <FileInputAtom
              fileName={file}
              handleFileChange={handleFilesChange}
              label="Kerangka Ajuan Kerja (KAK)"
              name="kerangkaAjuan"
            />
            <FileInputAtom
              fileName={file}
              handleFileChange={handleFilesChange}
              label="Rancangan Kontak"
              name="rancanganKontak"
            />
            <FileInputAtom
              fileName={file}
              handleFileChange={handleFilesChange}
              label="Dokumen Anggaran Belanja (DIPA/DPA atau RKA-KL/RKA-DP)"
              name="dokumenAnggaran"
            />
          </div>
          <div className="flex flex-col w-1/2 gap-3">
            <FileInputAtom
              fileName={file}
              handleFileChange={handleFilesChange}
              label="Waktu Penggunaan Barang/Jasa"
              name="waktuPenggunaan"
            />
            <FileInputAtom
              fileName={file}
              handleFileChange={handleFilesChange}
              label="Analisis Pasar"
              name="analisisPasar"
            />
            <FileInputAtom
              fileName={file}
              handleFileChange={handleFilesChange}
              label="Probity Audit (Suket Lain Dari Inspektorat)"
              name="probityAudit"
            />
            <FileInputAtom
              fileName={file}
              handleFileChange={handleFilesChange}
              label="Uraian Pekerjaan, Identifikasi Bahaya, Dan Penetapan Resiko"
              name="uraianPekerjaan"
            />
          </div>
        </div>

        <Textarea
          label="Catatan"
          variant="bordered"
          size="md"
          labelPlacement="outside"
          placeholder="Tuliskan catatan khusus disini"
          disableAnimation
          disableAutosize
          classNames={{
            base: "w-full catatan",
            input: "resize-y min-h-[170px] !rounded-none",
          }}
        />
      
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
