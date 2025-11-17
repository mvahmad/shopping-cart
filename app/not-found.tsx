'use client'

import Link from "next/link";
import { Header, Footer } from "./cart/import";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">صفحه مورد نظر یافت نشد</h2>
          <p className="text-slate-500 mb-8">متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-base font-extrabold text-white shadow hover:bg-blue-700 transition-colors"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

