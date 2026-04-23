// app/api/admin/seed/route.js
// POST /api/admin/seed  ← ONE-TIME USE — disable after first admin is created
//
// Body: { email, password, seedSecret }
// Requires SEED_SECRET env var as an extra guard.
export const runtime = "nodejs";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { ok, badRequest, serverError } from "@/lib/apiResponse";

export async function POST(request) {
  try {
    // ── Guard: only allow in development OR with a secret ────────────────
    const { email, password, seedSecret } = await request.json();

    if (seedSecret !== process.env.SEED_SECRET) {
      return badRequest("Invalid seed secret");
    }

    if (!email || !password) {
      return badRequest("Email and password are required");
    }

    await connectDB();

    // ── Prevent duplicate admins ─────────────────────────────────────────
    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) {
      return badRequest("An admin with this email already exists");
    }

    const admin = await Admin.create({ email, password });

    return ok({
      message: "Admin created successfully",
      admin: { id: admin._id, email: admin.email },
    });
  } catch (err) {
    console.error("[POST /api/admin/seed]", err);
    return serverError("Failed to create admin");
  }
}
