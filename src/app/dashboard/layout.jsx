import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./../globals.css";
import React from "react";
import { MapProvider } from "@/context/MapContext";

const inter = Inter({ subsets: ["latin"] });

const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});

export const metadata = {
  title: "Vectors Map",
  description: "Platform to graph vectors on maps",
};

export default function RootLayout({ children }) {
  return (
    <React.Fragment>
      <div className={inter.className}>
        <Navbar />
        <MapProvider>{children}</MapProvider>
      </div>
    </React.Fragment>
  );
}
