// app/api/admin/login/route.js
// POST /api/admin/login
export const runtime = "nodejs";

import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import { signToken, setAuthCookie } from "@/lib/auth";
import { ok, badRequest, serverError } from "@/lib/apiResponse";


// ─────────────────────────────────────────────────────────
// LOGIN HANDLER
// ─────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return new Response(
        JSON.stringify(badRequest("Email and password are required").body),
        { status: 400 }
      );
    }

    // Connect DB
    await connectDB();

    // Find admin (include password field explicitly)
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select("+password");

    if (!admin) {
      return new Response(
        JSON.stringify(badRequest("Invalid email or password").body),
        { status: 400 }
      );
    }

    // Verify password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return new Response(
        JSON.stringify(badRequest("Invalid email or password").body),
        { status: 400 }
      );
    }

    // Sign JWT
    const token = signToken({ id: admin._id.toString(), email: admin.email });

    // Create success response
    const response = ok({
      message: "Login successful",
      token,
      admin: { id: admin._id, email: admin.email },
    });

    // Set cookie and return
    return setAuthCookie(response, token);

  } catch (err) {
    console.error("[POST /api/admin/login]", err);

    return new Response(
      JSON.stringify(serverError("Login failed. Please try again.").body),
      { status: 500 }
    );
  }
}