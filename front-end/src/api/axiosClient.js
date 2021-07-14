import axios from "axios";
import queryString from "query-string";

const baseURL = "http://localhost:8080/api";
const axiosClient = axios.create({
  baseURL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosClient;