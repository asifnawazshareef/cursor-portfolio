import { NextResponse } from "next/server";
import { setAdminSession, validateAdminLogin } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };
  const email = body.email?.trim() ?? "";
  const password = body.password ?? "";

  if (!validateAdminLogin(email, password)) {
    return NextResponse.json({ message: "Invalid admin credentials." }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ message: "Authenticated successfully." });
}
