import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { ENDPOINTS } from "./app/constant";
import { httpRequest } from "./app/services/http-request";

export const {auth ,handlers , signIn ,signOut} = NextAuth({
    providers:[GitHub]
})

export const postRegisterData = async (data: unknown) => {
  const url = ENDPOINTS.AUTH.SIGNUP;
  const response = await httpRequest.post(url, data);
  return response.data;
};