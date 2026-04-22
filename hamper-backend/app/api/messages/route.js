// app/api/messages/route.js
// POST /api/messages  → store contact form message (PUBLIC — no auth)
// GET  /api/messages  → list all messages          (ADMIN — protected by middleware.js)

import { connectDB } from "@/lib/db";
import Message from "@/models/Message";
import { ok, created, badRequest, serverError } from "@/lib/apiResponse";
import { NextResponse } from "next/server";

// ── POST: Accept contact form submission ───────────────────────────────────
// This route is PUBLIC. We exempt it from the middleware guard by checking
// the method — middleware.js only protects GET on /api/messages.
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, emailOrPhone, message } = body;

    if (!name || !emailOrPhone || !message) {
      return badRequest("name, emailOrPhone, and message are required");
    }

    const doc = await Message.create({ name, emailOrPhone, message });

    return created({
      message: "Message received. We will contact you soon!",
      id: doc._id,
    });
  } catch (err) {
    console.error("[POST /api/messages]", err);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return badRequest(messages.join(", "));
    }
    return serverError();
  }
}

// ── GET: List all messages (admin) ─────────────────────────────────────────
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const unreadOnly = searchParams.get("unread") === "true";

    const filter = unreadOnly ? { read: false } : {};

    const total = await Message.countDocuments(filter);
    const messages = await Message.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return ok({
      messages,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("[GET /api/messages]", err);
    return serverError();
  }
}
