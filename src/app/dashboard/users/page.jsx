"use client";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import {
  FiEdit,
  FiTrash2,
  FiEye,
  FiX,
  FiCheck,
  FiSearch,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUsers, rejectUser, verifyUser } from "@/services/Users";
import { showToast } from "@/utils/ShowToast";
import { useRouter } from "next/navigation";
import APP_CONFIG from "@/globals/app-config";
const TOKEN = localStorage.getItem("access_token");

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [skFile, setSkFile] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      const result = await getUsers(TOKEN);
      if (result.status === 403) {
        await showToast("warning", "Forbidden access!");
        navigate.back();
        return;
      }

      if (result.status !== 200) {
        await showToast("error", "Kesalahan pada server: pengguna");
        return;
      }
      setUsers(result.data.data);
    }
    fetchUsers();
  }, []);

  //Method integrasi backend untuk verifikasi user
  const handleVerifikasiToggle = async (id) => {
    if (!editedUser.is_verified) {
      const result = await verifyUser(TOKEN, id);
      if (result.status !== 200) {
        await showToast("error", `Verifikasi user: ${result.message}`);
        return;
      }
      toast.success("Pengguna berhasil diverifikasi!");
      window.location.reload();
    } else {
      const result = await rejectUser(TOKEN, id);
      if (result.status !== 200) {
        await showToast("error", `Verifikasi user: ${result.message}`);
        return;
      }
      toast.error("Verifikasi pengguna dibatalkan.");
      window.location.reload();
    }
  };

  useEffect(() => {
    console.log(users);
  }, [users]);

  const handleView = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditedUser({
      ...user,
      skFile: user.skFile,
      isVerified: user.isVerified,
    });
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
      title: "Apakah Anda Yakin?",
      text: "Pengguna yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Menghapus pengguna dari daftar
        setUsers(users?.filter((user) => user.id !== id));

        // Tampilkan pesan SweetAlert berhasil
        Swal.fire({
          title: "Berhasil!",
          text: "Pengguna telah dihapus.",
          icon: "success",
          confirmButtonColor: "#3085d6",
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
        user.id === editedUser.id
          ? { ...editedUser, skFile: skFile || userToUpdate.skFile }
          : user
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
        toast.success("File PDF diunggah!");
      } else {
        // Tampilkan toast error jika file bukan PDF
        toast.error("Hanya file PDF yang diizinkan.");
        e.target.value = ""; // Reset input file
      }
    }
  };

  // const filteredUsers = users?.filter(
  //   (user) =>
  //     user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
  //     (filterType ? user.applicantType === filterType : true)
  // );

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
            onFocus={(e) => e.target.nextSibling.classList.add("text-gray-950")}
            onBlur={(e) =>
              e.target.nextSibling.classList.remove("text-gray-950")
            }
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
              <th className="border-gray-400 px-4 py-2 text-start">
                Nama Lengkap
              </th>
              <th className="border-gray-400 px-4 py-2 text-start">Email</th>
              <th className="border-gray-400 px-4 py-2 text-start">
                Tipe Pemohon
              </th>
              <th className="border-gray-400 px-4 py-2 text-start">Tanggal Daftar</th>
              <th className="border-gray-400 px-4 py-2 text-center">Status</th>
              <th className="border-gray-400 px-4 py-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users?.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50 bg-white">
                  <td className="border-gray-400 px-4 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border-gray-400 px-4 py-2">
                    {user.name}
                  </td>
                  <td className="border-gray-400 px-4 py-2">{user.email}</td>
                  <td className="border-gray-400 px-4 py-2">
                    {user?.roles?.startsWith("Non_Penyedia_")
                      ? user?.roles?.split("_")[2]
                      : user?.roles}
                  </td>
                  <td className="border-gray-400 px-4 py-2">{new Date(user.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                  </td>
                  <td className="border-gray-400 px-4 py-2 text-center">
                    <span
                      className={
                        user.is_verified === 1
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {user.is_verified === 1
                        ? "Terverifikasi"
                        : "Belum Terverifikasi"}
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
            className="bg-white rounded-lg p-8 w-full max-w-2xl shadow-lg h-fit overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-2 text-center">
              DETAIL PENGGUNA
            </h2>
            <div className="grid w-full justify-center items-center mb-2 text-sm">
              <p className="text-center">
                <strong>Status :</strong>
                <span
                  className={
                    currentUser.is_verified ? "text-green-500" : "text-red-500"
                  }
                >
                  {currentUser.is_verified
                    ? " Terverifikasi"
                    : " Belum Terverifikasi"}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-3xl mx-auto text-sm">
              <p>
                <strong>Nama Lengkap :</strong>
                <br />
                {currentUser.name}
              </p>
              <p>
                <strong>Email:</strong>
                <br />
                {currentUser.email}
              </p>
              <p>
                <strong>Tipe Pemohon:</strong>
                <br />
                {currentUser.roles.startsWith("Non_Penyedia")
                  ? "Non Penyedia"
                  : currentUser.roles}
              </p>
              <p>
                <strong>Tipe Pengguna:</strong>
                <br />
                {currentUser.roles.startsWith("Non_Penyedia")
                  ? currentUser.roles.split("_")[2]
                  : currentUser.roles}
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
                {currentUser.no_npwp}
              </p>
              <p>
                <strong>Nama Instansi:</strong>
                <br />
                {currentUser.nama_perusahaan}
              </p>
              <p>
                <strong>Alamat Instansi:</strong>
                <br />
                {currentUser.alamat_perusahaan}
              </p>
              <p>
                <strong>No. HP:</strong>
                <br />
                {currentUser.no_hp ?? "-"}
              </p>
              <p>
                <strong>SK Jabatan: </strong>
                <br />
                {currentUser.sk_jabatan ? (
                  <>
                    <span>{currentUser.sk_jabatan.name}</span>
                    <button
                      onClick={(e) => {
                        window.open(
                          `${APP_CONFIG.STORAGE_URL}${currentUser.sk_jabatan}`,
                          "_blank"
                        );
                      }}
                      className="text-blue-500 hover:underline"
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
            <h2 className="text-lg font-semibold mb-2 text-center">
              UBAH PENGGUNA
            </h2>
            <form>
              <div className="flex justify-center items-center w-full mb-2 text-sm">
                <label className="block text-center">
                  Status Verifikasi :{" "}
                </label>
                <div className="flex items-center gap-4">
                  {/* Tampilkan status verifikasi dengan ikon */}
                  {editedUser.is_verified ? (
                    <div className="flex items-center gap-2 m-2">
                      <FiCheck className="w-5 h-5 text-green-500" />
                      <span className="font-semibold text-green-500">
                        Terverifikasi
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 m-2">
                      <FiX className="w-5 h-5 text-red-500" />
                      <span className="font-semibold text-red-500">
                        Belum Terverifikasi
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block">Nama Lengkap</label>
                  <input
                    disabled
                    type="text"
                    value={editedUser.name}
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
                    value={
                      editedUser.roles.startsWith("Non_Penyedia")
                        ? "Non Penyedia"
                        : "Penyedia"
                    }
                    onChange={(e) =>
                      setEditedUser({
                        ...editedUser,
                        applicantType: e.target.value,
                      })
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
                    value={editedUser.roles}
                    onChange={(e) =>
                      setEditedUser({ ...editedUser, userType: e.target.value })
                    }
                    className="border px-4 py-2 w-full"
                    placeholder="PILIH"
                  >
                    <option value="Penyedia">Penyedia</option>
                    <option value="Non_Penyedia_PA">PA</option>
                    <option value="Non_Penyedia_BENDAHARA">BENDAHARA</option>
                    <option value="Non_Penyedia_PPK">BENDAHARA</option>
                    <option value="Non_Penyedia_PPTK">BENDAHARA</option>
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
                    value={editedUser.no_npwp}
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
                    value={editedUser.nama_perusahaan}
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
                    value={editedUser.alamat_perusahaan}
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
                    disabled
                    value={editedUser.no_hp ? editedUser.no_hp : "-"}
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
                  {/* <label className="block">SK Jabatan (.pdf)</label>
                  <input
                    type="file"
                    onChange={handleSkFileChange}
                    className="border px-4 py-2 w-full"
                  /> */}
                  {/* Display file name if available */}
                  {editedUser.sk_jabatan && (
                    <div className="mt-2">
                      <span>SK Jabatan: {editedUser.sk_jabatan.name}</span>
                      <button
                        onClick={(e) => {
                          window.open(
                            `${APP_CONFIG.STORAGE_URL}${editedUser.sk_jabatan}`,
                            "_blank"
                          ); // Membuka file dalam tab baru
                        }}
                        className="text-blue-500 hover:underline"
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
              {!editedUser.is_verified ? (
                <button
                  type="button"
                  onClick={() => handleVerifikasiToggle(editedUser.id)}
                  className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 flex items-center gap-2"
                >
                  <FiCheck className="w-5 h-5" />
                  Verifikasi
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleVerifikasiToggle(editedUser.id)}
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
