import axios, { AxiosError, AxiosResponse } from "axios";
import {
  User,
  UserLoginValues,
  UserRegisterValues,
} from "../models/identity/user";
import { ShortUrl, ShortUrlDto } from "../models/entities/shortUrl";
import store from "../redux/stores";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.common.token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: NonNullable<unknown>) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: NonNullable<unknown>) =>
    axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const ShortUrls = {
  list: () => requests.get<ShortUrl[]>("/shorturl"),
  create: (anime: ShortUrlDto) => requests.post<void>("/shorturl", anime),
  details: (id: string) => requests.get<ShortUrl>(`/shorturl/${id}`),
  delete: (id: string) => requests.del<void>(`/shorturl/${id}`),
};

const Account = {
  current: () => requests.get<User>("/user"),
  login: (userLoginValues: UserLoginValues) =>
    requests.post<User>("/user/login", userLoginValues),
  register: (userRegisterValues: UserRegisterValues) =>
    requests.post<User>("/user/register", userRegisterValues),
};

const agent = {
  ShortUrls,
  Account,
};

export default agent;
