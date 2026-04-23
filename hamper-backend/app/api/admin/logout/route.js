// app/api/admin/logout/route.js
// POST /api/admin/logout
export const runtime = "nodejs";
import { clearAuthCookie } from "@/lib/auth";
import { ok } from "@/lib/apiResponse";

export async function POST() {
  const response = ok({ message: "Logged out successfully" });
  return clearAuthCookie(response);
}
