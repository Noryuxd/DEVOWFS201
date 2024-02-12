import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

// define your api calls in seperate files on this folder