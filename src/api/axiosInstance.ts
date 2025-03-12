import axios from "axios";

const API_TOKEN = process.env.NEXT_PUBLIC_GOREST_API_TOKEN;

const axiosInstance = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export default axiosInstance;
