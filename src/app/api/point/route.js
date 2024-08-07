import { NextResponse } from "next/server";
import db from "@/libs/mongo";
import Point from "@/libs/schemas/Point";

export async function GET() {
  try {
    await db();
    const points = await Point.find();
    return NextResponse.json(points);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}

export async function POST(request) {
  try {
    await db();

    const data = await request.json();

    const p = new Point({
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
    let a = await Point.deleteOne({ _id: data._id });
    return NextResponse.json(true);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
