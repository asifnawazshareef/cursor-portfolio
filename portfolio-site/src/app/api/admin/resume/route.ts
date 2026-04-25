import { hasAdminSession } from "@/lib/admin-auth";
import { getPortfolioData, updatePortfolioData } from "@/lib/portfolio-store";
import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("resume");

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Resume file is required." }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ message: "Only PDF files are allowed." }, { status: 400 });
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const fileName = `resume-${Date.now()}.pdf`;
  const targetPath = path.join(uploadsDir, fileName);
  const bytes = await file.arrayBuffer();
  await fs.writeFile(targetPath, Buffer.from(bytes));

  const portfolio = await getPortfolioData();
  const updated = await updatePortfolioData({
    ...portfolio,
    resumeUrl: `/uploads/${fileName}`,
  });

  return NextResponse.json({
    message: "Resume uploaded successfully.",
    resumeUrl: updated.resumeUrl,
  });
}
