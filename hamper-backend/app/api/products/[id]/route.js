// app/api/products/[id]/route.js
// GET    /api/products/:id  → single product
// PUT    /api/products/:id  → update product
// DELETE /api/products/:id  → delete product
//
// Protected by middleware.js
export const runtime = "nodejs";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { ok, badRequest, notFound, serverError } from "@/lib/apiResponse";

// ── GET ────────────────────────────────────────────────────────────────────
export async function GET(request, { params }) {
  try {
    await connectDB();
    const product = await Product.findById(params.id).lean();
    if (!product) return notFound("Product not found");
    return ok({ product });
  } catch (err) {
    console.error("[GET /api/products/:id]", err);
    return serverError();
  }
}

// ── PUT ────────────────────────────────────────────────────────────────────
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const product = await Product.findById(params.id);
    if (!product) return notFound("Product not found");

    const formData = await request.formData();

    // ── Update scalar fields if provided ──────────────────────────────────
    const fields = ["name", "description", "category"];
    fields.forEach((f) => {
      const val = formData.get(f);
      if (val !== null) product[f] = val;
    });

    const price = formData.get("price");
    if (price !== null) product.price = parseFloat(price);

    const featured = formData.get("featured");
    if (featured !== null) product.featured = featured === "true";

    const inStock = formData.get("inStock");
    if (inStock !== null) product.inStock = inStock === "true";

    // ── Handle new image uploads ───────────────────────────────────────────
    const imageFiles = formData.getAll("images");
    for (const file of imageFiles) {
      if (!file || typeof file === "string") continue;
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;
      const { url, publicId } = await uploadImage(dataUri, "hamper-shop/products");
      product.images.push({ url, publicId });
    }

    // ── Handle image removal  (pass publicIds to delete as JSON string) ───
    const removeImages = formData.get("removeImages"); // JSON array of publicIds
    if (removeImages) {
      const publicIds = JSON.parse(removeImages);
      for (const pid of publicIds) {
        await deleteImage(pid);
      }
      product.images = product.images.filter(
        (img) => !publicIds.includes(img.publicId)
      );
    }

    await product.save();
    return ok({ product });
  } catch (err) {
    console.error("[PUT /api/products/:id]", err);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return badRequest(messages.join(", "));
    }
    return serverError();
  }
}

// ── DELETE ─────────────────────────────────────────────────────────────────
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const product = await Product.findById(params.id);
    if (!product) return notFound("Product not found");

    // Delete all images from Cloudinary first
    for (const img of product.images) {
      await deleteImage(img.publicId);
    }

    await product.deleteOne();
    return ok({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("[DELETE /api/products/:id]", err);
    return serverError();
  }
}
