"use client";
import "./../app/globals.css";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-3">
      <h1 className="text-xl font-bold">Vectors Map</h1>

      <ul className="flex gap-x-24">
        <>
          <li>
            <Link href="/dashboard">Map</Link>
          </li>
          <li>
            <Link href="/dashboard/users">User</Link>
          </li>
          <li>
            <Link href="/">
            <span onClick={() => signOut()}>Exit</span>
            </Link>
          </li>
        </>
      </ul>
    </nav>
  );
}
