import axios from "axios";

const api = axios.create({
  baseURL: "https://gigconnect-server-ri5s.onrender.com/api", // backend base
  withCredentials: true, // optional (for cookies / auth)
});

export default api;
