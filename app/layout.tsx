import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import { Roboto } from 'next/font/google'
import { Providers } from "./providers";
const iranSans = localFont({ src: '../public/fonts/IRANSansXFaNum-Regular.ttf' });

export const metadata: Metadata = {
  title: "Shoping Cart",
  description: "Power by Ahmad Movahedei & Ali Attari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body
        className={iranSans.className}
      >
        <Providers>
          {children}
        </Providers>

      </body>
    </html>
  );
}
