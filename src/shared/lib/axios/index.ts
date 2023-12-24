import axios from 'axios';
import Cookies from 'js-cookie';
import { sessionModel } from '@/entities/session';

const baseUrlFromEnv = import.meta.env.VITE_ORACULUS_API_BASE_URL;
/*const BASE_URL = baseUrlFromEnv
  ? baseUrlFromEnv
  : 'http://d5delf-apc001lk:8080/api/v1';
*/
export const axiosInstanse = axios.create({
  baseURL: baseUrlFromEnv,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthorizationHeader = (token: string) => {
  axiosInstanse.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const token = Cookies.get('AuthToken');
if (token) {
  setAuthorizationHeader(token);
}
else {
  sessionModel.logout();
}
