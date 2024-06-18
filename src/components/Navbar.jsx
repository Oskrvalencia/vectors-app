"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {
  /* const session = await getServerSession(authOptions);
  console.log(session); */

  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-3">
      <h1 className="text-xl font-bold">NextAuth</h1>

      <ul className="flex gap-x-24">
        {/*  {!session?.user ? ( */}
        <>
          <li>
            <Link href="/dashboard">Home</Link>
          </li>
          <li>
            <Link href="/dashboard/maps">Mapa</Link>
          </li>
          <li>
            <Link href="/dashboard/users">Usuario</Link>
          </li>
         
        </>
        {/*   ) : (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/api/auth/signout">Logout</Link>
            </li>
          </>
        )} */}
      </ul>
    </nav>
  );
}

export default Navbar;
