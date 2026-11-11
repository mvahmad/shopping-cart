"use client";
import Cookies from "js-cookie";
import type { authResponse, User } from "@/app/types";

/** User fields that are safe to keep in a cookie / localStorage. */
export type StoredUser = Pick<
  User,
  "_id" | "firstname" | "lastname" | "username" | "phoneNumber" | "address" | "role"
>;

const toStoredUser = (user: User): StoredUser => ({
  _id: user._id,
  firstname: user.firstname,
  lastname: user.lastname,
  username: user.username,
  phoneNumber: user.phoneNumber,
  address: user.address,
  role: user.role,
});

/**
 * Persist the tokens and a sanitized copy of the user after login / signup.
 * The API response also contains the password hash and refresh token on the
 * user object; those must never be written to a readable cookie or localStorage.
 */
export const saveSession = (res: authResponse): StoredUser => {
  const user = toStoredUser(res.data.user);
  Cookies.set("accessToken", res.token.accessToken);
  Cookies.set("refreshToken", res.token.refreshToken);
  Cookies.set("userInfo", JSON.stringify(user));
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

/** Read the stored user (cookie first, then localStorage). Browser only. */
export const getStoredUser = (): StoredUser | null => {
  const raw = Cookies.get("userInfo") ?? localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
};
