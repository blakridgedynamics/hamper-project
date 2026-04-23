// app/api/public/products/route.js
// GET /api/public/products  → list products (public, no auth required)
export const runtime = "nodejs";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { generateWhatsAppOrderLink } from "@/lib/whatsapp";
import { ok, serverError } from "@/lib/apiResponse";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const filter = { inStock: true };
    if (category) filter.category = category;
    if (featured === "true") filter.featured = true;
    if (search) filter.$text = { $search: search };

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Attach WhatsApp order link to each product
    const productsWithLinks = products.map((p) => ({
      ...p,
      whatsappOrderLink: generateWhatsAppOrderLink(p),
    }));

    return ok({
      products: productsWithLinks,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("[GET /api/public/products]", err);
    return serverError();
  }
}
