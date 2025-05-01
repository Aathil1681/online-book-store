import CreateApiClient from "./helpers/baseApi";

const jsonClinet = CreateApiClient({
  baseURL: "",
  method: "delete",
  responseType: "json",
  header: {},
  getToken: () => null,
  logout: () => {},
});
