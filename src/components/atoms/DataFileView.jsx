import React from "react";
import PdfViewer from "../molecules/ReactPdfView";
import { HiDocumentText } from "react-icons/hi2";

export default function DataFileView({
  _key,
  fileUrl = "http://localhost:3000/assets/pdf/diazka.pdf",
}) {
  return (
    <div className="flex flex-row w-full justify-start items-start gap-1">
      <div className="w-1/4 text-gray-500">
        <p>{_key}</p>
      </div>

      <div className="w-full">
        <a
          href={fileUrl} // Gunakan path yang benar
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600
          w-full max-w-[10rem] text-center flex items-center justify-center"
        >
          <HiDocumentText className="inline mr-2" />
          Lihat Surat
        </a>
      </div>
    </div>
  );
}
