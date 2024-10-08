import axios from "axios";

const API = axios;

axios.interceptors.response.use((res) => res.data, (error) => {
  return Promise.reject(error.response?.data.message ?? error.message);
});

export default API;