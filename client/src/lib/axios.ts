import { useAuthStore } from "@/stores/use-auth-store";
import axios, { type AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // allow cookie send to server
});
// attach token to header
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// automatically call refresh token when token expired
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // những api không cần check
    if (
      originalRequest.url.includes("/auth/signin") ||
      originalRequest.url.includes("/auth/signup") ||
      originalRequest.url.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retryCount = originalRequest._retryCount || 0;

    if (error.response?.status === 403 && originalRequest._retryCount < 4) {
      originalRequest._retryCount += 1;

      try {
        const res = await api.post("/auth/refresh", { withCredentials: true });
        const newAccessToken = res.data.accessToken;

        useAuthStore.getState().setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearState();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const postData = async <T, D = unknown>(
  url: string,
  data?: D,
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
