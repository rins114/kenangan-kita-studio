import APP_CONFIG from "./app-config";

const { API_BASE_URL } = APP_CONFIG;
const API_ENDPOINT = {
  REGISTER: `${API_BASE_URL}register`,
  LOGIN: `${API_BASE_URL}login`,
  SESSION: `${API_BASE_URL}me`,
  LOGOUT: `${API_BASE_URL}logout`,
  POST_CLEARING_HOUSE: `${API_BASE_URL}clearing-house`,
  GET_USER_ROLES: `${API_BASE_URL}roles`,
};

export default API_ENDPOINT;
