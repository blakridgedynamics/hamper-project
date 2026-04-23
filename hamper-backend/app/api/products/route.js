// app/api/products/route.js

export const runtime = "nodejs";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { uploadImage } from "@/lib/cloudinary";
import { ok, created, badRequest, serverError } from "@/lib/apiResponse";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const filter = {};
    if (category) filter.category = category;
    if (featured === "true") filter.featured = true;

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return ok({ products, pagination: { total, page, limit, pages: Math.ceil(total / limit) } });
  } catch (err) {
    console.error("[GET /api/products]", err);
    return serverError();
  }
}

export async function POST(request) {
  try {
    console.log("=== CONTENT TYPE ===", request.headers.get("content-type"));
    await connectDB();

    // ── Always parse as FormData ──────────────────────
    const formData = await request.formData();
    const name        = formData.get("name");
    const description = formData.get("description");
    const price       = formData.get("price");
    const category    = formData.get("category");
    const featured    = formData.get("featured") === "true";
    const imageFiles  = formData.getAll("images").filter(
      (f) => f && typeof f !== "string" && f.size > 0
    );

    if (!name || !price || !category) {
      return badRequest("name, price, and category are required");
    }

    const uploadedImages = [];
    for (const file of imageFiles) {
      const buffer  = await file.arrayBuffer();
      const base64  = Buffer.from(buffer).toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;
      const { url, publicId } = await uploadImage(dataUri, "hamper-shop/products");
      uploadedImages.push({ url, publicId });
    }

    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      category,
      featured,
      images: uploadedImages,
    });

    return created({ product });

  } catch (err) {
    console.error("[POST /api/products]", err);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return badRequest(messages.join(", "));
    }
    return serverError();
  }
}