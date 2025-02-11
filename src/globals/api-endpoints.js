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
  GET_USERS: `${API_BASE_URL}get-user`,
  GET_USER_ROLES: `${API_BASE_URL}roles`,
  VERIFY_USER: (id) => `${API_BASE_URL}verifikasi/${id}/verify`,
  REJECT_USER: (id) => `${API_BASE_URL}verifikasi/${id}/reject`,
};

export default API_ENDPOINT;
