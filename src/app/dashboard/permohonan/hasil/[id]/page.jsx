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
      <FormContainer title="Detail Permohonan Clearing House" className="text-center">
        <div className="p-5 flex flex-col gap-3">
          <DataView _key="Status Dokumen" value="Terverifikasi" />
          <DataView _key="Nama Pemohon" value="Andi Prasetyo" />
          <DataView _key="Nama OPD" value="Dinas Pekerjaan Umum dan Penataan Ruang" />
          <DataView
            _key="Nama Paket Kegiatan"
            value="Pembangunan Jalan Lingkungan"
          />
          <DataView
            _key="Nama Barang/Jasa"
            value="Jasa Konstruksi"
          />
          <DataView
            _key="Nama K/L/PD"
            value="Kementerian PUPR"
          />
          <DataView _key="Nomor Sirup" value="1234567890" />
          <DataView _key="Tahun Anggaran" value="2024" />
          <DataView _key="Pagu Anggaran" value="1.500.000.000" />
          <DataView _key="Nilai HPS" value="1.450.000.000" />
          <DataView
            _key="Lokasi Pelaksanaan"
            value="Kabupaten Lombok Tengah"
          />
          <DataView _key="Metode Pemilihan" value="Tender Umum" />
          <DataView
            _key="Catatan"
            value="Pastikan dokumen pendukung sudah lengkap dan akurat sebelum diajukan untuk memastikan proses verifikasi berjalan lancar."
          />
          <DataFileView
            _key={"Surat Permohonan"}
            fileUrl="/assets/pdf/diazka.pdf"
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
