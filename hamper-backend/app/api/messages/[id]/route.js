// app/api/messages/[id]/route.js
// PATCH  /api/messages/:id  → mark as read   (admin)
// DELETE /api/messages/:id  → delete message  (admin)
export const runtime = "nodejs";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";
import { ok, notFound, serverError } from "@/lib/apiResponse";

export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const msg = await Message.findByIdAndUpdate(
      params.id,
      { read: true },
      { new: true }
    );

    if (!msg) return notFound("Message not found");
    return ok({ message: msg });
  } catch (err) {
    console.error("[PATCH /api/messages/:id]", err);
    return serverError();
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const msg = await Message.findByIdAndDelete(params.id);
    if (!msg) return notFound("Message not found");

    return ok({ message: "Message deleted" });
  } catch (err) {
    console.error("[DELETE /api/messages/:id]", err);
    return serverError();
  }
}
