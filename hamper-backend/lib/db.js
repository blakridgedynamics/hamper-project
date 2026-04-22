// lib/db.js
// Singleton MongoDB connection — safe for Next.js hot-reload & serverless

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define MONGODB_URI in your .env.local file"
  );
}

/**
 * Global cache prevents creating a new connection on every
 * hot-reload in development or every invocation in serverless.
 */
let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
      })
      .then((m) => {
        console.log("✅ MongoDB connected");
        return m;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
