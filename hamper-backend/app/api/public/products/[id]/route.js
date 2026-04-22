// app/api/public/products/[id]/route.js
// GET /api/public/products/:id  → single product detail (public)

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { generateWhatsAppOrderLink } from "@/lib/whatsapp";
import { ok, notFound, serverError } from "@/lib/apiResponse";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const product = await Product.findById(params.id).lean();

    if (!product || !product.inStock) {
      return notFound("Product not found");
    }

    return ok({
      product: {
        ...product,
        whatsappOrderLink: generateWhatsAppOrderLink(product),
      },
    });
  } catch (err) {
    console.error("[GET /api/public/products/:id]", err);
    return serverError();
  }
}
