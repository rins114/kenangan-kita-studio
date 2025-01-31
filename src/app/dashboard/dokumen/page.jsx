"use client";
import Swal from 'sweetalert2';
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiUpload, FiEye, FiX, FiCheck, FiSearch} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

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
    toast.success("File dokumen ditambahkan")
  };

  const handleSave = () => {
    if (!formData.title || !formData.regulationNumber || !formData.legalProduct || !formData.file) {
      toast.error("Harap lengkapi semua kolom!");
      return;
    }

    if (modalMode === "edit" && currentDocument) {
      // Periksa apakah ada perubahan antara data sebelumnya dan yang baru
      const isUnchanged =
        formData.title === currentDocument.title &&
        formData.regulationNumber === currentDocument.regulationNumber &&
        formData.legalProduct === currentDocument.legalProduct &&
        formData.year === currentDocument.year;
  
      if (isUnchanged) {
        toast.info("Tidak ada pembaruan!.");
        return;
      }
    };

    if (modalMode === "add") {
      setDocuments((prev) => [...prev, { ...formData, id: prev.length + 1 }]);
      Swal.fire({
        title: 'Berhasil!',
        text: 'Dokumen telah ditambahkan.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
    } else if (modalMode === "edit" && currentDocument) {
      setDocuments((prev) =>
        prev.map((doc) => (doc.id === currentDocument.id ? { ...formData, id: doc.id } : doc))
      );
      toast.success("Dokumen berhasil diperbarui!");
    }
    closeModal();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda Yakin?',
      text: 'Dokumen yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      // Tampilkan pesan SweetAlert berhasil
      Swal.fire({
        title: 'Berhasil!',
        text: 'Dokumen telah dihapus.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
    }
  });
};  

  const handleUpload = (id) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === id ? { ...doc, isUploaded: true } : doc)));
    toast.success("Dokumen Berhasil Diterbitkan!");
  };

  const handleCancelUpload = (id) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === id ? { ...doc, isUploaded: false } : doc)));
    toast.error("Penerbitan Dokumen Dibatalkan!");
  };

  const handleView = (id) => {
    const doc = documents.find((doc) => doc.id === id);
    if (doc && doc.file) {
      const fileURL = URL.createObjectURL(doc.file);
      window.open(fileURL, "_blank");
    }
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      (doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.regulationNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory ? doc.legalProduct === filterCategory : true)
  );

  return (
    <div className="p-5">
      {/* Pencarian dan Filter */}
      <div className="flex justify-between items-center mb-6 gap-2">
        {/* Tombol Tambah Dokumen */}
        <button
          onClick={() => openModal("add")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <FiUpload className="text-sm"/>
          <span className="hidden sm:inline text-sm">Tambah Dokumen</span>
          <span className="sm:hidden text-sm">Tambah</span>
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Cari..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={(e) => e.target.nextSibling.classList.add('text-gray-950')}
            onBlur={(e) => e.target.nextSibling.classList.remove('text-gray-950')}
            className="block w-full pr-3 py-2 pl-10 border border-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>   

      {/* Tabel Dokumen */}
      <div className="overflow-x-auto overflow-hidden border-2 border-gray-300 w-full rounded-lg text-sm">
        <table className="min-w-full">
          <thead className="">
            <tr className="bg-gray-300">
              <th className="border-gray-400 px-4 py-2">No.</th>
              <th className="border-gray-400 px-4 py-2 text-start">Judul Dokumen</th>
              <th className="border-gray-400 px-4 py-2 text-start">Nomor Peraturan</th>
              <th className="border-gray-400 px-4 py-2 text-start">Produk Hukum</th>
              <th className="border-gray-400 px-4 py-2">Tahun Peraturan</th>
              <th className="border-gray-400 px-4 py-2">Tanggal Upload</th>
              <th className="border-gray-400 px-4 py-2">Status</th>
              <th className="border-gray-400 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc, index) => (
                <tr key={doc.id} className="hover:bg-gray-50 bg-white">
                  <td className="border-gray-400 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border-gray-400 px-4 py-2">{doc.title}</td>
                  <td className="border-gray-400 px-4 py-2">{doc.regulationNumber}</td>
                  <td className="border-gray-400 px-4 py-2">{doc.legalProduct}</td>
                  <td className="border-gray-400 px-4 py-2 text-center">{doc.year}</td>
                  <td className="border-gray-400 px-4 py-2 text-center">{doc.uploadDate}</td>
                  <td className="border-gray-400 px-4 py-2 text-center">
                    {doc.isUploaded ? (
                      <span className="text-green-500">Terbit</span>
                    ) : (
                      <span className="text-danger-500">Draft</span>
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

      {/* ToastContainer */}
       <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ zIndex: 999999 }}
          limit={1}
       />

      {/* Modal */}
      {isModalOpen && (
        <div
        className="fixed px-3 inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[9999]"
        onClick={(e) => {
          if (e.target.classList.contains("bg-gray-900")) closeModal();
        }}
      >
        <div
          className="bg-white rounded-lg p-6 w-full md:w-1/2 shadow-lg backdrop-blur-lg"
          onClick={(e) => e.stopPropagation()}
        >
            <h2 className="text-lg font-semibold mb-4 items-center justify-center">
              {modalMode === "add" ? "TAMBAH DOKUMEN" : "EDIT DOKUMEN"}
            </h2>
            {/* Tombol Pilih File */}
            <div className="mb-4">
              <button
                onClick={() => document.getElementById("file-input").click()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-center"
              >
                <FiUpload className="inline mr-2"/>
                Pilih File (.pdf)
              </button>
              <input
                id="file-input"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              {/* Menampilkan Nama File Jika Sudah Dipilih */}
              {formData.file && (
                <p className="mt-2 text-sm text-gray-600">
                  Nama File Terpilih: <span className="font-medium">{formData.file.name}</span>
                </p>
              )}
            </div>
            {/* Form Input lainnya */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Judul Dokumen
              </label>
              <input
                placeholder="Masukkan Judul Dokumen..."
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder:italic"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Nomor Peraturan
              </label>
              <input
                placeholder="Masukkan Nomor Peraturan..."
                type="text"
                name="regulationNumber"
                value={formData.regulationNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder:italic"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus">
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
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
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
