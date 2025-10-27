"use server"
import { ReactNode } from 'react';
import AdminDashboardPage from './components/adminDashboardPage';
import { Suspense } from 'react';

export default async function AdminLayout({ children }:{children:ReactNode}) {
  return <AdminDashboardPage>
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
    </AdminDashboardPage>;
}