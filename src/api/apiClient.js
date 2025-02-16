import axios from "axios";

// 建立 Axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE, // 環境變數 API
  timeout: 10000, // 超時時間
  headers: {
    "Content-Type": "application/json",
  },
});

// 請求攔截器 - 自動附加 Token
apiClient.interceptors.request.use(
  (config) => {
    const token =
      document.cookie.replace(
        /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      ) || null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 回應攔截器 - 統一錯誤處理
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API 錯誤:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
