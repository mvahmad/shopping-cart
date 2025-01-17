import type { Metadata } from "next";
// 
import "./globals.css";
import { Roboto } from 'next/font/google'
import {Providers} from "./providers";
const roboto = Roboto({ weight: '400',subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Shoping Cart",
  description: "Power by Ahmad Movahedei",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={roboto.className}
      >
         <Providers>
          {children}
        </Providers>
        
      </body>
    </html>
  );
}
