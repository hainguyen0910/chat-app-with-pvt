import axiosClient from "./axiosClient";

const authApi = {
  login: (data) => {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  },
  logout: () => {
    const url = "/auth/logout";
    return axiosClient.post(url);
  },
  register: (data) => {
    const url = "/auth/register";
    return axiosClient.post(url, data);
  },
  confirmForgotPassword: (data) => {
    const url = "/auth/confirm-forgot-password";
    return axiosClient.post(url, data);
  },
};

export default authApi;
