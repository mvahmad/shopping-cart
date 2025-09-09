"use server"
import { ReactNode } from 'react';
import AdminDashboardPage from './components/adminDashboardPage';

export default async function AdminLayout({ children }:{children:ReactNode}) {
  return <AdminDashboardPage>{children}</AdminDashboardPage>;
}