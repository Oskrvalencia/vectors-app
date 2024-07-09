import { NextResponse } from "next/server";
import db from "@/libs/mongo";
import Circle from "@/libs/schemas/Circle";

export async function GET() {
  try {
    await db();
    const circles = await Circle.find();
    return NextResponse.json(circles);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}

export async function POST(request) {
  try {
    await db();

    const data = await request.json();

    const p = new Circle({
      latLng: [data.lat, data.lng],
      description: data.description,
      user: data.user,
    });

    await p.save();
    return NextResponse.json(true);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}

export async function DELETE(request) {
  try {
    await db();
    const data = await request.json();
    let a = await Circle.deleteOne({ _id: data._id });
    return NextResponse.json(true);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
