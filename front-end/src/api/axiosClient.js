import axios from "axios";
import queryString from "query-string";

const baseURL = "http://192.168.1.16:8080/api";
const axiosClient = axios.create({
  baseURL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = JSON.parse(localStorage.getItem("auth"))?.token;
  if (token) config.headers.Authorization = `bearer ${token}`;
  return config;
});

export default axiosClient;
