// models/Product.js

import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true }, // Cloudinary public_id for deletion
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Name cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      // Example categories — extend as needed
      enum: {
        values: [
          "birthday",
          "anniversary",
          "wedding",
          "corporate",
          "festive",
          "baby-shower",
          "thank-you",
          "custom",
        ],
        message: "{VALUE} is not a valid category",
      },
    },
    images: {
      type: [ImageSchema],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    // Razorpay-ready: store a price_id or product_id later
    razorpayProductId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// ─── Indexes ───────────────────────────────────────────────────────────────
ProductSchema.index({ category: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ name: "text", description: "text" }); // full-text search

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
