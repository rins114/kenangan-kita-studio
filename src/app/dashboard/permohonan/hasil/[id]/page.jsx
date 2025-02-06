"use client";
import DataFileView from "@/components/atoms/DataFileView";
import DataView from "@/components/atoms/DataView";
import FileInputAtom from "@/components/atoms/FileInput";
import FormContainer from "@/components/molecules/FormContainer";
import PdfViewer from "@/components/molecules/ReactPdfView";
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
import React, { useState } from "react";
import { FaFileAlt } from "react-icons/fa";

export default function HasilPage({ params }) {
  const { id } = React.use(params);
  const [isLangsung, setIsLangsung] = useState(true);
  const navigate = useRouter();
  return (
    <div className="p-5 flex flex-col gap-3">
      <FormContainer title="Hasil Permohonan Clearing House">
        <div className="p-5 flex flex-col gap-3">
          <DataView _key="Nama Pemohon" value="Budi Santoso" />
          <DataView _key="Nama OPD" value="Dinas Pendidikan Kota Mataram" />
          <DataView
            _key="Nama Paket Kegiatan"
            value="Pengadaan Buku Pelajaran SD 2025"
          />
          <DataView
            _key="Nama Barang/Jasa"
            value="Buku Pelajaran SD Kelas 1-6"
          />
          <DataView
            _key="Nama K/L/PD"
            value="Kementerian Pendidikan dan Kebudayaan"
          />
          <DataView _key="Nomor Sirup" value="1234567890" />
          <DataView _key="Tahun Anggaran" value="2025" />
          <DataView _key="Pagu Anggaran" value="500,000,000" />
          <DataView _key="Nilai HPS" value="450,000,000" />
          <DataView
            _key="Lokasi Pelaksanaan"
            value="Mataram, Nusa Tenggara Barat"
          />
          <DataView _key="Metode Pemilihan" value="E-Tendering" />
          <DataView
            _key="Catatan"
            value="Mohon segera diproses untuk pengadaan awal tahun. Pastikan semua dokumen lengkap dan sesuai dengan persyaratan untuk memperlancar proses pengadaan."
          />
          <DataFileView
            _key={"Surat Permohonan"}
            fileUrl="http://localhost:3000/assets/pdf/dokumen1.pdf"
          ></DataFileView>
        </div>
      </FormContainer>
      <FormContainer title="Keputusan Akhir">
        <form action="">
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
                labelSize="text-md"
                labelColor="text-zinc-500"
                label="Upload Berkas Hasil Diskusi"
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
                // value={keterangan}
                // onChange={(e) => setKeterangan(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="px-5 pb-5 w-full flex flex-row gap-3 justify-end items-center">
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
      </FormContainer>
    </div>
  );
}
