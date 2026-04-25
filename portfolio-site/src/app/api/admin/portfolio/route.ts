import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { getPortfolioData, updatePortfolioData } from "@/lib/portfolio-store";
import { PortfolioData } from "@/types/portfolio";

export const runtime = "nodejs";

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await getPortfolioData();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as PortfolioData;
  const updated = await updatePortfolioData(payload);
  return NextResponse.json(updated);
}
