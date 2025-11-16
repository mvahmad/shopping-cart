"use client"
import { ENDPOINTS } from "../constant";
import {httpClient as httpRequest } from "@/utils/http-client";

type Token = { refreshToken: string };

export const postRegisterData = async (data: unknown) => {
  const url = ENDPOINTS.AUTH.SIGNUP;
  const response = await httpRequest.post(url, data);
  return response.data;
};

export const postLoginData = async (data: unknown) => {
  const url = ENDPOINTS.AUTH.LOGIN;
  const response = await httpRequest.post(url, data);
  return response.data;
};

export const postRefreshToken = async (token: Token) => {
  const url = ENDPOINTS.AUTH.TOKEN;
  const response = await httpRequest.post(url, token);
  return response.data;
};
