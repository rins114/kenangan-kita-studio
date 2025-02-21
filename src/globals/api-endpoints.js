import APP_CONFIG from "./app-config";

const { API_BASE_URL } = APP_CONFIG;
const API_ENDPOINT = {
  REGISTER: `${API_BASE_URL}register`,
  LOGIN: `${API_BASE_URL}login`,
  SESSION: `${API_BASE_URL}me`,
  LOGOUT: `${API_BASE_URL}logout`,
  POST_CLEARING_HOUSE: `${API_BASE_URL}clearing-house`,
  GET_CLEARING_HOUSE: `${API_BASE_URL}get/clearing-house`,
  VERIFY_CLEARING_HOUSE: (id) => `${API_BASE_URL}clearing-house/${id}}/verify`,
  REJECT_CLEARING_HOUSE: (id) => `${API_BASE_URL}clearing-house/${id}}/reject`,
  POST_CLEARING_HOUSE_OUTPUT: `${API_BASE_URL}clearing-house/hasil`,
  GET_CLEARING_HOUSE_OUTPUT: (id) => `${API_BASE_URL}clearing-processes/${id}`,
  GET_USERS: `${API_BASE_URL}get-user`,
  GET_USER_ROLES: `${API_BASE_URL}roles`,
  UPDATE_USER_PROFILE: `${API_BASE_URL}users/update/profile`,
  VERIFY_USER: (id) => `${API_BASE_URL}verifikasi/${id}/verify`,
  REJECT_USER: (id) => `${API_BASE_URL}verifikasi/${id}/reject`,
  POST_PERATURAN: `${API_BASE_URL}peraturan`,
  GET_PERATURAN: (params = {}) => {
    console.log(params);
    const { title, bentuk, nomor, tahun } = params;
    const query = new URLSearchParams();

    if (title) query.append("title", title);
    if (bentuk) query.append("bentuk_peraturan", bentuk);
    if (nomor) query.append("no_peraturan", nomor);
    if (tahun) query.append("tahun_peraturan", tahun);

    return `${API_BASE_URL}peraturan?${query.toString()}`;
  },
  DELETE_PERATURAN: (id) => `${API_BASE_URL}peraturan/${id}`,
  POST_GALERI: `${API_BASE_URL}galeri`,
  GET_GALERI: `${API_BASE_URL}galeri`,
  GET_PUBLISHED_GALERI: `${API_BASE_URL}galeritrue`,
  TOOGLE_GALERI_UPLOAD_STATUS: (id) =>
    `${API_BASE_URL}gallery/updatetrue/${id}`,
  DELETE_GALERI: (id) => `${API_BASE_URL}galeri/${id}`,
  POST_SLIDER: `${API_BASE_URL}slider`,
  GET_SLIDER: `${API_BASE_URL}slider`,
  GET_PUBLISHED_SLIDER: `${API_BASE_URL}slidertrue`,
  DELETE_SLIDER: (id) => `${API_BASE_URL}slider/${id}`,
  TOOGLE_SLIDER_UPLOAD_STATUS: (id) =>
    `${API_BASE_URL}sliders/updatetrue/${id}`,
  POST_LAPORAN_CH: `${API_BASE_URL}createlaporans`,
  GET_ALL_LAPORAN_CH: `${API_BASE_URL}laporans`,
  GET_LAPORAN_BY_CH_ID: (id) => `${API_BASE_URL}laporans/request/${id}`,
};

export default API_ENDPOINT;
