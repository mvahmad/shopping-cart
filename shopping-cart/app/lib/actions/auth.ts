import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { ENDPOINTS } from "../../constant";
import { httpRequest } from "../../services/http-request";
import Cookies from "js-cookie";

export const {auth ,handlers , signIn ,signOut} = NextAuth({
    providers:[GitHub]
})

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

export const logout = async ({href}:{href:string})=>{
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  localStorage.clear();
  location.href = href;
}