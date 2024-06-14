import { NextResponse } from "next/server";
import Users from "@/libs/schemas/Users";
import connectDB from "@/libs/mongo";

export async function GET() {
  await connectDB();
  const users = await Users.find({});
  return NextResponse.json(users);
}

export function POST() {
  return NextResponse.json("Insertando usuarios");
}
