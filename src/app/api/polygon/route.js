import { NextResponse } from "next/server";
import db from "@/libs/mongo";
import Polygon from "@/libs/schemas/Polygon";

export async function GET() {
  try {
    await db();
    const polygons = await Polygon.find();
    return NextResponse.json(polygons);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}

export async function POST(request) {
  try {
    await db();

    const data = await request.json();

    const p = new Polygon({
      coordinates: data.coordinates,
      name: data.name,
      user: data.user,
    });

    await p.save();
    return NextResponse.json(true);
  } catch (error) {
    return NextResponse.json(error.message);
  }
}
