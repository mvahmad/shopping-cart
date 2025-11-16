"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "../app/constant";
import { postRefreshToken } from "@/app/services/auth";
import { logout } from "@/utils/logout";

export const httpClient = axios.create({
  baseURL: BASE_URL,
});

httpClient.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

httpClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.response?.status;
    const refreshToken = Cookies.get("refreshToken");
    const original = error.config;

    if (status === 401 && refreshToken) {
      try {
        const res = await postRefreshToken({ refreshToken });
        Cookies.set("accessToken", res.token.accessToken);
        return httpClient.request(original);
      } catch (err) {
        logout("/login");
      }
    }

    return Promise.reject(error);
  }
);
