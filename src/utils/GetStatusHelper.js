export const getStatusString = (status) => {
  const statusMap = {
    0: "Diproses",
    1: "Terverifikasi",
    2: "Ditolak",
    3: "Dihapus",
    5: "Selesai",
  };

  return statusMap[status] || "Status Tidak Diketahui";
};
