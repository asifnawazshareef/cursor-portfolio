import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { getPortfolioData, updatePortfolioData } from "@/lib/portfolio-store";
import { PortfolioData } from "@/types/portfolio";

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(getPortfolioData());
}

export async function PUT(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as PortfolioData;
  const updated = updatePortfolioData(payload);
  return NextResponse.json(updated);
}
