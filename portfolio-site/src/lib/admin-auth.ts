import { cookies } from "next/headers";

const ADMIN_COOKIE = "portfolio_admin_session";

function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL ?? "asifnawazsharif3@gmail.com",
    password: process.env.ADMIN_PASSWORD ?? "asif4004",
  };
}

export function validateAdminLogin(email: string, password: string) {
  const admin = getAdminCredentials();
  return email === admin.email && password === admin.password;
}

export async function hasAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  return token === "authenticated";
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, "authenticated", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
}
