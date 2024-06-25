import axios from "axios";
const token = localStorage.getItem("token");
export const Api = axios.create({
  baseURL: "https://fariasx.online",
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
