import React from "react";
import UploadTable from "../components/UploadTable";

const UploadPage = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Manajemen Dokumen</h1>
      <UploadTable />
    </div>
  );
};

export default UploadPage;
