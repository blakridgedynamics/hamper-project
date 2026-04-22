// lib/apiResponse.js
// Consistent JSON response wrappers for all API routes

import { NextResponse } from "next/server";

export const ok = (data, status = 200) =>
  NextResponse.json({ success: true, ...data }, { status });

export const created = (data) =>
  NextResponse.json({ success: true, ...data }, { status: 201 });

export const badRequest = (message = "Bad request") =>
  NextResponse.json({ success: false, message }, { status: 400 });

export const notFound = (message = "Not found") =>
  NextResponse.json({ success: false, message }, { status: 404 });

export const serverError = (message = "Internal server error") =>
  NextResponse.json({ success: false, message }, { status: 500 });
