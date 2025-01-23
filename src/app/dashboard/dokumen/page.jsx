"use client";
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiUpload, FiEye, FiX } from "react-icons/fi";

const UploadTable = () => {
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentDocument, setCurrentDocument] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    regulationNumber: "",
    legalProduct: "",
    year: "2025",
    uploadDate: new Date().toLocaleDateString(),
    file: null,
    isUploaded: false,
  });

  const openModal = (mode, document = null) => {
    setModalMode(mode);
    setCurrentDocument(document);
    if (mode === "edit" && document) {
      setFormData(document);
    } else {
      resetFormData();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetFormData();
  };

  const resetFormData = () => {
    setFormData({
      title: "",
      regulationNumber: "",
      legalProduct: "",
      year: "2025",
      uploadDate: new Date().toLocaleDateString(),
      file: null,
      isUploaded: false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
  };

  const handleSave = () => {
    // Validasi form
    if (
      !formData.title ||
      !formData.regulationNumber ||
      !formData.legalProduct ||
      !formData.file
    ) {
      alert("Harap lengkapi semua field!");
      return;
    }

    if (modalMode === "add") {
      setDocuments((prev) => [...prev, { ...formData, id: prev.length + 1 }]);
    } else if (modalMode === "edit" && currentDocument) {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === currentDocument.id ? { ...formData, id: doc.id } : doc
        )
      );
    }
    closeModal();
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm(
      "Apakah Anda yakin ingin menghapus dokumen ini?"
    );
    if (confirmDelete) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    }
  };

  const handleUpload = (id) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, isUploaded: true } : doc))
    );
    alert("Dokumen berhasil diupload!");
  };

  const handleCancelUpload = (id) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, isUploaded: false } : doc))
    );
    alert("Upload dibatalkan!");
  };

  const handleView = (id) => {
    const doc = documents.find((doc) => doc.id === id);
    if (doc && doc.file) {
      const fileURL = URL.createObjectURL(doc.file);
      window.open(fileURL, "_blank");
    }
  };

  return (
    <div className="p-6">
      {/* Tombol Tambah Dokumen */}
      <button
        onClick={() => openModal("add")}
        className="mb-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Tambah Dokumen
      </button>

      {/* Tabel Dokumen */}
      <div className="overflow-x-auto overflow-hidden border-2 border-gray-300  w-full rounded-lg">
        <table className="min-w-full">
          <thead className="">
            <tr className="bg-gray-300">
              <th className="border-gray-400 px-4 py-2">No</th>
              <th className="border-gray-400 px-4 py-2 text-start">
                Judul Dokumen
              </th>
              <th className="border-gray-400 px-4 py-2 text-start">
                Nomor Peraturan
              </th>
              <th className="border-gray-400 px-4 py-2 text-start">
                Produk Hukum
              </th>
              <th className="border-gray-400 px-4 py-2">Tahun Peraturan</th>
              <th className="border-gray-400 px-4 py-2">Tanggal Upload</th>
              <th className="border-gray-400 px-4 py-2">Status</th>
              <th className="border-gray-400 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {documents.length > 0 ? (
              documents.map((doc, index) => (
                <tr key={doc.id} className="hover:bg-gray-50 bg-white">
                  <td className="border-gray-400 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border-gray-400 px-4 py-2">{doc.title}</td>
                  <td className="border-gray-400 px-4 py-2">
                    {doc.regulationNumber}
                  </td>
                  <td className="border-gray-400 px-4 py-2">
                    {doc.legalProduct}
                  </td>
                  <td className="border-gray-400 px-4 py-2 text-center">
                    {doc.year}
                  </td>
                  <td className="border-gray-400 px-4 py-2 text-center">
                    {doc.uploadDate}
                  </td>
                  <td className="border-gray-400 px-4 py-2 text-center">
                    {doc.isUploaded ? (
                      <span className="text-green-500">Published</span>
                    ) : (
                      <span className="text-yellow-500">Draft</span>
                    )}
                  </td>
                  <td className="border-gray-400 px-4 py-2 text-center">
                    <div className="flex flex-row gap-1 justify-center items-center">
                      {doc.isUploaded ? (
                        <button
                          onClick={() => handleCancelUpload(doc.id)}
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          <FiX />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpload(doc.id)}
                          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          <FiUpload />
                        </button>
                      )}
                      <button
                        onClick={() => handleView(doc.id)}
                        className="p-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => openModal("edit", doc)}
                        className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="border-gray-400 px-4 py-2 text-center text-gray-500"
                >
                  Tidak ada dokumen.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target.classList.contains("bg-gray-600")) closeModal();
          }}
        >
          <div
            className="bg-white rounded-lg p-6 w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">
              {modalMode === "add" ? "Tambah Dokumen" : "Edit Dokumen"}
            </h2>
            {/* Tombol Pilih File */}
            <div className="mb-4">
              <button
                onClick={() => document.getElementById("file-input").click()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-center"
              >
                Pilih File (PDF)
              </button>
              <input
                id="file-input"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {/* Form Input lainnya */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Judul Dokumen
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nomor Peraturan
              </label>
              <input
                type="text"
                name="regulationNumber"
                value={formData.regulationNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Produk Hukum
              </label>
              <select
                name="legalProduct"
                value={formData.legalProduct}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Pilih Produk Hukum</option>
                <option value="KEPWAL">KEPWAL</option>
                <option value="PERWAL">PERWAL</option>
                <option value="PERDA">PERDA</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tahun Peraturan
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                {Array.from(
                  { length: 2025 - 1945 + 1 },
                  (_, i) => 1945 + i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadTable;
