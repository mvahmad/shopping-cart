"use client";
import Cookies from "js-cookie";

export const logout =  (href:string)=>{
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("userInfo");
  localStorage.clear();
  location.href = href;
}
