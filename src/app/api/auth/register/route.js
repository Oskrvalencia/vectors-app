import { NextResponse } from "next/server";
import Users from "@/libs/schemas/Users";
import bcrypt from "bcrypt";
import db from "@/libs/mongo";

export async function POST(request) {
  try {
    await db();
    const data = await request.json();
    console.log('data', data)

    const userFound = await Users.findOne({ email: data.email });

    if (userFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const usernameFound = await Users.findOne({ username: data.username });

    if (usernameFound) {
      return NextResponse.json(
        {
          message: "username already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const us = new Users({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });

    await us.save();

    return NextResponse.json(true);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
