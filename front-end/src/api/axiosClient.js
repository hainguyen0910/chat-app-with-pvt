import { history } from "App";
import axios from "axios";
import queryString from "query-string";
import swal from "sweetalert";

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

axiosClient.interceptors.response.use(
  (response) => response,
  (error) =>
    new Promise((resolve) => {
      if (error.response && error.response.status === 401) {
        swal("Login session has expired", "", "warning").then(() => {
          localStorage.setItem("auth", JSON.stringify(""));
          history.push("/login");
        });
      }

      return Promise.reject(error);
    })
);

export default axiosClient;
