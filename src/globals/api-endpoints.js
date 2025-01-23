import APP_CONFIG from "./app-config";

const { API_BASE_URL } = APP_CONFIG;
const API_ENDPOINT = {
  LOGIN: `${API_BASE_URL}login`,
  SESSION: `${API_BASE_URL}me`,
  LOGOUT: `${API_BASE_URL}logout`,
};

export default API_ENDPOINT;
