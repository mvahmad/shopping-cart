"use server"
import AdminDashboard from "./adminDashboard";
import { decrypt } from "@/app/lib/actions/session";
import { cookies } from "next/headers";
import { JWTPayload } from "jose";
import { ReactNode } from "react";

export default async function AdminDashboardPage({ children }:{children:ReactNode}) {

  const cookie = (await cookies()).get('session')?.value
  const maybeSession = await decrypt(cookie);
  const session: JWTPayload | undefined =
    maybeSession && typeof maybeSession === "object" && "userId" in maybeSession
      ? (maybeSession as JWTPayload)
      : undefined;

  return (
    <AdminDashboard userId={session?.userId as string | undefined}>
      {children}
    </AdminDashboard>
  );
}