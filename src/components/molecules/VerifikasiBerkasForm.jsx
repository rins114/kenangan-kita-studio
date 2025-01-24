import { Button, Input, Textarea } from "@nextui-org/react";
import React from "react";
import FileInputAtom from "../atoms/FileInput";

export default function VerifikasiBerkasForm({
  formData,
  ref,
  handleSubmit,
  handleFileChange,
  handleChange,
  isUploading,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex p-3 gap-3 flex-col z-0"
      ref={ref}
    >
      <Input
        size="md"
        label="Nama Pemohon"
        radius="sm"
        labelPlacement="outside"
        placeholder="Masukkan nama pemohon"
        variant="bordered"
        name="nama_pemohon"
        value={formData.nama_pemohon}
        onChange={handleChange}
      />
      <div className="flex flex-col lg:flex-row gap-3 truncate">
        <div className="flex flex-col w-full lg:w-1/2 gap-3">
          <Input
            size="md"
            label="Nama Organisasi Perangkat Daerah"
            radius="sm"
            labelPlacement="outside"
            placeholder="Masukkan nama OPD"
            variant="bordered"
            name="opd"
            value={formData.opd}
            onChange={handleChange}
          />
          <Input
            label="Nama Paket Kegiatan/Pekerjaan"
            radius="sm"
            labelPlacement="outside"
            placeholder="Masukkan nama barang/jasa"
            variant="bordered"
            size="md"
            name="barang_jasa"
            value={formData.barang_jasa}
            onChange={handleChange}
          />
          <Input
            size="md"
            label="ID Paket Dalam RUP"
            radius="sm"
            labelPlacement="outside"
            placeholder="Masukkan ID Paket"
            variant="bordered"
            name="klpd"
            value={formData.klpd}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2 gap-3">
          <Input
            size="md"
            label="Tahun Anggaran"
            radius="sm"
            labelPlacement="outside"
            placeholder="Masukkan tahun anggaran"
            variant="bordered"
            name="tahun_anggaran"
            value={formData.tahun_anggaran}
            onChange={handleChange}
          />
          <Input
            size="md"
            label="Pagu Anggaran"
            radius="sm"
            labelPlacement="outside"
            placeholder="Masukkan pagu anggaran"
            variant="bordered"
            name="pagu_anggaran"
            value={formData.pagu_anggaran}
            onChange={handleChange}
          />
          <Input
            size="md"
            label="Nilai HPS"
            radius="sm"
            labelPlacement="outside"
            placeholder="Masukkan Nilai HPS"
            variant="bordered"
            name="nilai_hps"
            value={formData.nilai_hps}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex flex-col w-full lg:w-1/2 gap-3">
          <FileInputAtom
            handleFileChange={handleFileChange}
            label="Surat Keputusan Penetapan PPK"
            name="suratKeputusan"
            fileName={formData.suratKeputusan}
          />
          <FileInputAtom
            handleFileChange={handleFileChange}
            label="Spesifikasi Teknis Dan Rancangan Detail"
            name="spesifikasiTeknis"
            fileName={formData.spesifikasiTeknis}
          />
          <FileInputAtom
            handleFileChange={handleFileChange}
            label="Kerangka Ajuan Kerja (KAK)"
            name="kerangkaAjuan"
            fileName={formData.kerangkaAjuan}
          />
          <FileInputAtom
            handleFileChange={handleFileChange}
            label="Rancangan Kontak"
            name="rancanganKontak"
            fileName={formData.rancanganKontak}
          />
          <FileInputAtom
            handleFileChange={handleFileChange}
            label="Dokumen Anggaran Belanja (DIPA/DPA atau RKA-KL/RKA-DP)"
            name="dokumenAnggaran"
            fileName={formData.dokumenAnggaran}
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2 gap-3">
          <FileInputAtom
            handleFileChange={handleFileChange}
            label="Waktu Penggunaan Barang/Jasa"
            name="waktuPenggunaan"
            fileName={formData.waktuPenggunaan}
          />
          <FileInputAtom
            handleFileChange={handleFileChange}
            label="Analisis Pasar"
            name="analisisPasar"
            fileName={formData.analisisPasar}
          />
          <FileInputAtom
            handleFileChange={handleFileChange}
            label="Probity Audit (Suket Lain Dari Inspektorat)"
            name="probityAudit"
            fileName={formData.probityAudit}
          />
          <FileInputAtom
            handleFileChange={handleFileChange}
            label="Uraian Pekerjaan, Identifikasi Bahaya, Dan Penetapan Resiko"
            name="uraianPekerjaan"
            fileName={formData.uraianPekerjaan}
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
        name="catatan"
        value={formData.catatan}
        onChange={handleChange}
        classNames={{
          base: "w-full catatan",
          input: "resize-y min-h-[170px] !rounded-none",
        }}
      />
      <div className="flex flex-col xs:flex-row gap-3 justify-end items-center">
        <Button
          type="submit"
          className="text-sm bg-green-500 text-white font-medium"
        >
          Simpan
        </Button>
        <Button
          type="submit"
          className="text-sm bg-warning-500 text-white font-medium"
        >
          Simpan & Ajukan
        </Button>
      </div>
    </form>
  );
}
