import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL/api, // backend base
  withCredentials: true, // optional (for cookies / auth)
});

export default api;
