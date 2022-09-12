import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import camelCaseKeys from "camelcase-keys";
import snakeCaseKeys from "snakecase-keys";
import { normalizedLanguage } from "lib/currentLanguage";
import { currentUserFromStorage } from "lib/currentUser";
import { RIBON_API } from "utils/constants";

export const baseURL = RIBON_API;
export const API_SCOPE = "/api/v1";

const api = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: (status) => status >= 200 && status < 300,
});

api.interceptors.request.use((request) =>
  request?.data
    ? { ...request, data: snakeCaseKeys(request?.data, { deep: true }) }
    : request,
);

api.interceptors.response.use(
  (response) => ({
    ...response,
    data: camelCaseKeys(response.data, { deep: true }),
  }),
  (error) => Promise.reject(error),
);

api.interceptors.request.use((config) => {
  const lang = normalizedLanguage();
  const user = currentUserFromStorage();
  const authHeaders = { Language: lang, Email: user?.email || "" };
  // eslint-disable-next-line no-param-reassign
  config.headers = { ...authHeaders, ...config.headers };

  return config;
});

export function apiGet(url: string, config?: AxiosRequestConfig) {
  if (config) return api.get(`${API_SCOPE}/${url}`, config);

  return api.get(`${API_SCOPE}/${url}`);
}

export function apiPost(url: string, data: any, config?: AxiosRequestConfig) {
  if (config) return api.post(`${API_SCOPE}/${url}`, data, config);

  return api.post(`${API_SCOPE}/${url}`, data);
}

export function apiPut(url: string, data: any, config?: AxiosRequestConfig) {
  if (config) return api.put(`${API_SCOPE}/${url}`, data, config);

  return api.put(`${API_SCOPE}/${url}`, data);
}

export function apiDelete(url: string, config?: AxiosRequestConfig) {
  if (config) return api.delete(`${API_SCOPE}/${url}`, config);

  return api.delete(`${API_SCOPE}/${url}`);
}

export function emptyRequest(): Promise<AxiosResponse<any, any>> {
  return {} as Promise<AxiosResponse>;
}

export default api;
