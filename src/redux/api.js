const API_BASE = 'https://doc-reserve.onrender.com';
const LOGIN_ENDPOINT = `${API_BASE}/auth/sign_in`;
const REGISTRATION_ENDPOINT = `${API_BASE}/auth`;
const CURRENT_USER_ENDPOINT = `${API_BASE}/api/v1/current_user`;
const LOGOUT_ENDPOINT = `${API_BASE}/auth/sign_out`;
const DOCTORS_ENDPOINT = `${API_BASE}/api/v1/doctors`;
const RESERVATIONS_ENDPOINT = `${API_BASE}/api/v1/reservations`;

export default {
  API_BASE,
  LOGIN_ENDPOINT,
  REGISTRATION_ENDPOINT,
  LOGOUT_ENDPOINT,
  CURRENT_USER_ENDPOINT,
  DOCTORS_ENDPOINT,
  RESERVATIONS_ENDPOINT,
};
