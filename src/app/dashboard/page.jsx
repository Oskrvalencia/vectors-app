"use client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useRouter } from "next/router";
import { useEffect } from "react";

async function DashboardPage() {
  /* const session = await getServerSession(authOptions);

  const router = useRouter(); */

 /*  useEffect(() => {
    if (!session?.user) {
      router.push("/");
    }
  }, [session, router]); */
  return (
    <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <div>
        <h1 className="text-white text-5xl">App</h1>
      </div>
    </section>
  );
}
export default DashboardPage;
