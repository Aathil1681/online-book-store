import axios, { AxiosError, CreateAxiosDefaults, ResponseType } from "axios";

const createApiClient = ({
  baseURL,
  responseType,
  headers,
  getToken,
  logout,
  options,
}: {
  baseURL: string;
  responseType?: ResponseType;
  headers?: CreateAxiosDefaults["headers"];
  getToken: () => string | null;
  logout: () => void;
  options?: Omit<
    CreateAxiosDefaults,
    "baseURL" | "responseType" | "headers"
  >;
}) => {
  const apiClient = axios.create({
    baseURL: baseURL,
    headers: headers ?? { "Content-Type": "application/json" },
    responseType: responseType,
    ...options,
  });

  apiClient.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const status = error.response?.status;

      if (status === 401) {
        logout();
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default createApiClient;
