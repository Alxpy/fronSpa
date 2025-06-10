import { URL_BACK } from '@/config';
import axios from 'axios';
import { toast } from 'sonner';

const instance = axios.create({
  baseURL: URL_BACK + "/api",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

instance.interceptors.response.use((res) => {
  if (res.data && res.data?.message && res.data?.status >= 400) {
    toast.error(res.data.message);
  }
  return res;
})


export default instance;