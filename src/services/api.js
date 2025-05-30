import axios from "axios";
const token = localStorage.getItem("token");
export const Api = axios.create({
  baseURL: "https://api.jornaldabahia.ba",
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
