import axios from "axios";
const BASE_URL = "https://todo-backend-poje.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
