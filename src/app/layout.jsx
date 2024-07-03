"use client";

import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, pageProps }) {
  /* export const metadata = {
    title: "Vectors Map",
    description: "Platform to graph vectors on maps",
  };
 */ return (
    <html lang="en">
      <SessionProvider session={pageProps?.session}>
        <body className={inter.className}>{children}</body>
      </SessionProvider>
    </html>
  );
}
