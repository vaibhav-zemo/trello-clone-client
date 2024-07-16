import axios from "axios";
const BASE_URL = import.meta.env.VITE_SERVER_URL;
const token = localStorage.getItem("token");

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        'Authorization': `bearer ${token}`
    },
});