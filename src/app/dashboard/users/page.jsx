"use client";
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UsersTable = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "@admin",
      fullName: "Admin",
      email: "admin@example.com",
      applicantType: "Admin",
      userType: "Admin",
      nip: "123456789",
      nik: "1234567890123456",
      npwp: "123.456.789-0",
      institutionName: "Dinas Kominfotik Sumbawa",
      institutionAddress: "Jl. Contoh No. 1, Sumbawa",
      phoneNumber: "081234567890",
      skPosition: "",
      skFile: null,
    },
    {
      id: 2,
      username: "@janedoe",
      fullName: "Jane Doe",
      email: "janedoe@example.com",
      applicantType: "Non Penyedia",
      userType: "Bendahara",
      nip: "987654321",
      nik: "6543210987654321",
      npwp: "987.654.321-0",
      institutionName: "Dinas Kominfotiksandi Kab. Sumbawa",
      institutionAddress: "Jl. Contoh No. 2, Sumbawa",
      phoneNumber: "089876543210",
      skPosition: "",
      skFile: null,
    },
    {
      id: 3,
      username: "@johndoe",
      fullName: "John Doe",
      email: "janedoe@example.com",
      applicantType: "Penyedia",
      userType: "",
      nip: "987654321",
      nik: "6543210987654321",
      npwp: "987.654.321-0",
      institutionName: "CV. Sumber Makmoer",
      institutionAddress: "Jl. Contoh No. 3, Sumbawa",
      phoneNumber: "089876543210",
      skPosition: "",
      skFile: null,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [skFile, setSkFile] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null); // Menyimpan pengguna yang akan dihapus

  const handleView = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditedUser({ ...user, skFile: user.skFile });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      setUsers(users.filter((user) => user.id !== id));
      toast.error("Pengguna berhasil dihapus.");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditedUser(null);
    setSkFile(null);
  };

  const handleSaveEdit = () => {
    // Ambil data pengguna yang sedang diedit berdasarkan id
    const userToUpdate = users.find((user) => user.id === editedUser.id);
  
    // Periksa apakah ada perubahan pada data selain file SK
    const isUnchanged = Object.keys(editedUser).every((key) => {
      // Cek jika key bukan 'skFile' agar tidak membandingkan file yang berbeda
      if (key !== "skFile") {
        return editedUser[key] === userToUpdate[key];
      }
      return true; // Lewati perbandingan untuk 'skFile'
    });
  
    // Jika tidak ada perubahan, tampilkan toast info
    if (isUnchanged && !skFile) {
      toast.info("Tidak ada pembaruan yang dilakukan.");
    } else {
      // Jika ada perubahan, update data pengguna
      const updatedUsers = users.map((user) =>
        user.id === editedUser.id ? { ...editedUser, skFile: skFile || userToUpdate.skFile } : user
      );
      setUsers(updatedUsers);
      closeEditModal();
      toast.success("Data pengguna berhasil diperbarui!");
    }
  };  
  

  const handleSkFileChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      // Periksa apakah file berformat PDF
      if (file.type === "application/pdf") {
        setSkFile(file);
      } else {
        // Tampilkan toast error jika file bukan PDF
        toast.error("Hanya file PDF yang diizinkan.");
        e.target.value = ""; // Reset input file
      }
    }
  };  

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType ? user.applicantType === filterType : true)
  );

  return (
    <div className="p-6">
      {/* Search and Filter */}
      <div className="flex justify-end mb-4 gap-4">
        <input
          type="text"
          placeholder="Cari Nama Lengkap..."
          value={searchTerm}
          onChange={handleSearch}
          className="border px-4 py-2 rounded"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">Semua Tipe Pemohon</option>
          <option value="Penyedia">Penyedia</option>
          <option value="Non Penyedia">Non Penyedia</option>
        </select>
      </div>

      {/* Tabel Pengguna */}
      <div className="overflow-x-auto overflow-hidden border-2 border-gray-300 w-full rounded-lg">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-300">
              <th className="border-gray-400 px-4 py-2">No</th>
              <th className="border-gray-400 px-4 py-2 text-start">Nama Pengguna</th>
              <th className="border-gray-400 px-4 py-2 text-start">Nama Lengkap</th>
              <th className="border-gray-400 px-4 py-2 text-start">Email</th>
              <th className="border-gray-400 px-4 py-2 text-start">Tipe Pemohon</th>
              <th className="border-gray-400 px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50 bg-white">
                  <td className="border-gray-400 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border-gray-400 px-4 py-2">{user.username}</td>
                  <td className="border-gray-400 px-4 py-2">{user.fullName}</td>
                  <td className="border-gray-400 px-4 py-2">{user.email}</td>
                  <td className="border-gray-400 px-4 py-2">{user.applicantType}</td>
                  <td className="border-gray-400 px-4 py-2 text-center">
                    <div className="flex flex-row gap-1 justify-center items-center">
                      <button
                        onClick={() => handleView(user)}
                        className="p-2 bg-teal-500 text-white rounded hover:bg-teal-600"
                      >
                        <FiEye />
                      </button>
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
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
                  colSpan="6"
                  className="border-gray-400 px-4 py-2 text-center text-gray-500"
                >
                  Tidak ada pengguna.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ToastContainer */}
       <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ zIndex: 999999 }}
       />

      {/* Modal Detail Pengguna */}
      {isModalOpen && currentUser && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[9999]"
          onClick={(e) => {
            if (e.target.classList.contains("bg-gray-900")) closeModal();
          }}
        >
          <div
            className="bg-white rounded-lg p-6 w-2/3 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Detail Pengguna</h2>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Nama Pengguna:</strong> {currentUser.username}</p>
              <p><strong>Nama Lengkap:</strong> {currentUser.fullName}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
              <p><strong>Tipe Pemohon:</strong> {currentUser.applicantType}</p>
              <p><strong>Tipe Pengguna:</strong> {currentUser.userType}</p>
              <p><strong>NIP:</strong> {currentUser.nip}</p>
              <p><strong>NIK:</strong> {currentUser.nik}</p>
              <p><strong>NPWP:</strong> {currentUser.npwp}</p>
              <p><strong>Nama Instansi:</strong> {currentUser.institutionName}</p>
              <p><strong>Alamat Instansi:</strong> {currentUser.institutionAddress}</p>
              <p><strong>No. HP:</strong> {currentUser.phoneNumber}</p>
              <p>
                <strong>SK Jabatan: </strong>
                {currentUser.skFile ? (
                  <>
                    <span>{currentUser.skFile.name}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Mencegah aksi default
                        const fileUrl = URL.createObjectURL(currentUser.skFile);
                        window.open(fileUrl, "_blank"); // Membuka file dalam tab baru
                      }}
                      className="text-blue-500 hover:underline ml-2"
                    >
                      Lihat File
                    </button>
                  </>
                ) : (
                  currentUser.skPosition
                )}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Pengguna */}
      {isEditModalOpen && editedUser && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[9999]"
          onClick={(e) => {
            if (e.target.classList.contains("bg-gray-900")) closeEditModal();
          }}
        >
          <div
            className="bg-white rounded-lg p-6 w-2/3 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Edit Pengguna</h2>
            <form>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block">Nama Pengguna</label>
                  <input
                    type="text"
                    value={editedUser.username}
                    disabled
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block">Nama Lengkap</label>
                  <input
                    type="text"
                    value={editedUser.fullName}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, fullName: e.target.value })
                    }
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block">Email</label>
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, email: e.target.value })
                    }
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block">Tipe Pemohon</label>
                  <select
                    value={editedUser.applicantType}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, applicantType: e.target.value })
                    }
                    className="border px-4 py-2 w-full"
                  >
                    <option value="Penyedia">Penyedia</option>
                    <option value="Non Penyedia">Non Penyedia</option>
                  </select>
                </div>
                <div>
                  <label className="block">Tipe Pengguna</label>
                  <input
                    type="text"
                    value={editedUser.userType}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, userType: e.target.value })
                    }
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block">NIP</label>
                  <input
                    type="text"
                    value={editedUser.nip}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, nip: e.target.value })
                    }
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block">NIK</label>
                  <input
                    type="text"
                    value={editedUser.nik}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, nik: e.target.value })
                    }
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block">NPWP</label>
                  <input
                    type="text"
                    value={editedUser.npwp}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, npwp: e.target.value })
                    }
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block">Nama Instansi</label>
                  <input
                    type="text"
                    value={editedUser.institutionName}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        institutionName: e.target.value,
                      })
                    }
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block">Alamat Instansi</label>
                  <input
                    type="text"
                    value={editedUser.institutionAddress}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        institutionAddress: e.target.value,
                      })
                    }
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block">No. HP</label>
                  <input
                    type="text"
                    value={editedUser.phoneNumber}
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        phoneNumber: e.target.value,
                      })
                    }
                    className="border px-4 py-2 w-full"
                  />
                </div>
                <div>
                  <label className="block">SK Jabatan (.pdf)</label>
                  <input
                    type="file"
                    onChange={handleSkFileChange}
                    className="border px-4 py-2 w-full"
                  />
                  {/* Display file name if available */}
                  {editedUser.skFile && (
                    <div className="mt-2">
                      <span>File yang diunggah: {editedUser.skFile.name}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault(); // Mencegah aksi default
                          const fileUrl = URL.createObjectURL(editedUser.skFile);
                          window.open(fileUrl, "_blank"); // Membuka file dalam tab baru
                        }}
                        className="text-blue-500 hover:underline ml-2"
                      >
                        Lihat File PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </form>
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={closeEditModal}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
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

export default UsersTable;
