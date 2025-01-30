"use client";
import Swal from 'sweetalert2';
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiUpload, FiEye, FiX, FiPlusSquare, FiSearch } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadGaleri = () => {
  const [galeri, setGaleri] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentGaleri, setCurrentGaleri] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [previewDeskripsi, setPreviewDeskripsi] = useState(null);
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    tanggal: new Date().toLocaleDateString(),
    gambar: null,
    isPublished: false,
  });

  const openModal = (mode, item = null) => {
    setModalMode(mode);
    setCurrentGaleri(item);
    if (mode === "edit" && item) {
      setFormData(item);
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
      judul: "",
      deskripsi: "",
      tanggal: new Date().toLocaleDateString(),
      gambar: null,
      isPublished: false,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // Create a new image object to check dimensions
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = Math.min(img.width, img.height);
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Calculate cropping
        const offsetX = (img.width - size) / 2;
        const offsetY = (img.height - size) / 2;
        
        ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, size, size);
        
        canvas.toBlob((blob) => {
          const croppedFile = new File([blob], file.name, { type: file.type });
          setFormData({ ...formData, gambar: croppedFile });
          toast.success("Gambar berhasil ditambahkan");
        }, file.type);
      };
      img.src = URL.createObjectURL(file);
    } else {
      toast.error("File harus berupa gambar!");
    }
  };

  const handleSave = () => {
    if (!formData.judul || !formData.deskripsi || !formData.gambar) {
      toast.error("Harap lengkapi semua kolom!");
      return;
    }

    if (modalMode === "add") {
      setGaleri((prev) => [...prev, { ...formData, id: prev.length + 1 }]);
      Swal.fire({
        title: 'Berhasil!',
        text: 'Gambar telah ditambahkan ke galeri.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
    } else if (modalMode === "edit" && currentGaleri) {
      // Check if there are any changes
      const hasChanges = 
        formData.judul !== currentGaleri.judul ||
        formData.deskripsi !== currentGaleri.deskripsi ||
        formData.gambar !== currentGaleri.gambar;

      if (!hasChanges) {
        toast.info("Tidak ada perubahan yang dilakukan");
        return;
      }

      setGaleri((prev) =>
        prev.map((item) => (item.id === currentGaleri.id ? { ...formData, id: item.id } : item))
      );
      toast.success("Galeri berhasil diperbarui!");
    }
    closeModal();
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda Yakin?',
      text: 'Gambar yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        setGaleri((prev) => prev.filter((item) => item.id !== id));
        Swal.fire({
          title: 'Berhasil!',
          text: 'Gambar telah dihapus dari galeri.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      }
    });
  };

  const handlePublish = (id) => {
    setGaleri((prev) => prev.map((item) => (item.id === id ? { ...item, isPublished: true } : item)));
    toast.success("Gambar berhasil dipublikasikan!");
  };

  const handleUnpublish = (id) => {
    setGaleri((prev) => prev.map((item) => (item.id === id ? { ...item, isPublished: false } : item)));
    toast.error("Publikasi gambar dibatalkan!");
  };

  const handleImagePreview = (image) => {
    setPreviewImage(URL.createObjectURL(image));
  };

  const handleDeskripsiPreview = (deskripsi) => {
    setPreviewDeskripsi(deskripsi);
  };

  const truncateText = (text, lines = 3) => {
    const words = text.split(' ');
    const averageWordsPerLine = 6;
    const maxWords = lines * averageWordsPerLine;
    
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  const filteredGaleri = galeri.filter(
    (item) =>
      item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => openModal("add")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <FiUpload/>
          Tambah Gambar
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Cari..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pr-3 py-2 pl-10 border border-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto overflow-hidden border-2 border-gray-300 w-full rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-300">
              <th className="border-gray-400 px-4 py-2">No</th>
              <th className="border-gray-400 px-4 py-2">Gambar</th>
              <th className="border-gray-400 px-4 py-2">Judul</th>
              <th className="border-gray-400 px-4 py-2">Deskripsi</th>
              <th className="border-gray-400 px-4 py-2">Tanggal Upload</th>
              <th className="border-gray-400 px-4 py-2">Status</th>
              <th className="border-gray-400 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredGaleri.length > 0 ? (
              filteredGaleri.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 bg-white">
                  <td className="border-gray-400 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border-gray-400 px-4 py-2 text-center">
                    <img 
                      src={URL.createObjectURL(item.gambar)} 
                      alt={item.judul}
                      className="w-24 h-24 object-cover cursor-pointer"
                      onClick={() => handleImagePreview(item.gambar)}
                    />
                  </td>
                  <td className="border-gray-400 px-4 py-2 text-center">{item.judul}</td>
                  <td className="border-gray-400 px-4 py-2 text-start">
                    <div className="max-h-[4.5em] overflow-hidden">
                      {truncateText(item.deskripsi)}
                    </div>
                  </td>
                  <td className="border-gray-400 px-4 py-2 text-center">{item.tanggal}</td>
                  <td className="border-gray-400 px-4 py-2 text-center">
                    <span className={`text-sm ${item.isPublished ? 'text-green-500' : 'text-red-500'}`}>
                      {item.isPublished ? 'Dipublikasi' : 'Draft'}
                    </span>
                  </td>
                  <td className="border-gray-400 px-4 py-2">
                    <div className="flex gap-2 justify-center">
                      {item.isPublished ? (
                        <button
                          onClick={() => handleUnpublish(item.id)}
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          <FiX />
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePublish(item.id)}
                          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          <FiUpload />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeskripsiPreview(item.deskripsi)}
                        className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => openModal("edit", item)}
                        className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
                <td colSpan="6" className="border-gray-400 px-4 py-2 text-center text-gray-500">
                  Belum ada gambar dalam galeri.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[9999]"
          onClick={(e) => {
            if (e.target.classList.contains("bg-gray-900")) closeModal();
          }}
        >
          <div
            className="bg-white rounded-lg p-6 w-1/2 shadow-lg backdrop-blur-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4 items-center justify-center">
              {modalMode === "add" ? "TAMBAH GAMBAR" : "EDIT GAMBAR"}
            </h2>
            
            <div className="mb-4">
              <button
                onClick={() => document.getElementById("file-input").click()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full text-center"
              >
                <FiUpload className="inline mr-2"/>
                Pilih Gambar (.jpg, .jpeg, .png)
              </button>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {formData.gambar && (
                <p className="mt-2 text-sm text-gray-600">
                  File Terpilih: <span className="font-medium">{formData.gambar.name}</span>
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Judul Gambar
              </label>
              <input
                type="text"
                name="judul"
                value={formData.judul}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Deskripsi
              </label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={(e) => {
                  const words = e.target.value.trim().split(/\s+/);
                  if (words.length <= 100) {
                    handleInputChange(e);
                  } else {
                    toast.error("Deskripsi tidak boleh lebih dari 100 kata");
                  }
                }}
                rows="5"
                placeholder="Maksimal 100 Kata" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <span className="sm:text-sm mt-1 text-gray-700">
                Sisa Kata: {100 - (formData.deskripsi.trim().split(/\s+/).filter(word => word.length > 0).length)}
              </span>
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

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[99999]"
          onClick={() => setPreviewImage(null)}
        >
          <div className="bg-white p-2 rounded-lg max-w-2xl max-h-2xl">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}

      {/* Deskripsi Preview Modal */}
      {previewDeskripsi && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[99999]"
          onClick={() => setPreviewDeskripsi(null)}
        >
          <div className="bg-white p-6 rounded-lg max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Deskripsi Lengkap</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{previewDeskripsi}</p>
            <button
              onClick={() => setPreviewDeskripsi(null)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadGaleri;
