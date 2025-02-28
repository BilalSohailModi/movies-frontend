import axios from "axios";
// @ts-ignore: Unreachable code error
import { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 120000, // Timeout after 120 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = (): string | null => {
  return localStorage.getItem("token");
};

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`, // Attach token to the Authorization header
      };
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Optional: Add response interceptor to handle JWT expiry (refresh token if necessary)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      if (!window.location.pathname.includes('/auth/login') && !window.location.pathname.includes('/auth/signUp')) {
        window.location.href = '/auth/login'
      }
      console.error("Unauthorized - Token may be expired");
      // Optionally: Redirect to login page or refresh token logic here
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
