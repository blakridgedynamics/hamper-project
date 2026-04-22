// lib/auth.js
// JWT helpers + cookie utilities for admin authentication

import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in your .env.local file");
}

// ─── Token Generation ──────────────────────────────────────────────────────

/**
 * Sign a JWT for an admin.
 * @param {{ id: string, email: string }} payload
 * @returns {string} signed JWT
 */
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// ─── Token Verification ────────────────────────────────────────────────────

/**
 * Verify and decode a JWT.
 * Returns the decoded payload or null if invalid/expired.
 * @param {string} token
 * @returns {{ id: string, email: string } | null}
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// ─── Cookie Helpers ────────────────────────────────────────────────────────

const COOKIE_NAME = "hamper_admin_token";

/**
 * Attach a secure HttpOnly JWT cookie to a NextResponse.
 */
export function setAuthCookie(response, token) {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    path: "/",
  });
  return response;
}

/**
 * Clear the auth cookie (logout).
 */
export function clearAuthCookie(response) {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/",
  });
  return response;
}

// ─── Request Auth Extraction ───────────────────────────────────────────────

/**
 * Extract & verify token from either:
 *   1. HttpOnly cookie  (browser / dashboard)
 *   2. Authorization: Bearer <token>  (API clients / testing)
 *
 * @param {Request} request
 * @returns {{ id: string, email: string } | null}
 */
export function getAdminFromRequest(request) {
  // 1. Try cookie first
  const cookieToken = request.cookies?.get(COOKIE_NAME)?.value;
  if (cookieToken) {
    const decoded = verifyToken(cookieToken);
    if (decoded) return decoded;
  }

  // 2. Fall back to Bearer token
  const authHeader = request.headers.get("authorization") || "";
  if (authHeader.startsWith("Bearer ")) {
    const bearerToken = authHeader.slice(7);
    return verifyToken(bearerToken);
  }

  return null;
}

// ─── Unauthorised Helper ───────────────────────────────────────────────────

export function unauthorised(message = "Unauthorised") {
  return NextResponse.json({ success: false, message }, { status: 401 });
}
