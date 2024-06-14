import { NextResponse } from "next/server";

export function GET(req, {params}) {
  return NextResponse.json(`Obteniendo usuarios id ${params.id}`);
}