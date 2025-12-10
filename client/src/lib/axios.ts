import axios, { type AxiosRequestConfig } from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL
    : "/api";
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // allow cookie send to server
});

const postData = async <T, D = unknown>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.post<T>(url, data, config);
  return response.data;
};

const fetchData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.get<T>(url, config);
  return response.data;
};

const updateData = async <T, D>(
  url: string,
  data: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.put<T>(url, data, config);
  return response.data;
};

const deleteData = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.delete<T>(url, config);
  return response.data;
};

export { deleteData, fetchData, postData, updateData };
export default api;
