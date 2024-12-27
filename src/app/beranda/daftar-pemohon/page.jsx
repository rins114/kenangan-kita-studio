"use client";
import React, { useState } from "react";

const TableComponent = () => {
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(""); // Status yang akan ditampilkan di modal
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const data = [
    { id: 1, name: "John Doe", service: "Clearing House", status: "Sedang Diproses" },
    { id: 2, name: "Jane Smith", service: "Verifikasi Berkas Usulan", status: "Terverifikasi" },
    { id: 3, name: "Alice Johnson", service: "Clearing House", status: "Ditolak" },
  ];

  const handleDetailClick = (item) => {
    setSelectedDetail(item.service);
    setSelectedStatus(item.status); // Menambahkan status yang dipilih
  };

  const closeModal = () => {
    setSelectedDetail(null);
    setSelectedStatus(""); // Reset status saat menutup modal
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Sedang Diproses":
        return "text-yellow-500";
      case "Terverifikasi":
        return "text-green-500";
      case "Ditolak":
        return "text-red-500";
      default:
        return "";
    }
  };

  // Fungsi untuk mencari data
  const filteredData = data.filter((item) => {
    return (
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.service.toLowerCase().includes(search.toLowerCase())) &&
      (filterStatus ? item.status === filterStatus : true)
    );
  });

  // Fungsi untuk mengurutkan data
  const sortedData = filteredData.sort((a, b) => {
    const aValue = a[sortKey].toLowerCase();
    const bValue = b[sortKey].toLowerCase();
    
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Detail yang berbeda berdasarkan layanan
  const getServiceDetails = (service) => {
    if (service === "Clearing House") {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between"><strong>Nama Pemohon:</strong></div>
          <div>John Doe</div>

          <div className="flex justify-between"><strong>Nama Organisasi Perangkat Daerah (OPD):</strong></div>
          <div>Dinas X</div>

          <div className="flex justify-between"><strong>Nama Paket Kegiatan:</strong></div>
          <div>Paket Y</div>

          <div className="flex justify-between"><strong>Nama Barang/Jasa:</strong></div>
          <div>Pengadaan Z</div>

          <div className="flex justify-between"><strong>Nama K/L/PD:</strong></div>
          <div>Kementerian A</div>

          <div className="flex justify-between"><strong>Nomor SIRUP:</strong></div>
          <div>12345</div>

          <div className="flex justify-between"><strong>Tahun Anggaran:</strong></div>
          <div>2024</div>

          <div className="flex justify-between"><strong>Pagu Anggaran:</strong></div>
          <div>Rp 10.000.000</div>

          <div className="flex justify-between"><strong>Nilai HPS:</strong></div>
          <div>Rp 9.000.000</div>

          <div className="flex justify-between"><strong>Lokasi Pelaksanaan:</strong></div>
          <div>Jakarta</div>

          <div className="flex justify-between"><strong>Metode Pemilihan:</strong></div>
          <div>Tender</div>

          <div className="flex justify-between"><strong>Surat Permohonan:</strong></div>
          <div>[Link/Detail]</div>

          <div className="flex justify-between"><strong>Catatan:</strong></div>
          <div>[Catatan spesifik]</div>
        </div>
      );
    } else if (service === "Verifikasi Berkas Usulan") {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between"><strong>Nama Pemohon:</strong></div>
          <div>Jane Smith</div>

          <div className="flex justify-between"><strong>Nama Organisasi Perangkat Daerah (OPD):</strong></div>
          <div>Dinas Y</div>

          <div className="flex justify-between"><strong>Nama Paket Kegiatan:</strong></div>
          <div>Paket A</div>

          <div className="flex justify-between"><strong>Surat Keputusan Penetapan PPK:</strong></div>
          <div>SK-123</div>

          <div className="flex justify-between"><strong>Spesifikasi Teknis dan Rancangan Detail:</strong></div>
          <div>[Dokumen]</div>

          <div className="flex justify-between"><strong>Kerangka Acuan Kerja (KAK):</strong></div>
          <div>[Dokumen]</div>

          <div className="flex justify-between"><strong>Dokumen Anggaran Belanja (DIPA/DPA atau RKA-KL/RKA-PD):</strong></div>
          <div>[Dokumen]</div>

          <div className="flex justify-between"><strong>Tahun Anggaran:</strong></div>
          <div>2024</div>

          <div className="flex justify-between"><strong>Pagu Anggaran:</strong></div>
          <div>Rp 15.000.000</div>

          <div className="flex justify-between"><strong>Nilai HPS:</strong></div>
          <div>Rp 14.500.000</div>

          <div className="flex justify-between"><strong>ID Paket dalam RUP:</strong></div>
          <div>7890</div>

          <div className="flex justify-between"><strong>Waktu Penggunaan Barang/Jasa:</strong></div>
          <div>2024</div>

          <div className="flex justify-between"><strong>Analisis Pasar:</strong></div>
          <div>[Dokumen]</div>

          <div className="flex justify-between"><strong>Probity Audit:</strong></div>
          <div>[Dokumen]</div>

          <div className="flex justify-between"><strong>Uraian Pekerjaan:</strong></div>
          <div>[Deskripsi]</div>

          <div className="flex justify-between"><strong>Catatan:</strong></div>
          <div>[Catatan spesifik]</div>
        </div>
      );
    }
    return <p>No details available.</p>;
  };

  // Menutup modal jika klik di luar modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4">Daftar Permohonan</h2>

      {/* Pencarian dan Filter Sejajar */}
      <div className="flex mb-4 gap-4">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-1/3"
          placeholder="Cari berdasarkan nama atau layanan"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-gray-300 p-2 rounded w-1/4"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Semua Status</option>
          <option value="Sedang Diproses">Sedang Diproses</option>
          <option value="Terverifikasi">Terverifikasi</option>
          <option value="Ditolak">Ditolak</option>
        </select>
      </div>

      {/* Tabel */}
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">
              <button onClick={() => handleSort("id")}>Nomor</button>
            </th>
            <th className="border border-gray-300 px-4 py-2">
              <button onClick={() => handleSort("name")}>Nama Pemohon</button>
            </th>
            <th className="border border-gray-300 px-4 py-2">
              <button onClick={() => handleSort("service")}>Layanan Permohonan</button>
            </th>
            <th className="border border-gray-300 px-4 py-2">
              <button onClick={() => handleSort("status")}>Status / Tracking</button>
            </th>
            <th className="border border-gray-300 px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={item.id} className="text-center odd:bg-white even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2 text-left">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-left">{item.service}</td>
              <td className={`border border-gray-300 px-4 py-2 text-center ${getStatusClass(item.status)}`}>
                {item.status}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleDetailClick(item)}
                >
                  Lihat Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedDetail && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleBackdropClick} // Menutup modal saat klik area luar
        >
          <div className="bg-white p-6 rounded shadow-lg w-2/3 max-w-4xl relative overflow-y-auto max-h-[80vh] border-t-4 border-b-4 border-gray-300">
            <button
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              onClick={closeModal}
            >
              Tutup
            </button>
            <h3 className="text-xl font-bold mb-4 text-center">{selectedDetail} Details</h3>
            {/* Status */}
            <p className={`text-center font-semibold ${getStatusClass(selectedStatus)}`}>
              Status: {selectedStatus}
            </p>
            {getServiceDetails(selectedDetail)}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
