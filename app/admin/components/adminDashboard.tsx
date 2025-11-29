"use client"
import type { ReactNode } from "react"
// import { Button} from "@nextui-org/react";
import AdminNav from "../components/adminNav";


export default function AdminDashboard (
  {children , username , role}:
  {children:ReactNode,username?: string , role?:string})
  {
  
  return ( 
  <div dir="rtl"
    className="min-h-screen bg-slate-100 text-slate-800 flex flex-col lg:flex-row">
      {username  && <AdminNav 
      role={role}
      info={username}
      />}
   
    <main className="flex-1 px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-4">
        {children}
    </main>
   
  </div> );
}