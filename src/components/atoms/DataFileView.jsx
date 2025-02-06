import React from "react";
import PdfViewer from "../molecules/ReactPdfView";

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
        <PdfViewer fileUrl={fileUrl}></PdfViewer>
      </div>
    </div>
  );
}
