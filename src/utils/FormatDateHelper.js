export default function formatTanggal(isoString) {
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = new Date(isoString);
  const hari = date.getUTCDate();
  const bulanNama = bulan[date.getUTCMonth()];
  const tahun = date.getUTCFullYear();

  return `${hari} ${bulanNama} ${tahun}`;
}
