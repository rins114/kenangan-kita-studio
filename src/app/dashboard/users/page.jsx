"use client";
import Swal from 'sweetalert2';
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiEye, FiX, FiCheck, FiSearch } from "react-icons/fi";
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
      institutionAddress: "Jl. Contoh No. 1, Sumbawa, Nusa Tenggara Barat, Indonesia",
      phoneNumber: "081234567890",
      skPosition: "",
      skFile: null,
      isVerified: true, // Baru ditambahkan
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
      institutionName: "Dinas Pemadam Kebakaran dan Keselamatan Kab. Sumbawa",
      institutionAddress: "Jl. Contoh No. 2, Sumbawa, Nusa Tenggara Barat, Indonesia",
      phoneNumber: "089876543210",
      skPosition: "",
      skFile: null,
      isVerified: false, // Baru ditambahkan
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
      isVerified: false, // Baru ditambahkan
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
    setEditedUser({ ...user, skFile: user.skFile, isVerified: user.isVerified });
    setIsEditModalOpen(true);
  };

  const handleVerificationToggle = () => {
    if (!editedUser.isVerified) {
      // Jika sebelumnya belum terverifikasi, ubah menjadi terverifikasi
      setEditedUser({ ...editedUser, isVerified: true });

      // Tampilkan toast sukses
      toast.success("Pengguna berhasil diverifikasi!");
    } else {
      // Jika sebelumnya terverifikasi, ubah menjadi belum terverifikasi
      setEditedUser({ ...editedUser, isVerified: false });

      // Tampilkan toast info
      toast.error("Verifikasi pengguna dibatalkan.");
    }
  };
 
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Apakah Anda Yakin?',
      text: 'Pengguna yang dihapus tidak dapat dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Menghapus pengguna dari daftar
        setUsers(users.filter((user) => user.id !== id));

        // Tampilkan pesan SweetAlert berhasil
        Swal.fire({
          title: 'Berhasil!',
          text: 'Pengguna telah dihapus.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });
      }
    });
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
      toast.info("Tidak ada pembaruan.");
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
        toast.success("File PDF diunggah!")
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
    <div className="p-5">
      {/* Search and Filter */}
      <div className="flex justify-end mb-4 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari..."
            value={searchTerm}
            onChange={handleSearch}
            onFocus={(e) => e.target.nextSibling.classList.add('text-gray-950')}
            onBlur={(e) => e.target.nextSibling.classList.remove('text-gray-950')}
            className="block w-full pl-10 pr-3 py-2 border border-gray-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="block px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:ring-gray-950 focus:border-gray-950 sm:text-sm"
        >
          <option value="">Semua Tipe Pemohon</option>
          <option value="Penyedia">Penyedia</option>
          <option value="Non Penyedia">Non Penyedia</option>
        </select>
      </div>

      {/* Tabel Pengguna */}
      <div className="overflow-x-auto overflow-hidden border-2 border-gray-300 w-full rounded-lg text-sm">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-300">
              <th className="border-gray-400 px-4 py-2 text-center">No.</th>
              <th className="border-gray-400 px-4 py-2 text-start">Nama Pengguna</th>
              <th className="border-gray-400 px-4 py-2 text-start">Nama Lengkap</th>
              <th className="border-gray-400 px-4 py-2 text-start">Email</th>
              <th className="border-gray-400 px-4 py-2 text-start">Tipe Pemohon</th>
              <th className="border-gray-400 px-4 py-2 text-center">Status</th>
              <th className="border-gray-400 px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50 bg-white">
                  <td className="border-gray-400 px-4 py-2 text-center">{index + 1}</td>
                  <td className="border-gray-400 px-4 py-2 italic">{user.username}</td>
                  <td className="border-gray-400 px-4 py-2">{user.fullName}</td>
                  <td className="border-gray-400 px-4 py-2">{user.email}</td>
                  <td className="border-gray-400 px-4 py-2">{user.applicantType}</td>
                  <td className="border-gray-400 px-4 py-2 text-center">
                    <span className={user.isVerified ? "text-green-500" : "text-red-500"}>
                    {user.isVerified ? "Terverifikasi" : "Belum Terverifikasi"}
                    </span>
                  </td>
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
          autoClose={300}
          hideProgressBar={true}
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

      {/* Modal Detail Pengguna */}
      {isModalOpen && currentUser && (
        <div
          className="fixed px-3 inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[9999]"
          onClick={(e) => {
            if (e.target.classList.contains("bg-gray-900")) closeModal();
          }}
        >
          <div
            className="bg-white rounded-lg p-8 w-full md:w-1/2 shadow-lg h-fit overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-2 text-center">DETAIL PENGGUNA</h2>
            <div className="grid w-full justify-center items-center mb-2 text-sm">
              <p className="text-center"><strong>Status :</strong> 
              <span className=
                {currentUser.isVerified ? "text-green-500" : "text-red-500"}>
                {currentUser.isVerified ? " Terverifikasi" : " Belum Terverifikasi"}
                </span></p>
            </div>
            <div className="grid grid-cols-2 gap-2 max-w-3xl mx-auto text-sm">
              <p>
                <strong>Nama Pengguna :</strong>
                <br />
                <span className="italic">{currentUser.username}</span>
              </p>
              <p>
                <strong>Nama Lengkap :</strong>
                <br />
                {currentUser.fullName}
              </p>
              <p>
                <strong>Email:</strong>
                <br />
                {currentUser.email}
              </p>
              <p>
                <strong>Tipe Pemohon:</strong>
                <br />
                {currentUser.applicantType}
              </p>
              <p>
                <strong>Tipe Pengguna:</strong>
                <br />
                {currentUser.userType}
              </p>
              <p>
                <strong>NIP:</strong>
                <br />
                {currentUser.nip}
              </p>
              <p>
                <strong>NIK:</strong>
                <br />
                {currentUser.nik}
              </p>
              <p>
                <strong>NPWP:</strong>
                <br />
                {currentUser.npwp}
              </p>
              <p>
                <strong>Nama Instansi:</strong>
                <br />
                {currentUser.institutionName}
              </p>
              <p>
                <strong>Alamat Instansi:</strong>
                <br />
                {currentUser.institutionAddress}
              </p>
              <p>
                <strong>No. HP:</strong>
                <br />
                {currentUser.phoneNumber}
              </p>
              <p>
                <strong>SK Jabatan: </strong>
                <br />
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
            <div className="mt-2 flex justify-center">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 text-sm"
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
          className="fixed px-3 inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[9999] overflow-y-auto p-4"
          onClick={(e) => {
            if (e.target.classList.contains("bg-gray-900")) closeEditModal();
          }}
        >
          <div
            className="bg-white rounded-lg p-6 w-full md:w-1/2 shadow-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-2 text-center">UBAH PENGGUNA</h2>
            <form>
              <div className="flex justify-center items-center w-full mb-2 text-sm">
                <label className="block text-center">Status Verifikasi : </label>
                <div className="flex items-center gap-4">
                  {/* Tampilkan status verifikasi dengan ikon */}
                  {editedUser.isVerified ? (
                    <div className="flex items-center gap-2 m-2">
                      <FiCheck className="w-5 h-5 text-green-500" />
                      <span className="font-semibold text-green-500">
                      Terverifikasi</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 m-2">
                      <FiX className="w-5 h-5 text-red-500" />
                      <span className="font-semibold text-red-500">
                      Belum Terverifikasi</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block">Nama Pengguna</label>
                  <input
                    disabled
                    type="text"
                    value={editedUser.username}
                    className="border px-4 py-2 w-full italic"
                  />
                </div>
                <div>
                  <label className="block">Nama Lengkap</label>
                  <input
                    disabled
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
                    disabled
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
                  <select
                    value={editedUser.userType}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, userType: e.target.value })
                    }
                    className="border px-4 py-2 w-full"
                    placeholder="PILIH"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="PA">PA</option>
                    <option value="BENDAHARA">BENDAHARA</option>
                    <option value="PPK">BENDAHARA</option>
                    <option value="PPTK">BENDAHARA</option>
                  </select>
                </div>
                <div>
                  <label className="block">NIP</label>
                  <input
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
                    disabled
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
            <div className="mt-4 flex justify-center gap-4 text-sm">
              {/* Tombol Verifikasi atau Batalkan Verifikasi */}
              {!editedUser.isVerified ? (
              <button
                type="button"
                onClick={handleVerificationToggle}
                className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 flex items-center gap-2"
              >
                <FiCheck className="w-5 h-5" />
                Verifikasi
              </button>
              
              ) : (
              <button
                type="button"
                onClick={handleVerificationToggle}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
              >
                <FiX className="w-5 h-5" />
                Batalkan Verifikasi
              </button>
                  )}
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
