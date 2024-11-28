import axios, { AxiosResponse } from "axios";
import {
  User,
  UserLoginValues,
  UserRegisterValues,
} from "../models/identity/user";
import { ShortUrl } from "../models/entities/shortUrl";
import store from "../redux/stores";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(
  (config) => {
    const state = store.getState(); // Access the Redux state
    const token = state.common.token; // Get the token from the common slice

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
  create: (anime: ShortUrl) => requests.post<void>("/shorturl", anime),
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
