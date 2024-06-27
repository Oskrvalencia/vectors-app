"use client";
import "./../app/globals.css";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Map",
    href: "/dashboard",
    icond:
      "M8.161 2.58a1.875 1.875 0 0 1 1.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0 1 21.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 0 1-1.676 0l-4.994-2.497a.375.375 0 0 0-.336 0l-3.868 1.935A1.875 1.875 0 0 1 2.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437ZM9 6a.75.75 0 0 1 .75.75V15a.75.75 0 0 1-1.5 0V6.75A.75.75 0 0 1 9 6Zm6.75 3a.75.75 0 0 0-1.5 0v8.25a.75.75 0 0 0 1.5 0V9Z",
  },
  {
    name: "User",
    href: "/dashboard/users",
    icond:
      "M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z",
  },
  {
    name: "Exit",
    href: "/",
    icond:
      "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-3">
      <h1 className="text-xl font-bold">Vectors Map</h1>
      <>
        {links.map((link) => {
          return (
            <Link
              href={link.href}
              key={link.href}
              className="flex justify-around"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={`${pathname === link.href ? "#ffff8f" : "currentColor"}`}
                className="size-6"
              >
                <path fillRule="evenodd" d={link.icond} clipRule="evenodd" />
              </svg>
              <span
                className={`${
                  pathname === link.href ? "text-yellow-200" : "currentColor"
                }`}
              >
                {link.name === "Exit" ? "" : link.name}
              </span>
              {link.name === "Exit" ? (
                <span onClick={() => signOut()}>{link.name}</span>
              ) : null}
            </Link>
          );
        })}
      </>
    </nav>
  );
}
