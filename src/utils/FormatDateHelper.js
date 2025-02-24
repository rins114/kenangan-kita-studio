export function formatTanggal(isoString) {
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

export function formatTanggalSorting(date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Makassar",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(date);
}
