// const API_BASE = 'https://doc-reserve.onrender.com';
const API_BASE = 'http://localhost:3000';
const LOGIN_ENDPOINT = `${API_BASE}/auth/sign_in`;
const REGISTRATION_ENDPOINT = `${API_BASE}/auth`;
const CURRENT_USER_ENDPOINT = `${API_BASE}/api/v1/current_user`;
const LOGOUT_ENDPOINT = `${API_BASE}/auth/sign_out`;

export default {
  API_BASE,
  LOGIN_ENDPOINT,
  REGISTRATION_ENDPOINT,
  LOGOUT_ENDPOINT,
  CURRENT_USER_ENDPOINT,
};
