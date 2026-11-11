"use client"
import { ENDPOINTS } from "../constant";
import {httpClient as httpRequest } from "@/utils/http-client";

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
