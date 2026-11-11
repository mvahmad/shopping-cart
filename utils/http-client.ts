"use client";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { BASE_URL, ENDPOINTS } from "../app/constant";
import { logout } from "@/utils/logout";

export const httpClient = axios.create({
  baseURL: BASE_URL,
});

httpClient.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

// A single in-flight refresh shared by all requests that fail with 401 at the
// same time, so we don't fire one refresh call per failed request.
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = (refreshToken: string) => {
  if (!refreshPromise) {
    // Use a bare axios call so the refresh request itself never goes through
    // this interceptor (a 401 here would otherwise recurse forever).
    refreshPromise = axios
      .post(`${BASE_URL}/${ENDPOINTS.AUTH.TOKEN.replace(/^\//, "")}`, { refreshToken })
      .then((res) => {
        const token = res.data?.token;
        if (!token?.accessToken) throw new Error("No access token in refresh response");
        Cookies.set("accessToken", token.accessToken);
        if (token.refreshToken) Cookies.set("refreshToken", token.refreshToken);
        return token.accessToken as string;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

httpClient.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const status = error?.response?.status;
    const refreshToken = Cookies.get("refreshToken");
    const original = error.config as RetriableConfig | undefined;

    // Retry each request at most once after refreshing the token.
    if (status === 401 && refreshToken && original && !original._retry) {
      original._retry = true;
      try {
        const accessToken = await refreshAccessToken(refreshToken);
        original.headers.Authorization = `Bearer ${accessToken}`;
        return httpClient.request(original);
      } catch {
        logout("/login");
      }
    }

    return Promise.reject(error);
  }
);
