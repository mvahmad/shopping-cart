"use server"
import AdminDashboard from "./adminDashboard";
import { parseJwt } from "@/app/lib/actions/session";
import { cookies } from "next/headers";
import { JWTPayload } from "jose";
import { ReactNode } from "react";

export default async function AdminDashboardPage({ children }:{children:ReactNode}) {

  const cookie = (await cookies()).get('session')?.value
  const maybeAccessToken = await parseJwt(cookie as string);
  const accessToken: JWTPayload | undefined =
    maybeAccessToken && typeof maybeAccessToken === "object" && "id" in maybeAccessToken
      ? (maybeAccessToken as JWTPayload)
      : undefined;

  return (
    <AdminDashboard Id={accessToken?.id as string | undefined}>
      {children}
    </AdminDashboard>
  );
}