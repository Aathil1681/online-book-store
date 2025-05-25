import axios, { AxiosError, CreateAxiosDefaults, ResponseType } from "axios";

const toastServices = {
  error: (_message: string) => {
    //here we can use toats
  },
};

// type ApiMethods = "post" | "get" | "patch" | "delete";

const CreateApiClient = ({
  baseURL,
  // method,
  responseType = "json", //this is how we declare default values
  options,
  headers,
  getToken,
  logout,
}: {
  baseURL: string;
  // method: ApiMethods;
  responseType?: ResponseType;
  getToken: () => string | undefined | null;
  logout: () => void;
  options?: Omit<CreateAxiosDefaults, "baseURL" | "method" | "responseType">;
  headers?: CreateAxiosDefaults["headers"];
}) => {
  const apiClient = axios.create({
    baseURL,
    // method,
    responseType,
    headers: headers ?? {
      "Content-Type": "application/json",
    },
    ...options,
  });

  apiClient.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      const status = error.response?.status;
      if (status === 401) {
        //logout user
        logout();
        //display error msg
        toastServices.error("ypu have no access");
      }
      Promise.reject(error);
    },
  );
  return apiClient;
};

export default CreateApiClient;
