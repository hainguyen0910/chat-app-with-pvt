import axiosClient from "./axiosClient";

const roomApi = {
  create: (data) => {
    const url = "/rooms/create";
    return axiosClient.post(url, data);
  },
  getAllRoom: () => {
    const url = "/rooms/get";
    return axiosClient.get(url);
  },
  join: (data) => {
    const url = "/rooms/join";
    return axiosClient.post(url, data);
  },
};

export default roomApi;
