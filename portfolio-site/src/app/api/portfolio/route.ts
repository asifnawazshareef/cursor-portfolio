import { NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/portfolio-store";

export const runtime = "nodejs";

export async function GET() {
  const data = await getPortfolioData();
  return NextResponse.json(data);
}
