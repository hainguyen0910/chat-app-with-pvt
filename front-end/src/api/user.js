import axiosClient from "./axiosClient";

const userApi = {
  updateProfile: (data) => {
    const url = "/users/update-profile";
    return axiosClient.post(url, data);
  },
  changePassword: (data) => {
    const url = "/users/change-password";
    return axiosClient.post(url, data);
  },
};

export default userApi;
