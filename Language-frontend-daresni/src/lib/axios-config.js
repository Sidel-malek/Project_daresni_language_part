import { auth } from "@/auth";
import axios from "axios";

export const API_URL = "http://localhost:5000";

const axiosConfig = {
  baseURL: `${API_URL}`,
  timeout: 30000,
};

const _axios = axios.create(axiosConfig);

_axios.interceptors.request.use(
  async function (config) {
    let session = await auth();
    if (session.accessToken) {
      return {
        ...config,
        headers: { Authorization: `${session.accessToken}` },
      };
    } else return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default _axios;
