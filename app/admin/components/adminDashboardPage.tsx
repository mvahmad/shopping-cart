"use server"
import AdminDashboard from "./adminDashboard";
// import { parseJwt } from "@/app/lib/actions/session";
import { cookies } from "next/headers";
// 
import { ReactNode } from "react";


export default async function AdminDashboardPage({ children }:{children:ReactNode}) {

  const cookieStore =await cookies();
  const userInfoCookie = cookieStore.get('userInfo');
   const userInfo = userInfoCookie ? JSON.parse(userInfoCookie.value) : null;
   let username =await userInfo?.firstname + " " + await userInfo?.lastname 
   let role = await userInfo?.role   
  return (
    <AdminDashboard role={role as string} username={username as string }>
      {children}
    </AdminDashboard>
  );
}