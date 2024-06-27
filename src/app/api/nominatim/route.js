import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json("Hello world");
}

export async function POST(request) {
  const req = await request.json();
  const { lat, lng } = req;
  try {
    const results = await new Promise((resolve, reject) => {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          resolve(data.display_name);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
