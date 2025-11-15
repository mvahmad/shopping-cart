"use client";
import Cookies from "js-cookie";

export const logout = async ({href}:{href:string})=>{
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  localStorage.clear();
  location.href = href;
}