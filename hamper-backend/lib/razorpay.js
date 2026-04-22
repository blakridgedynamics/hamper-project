// lib/razorpay.js
// ─────────────────────────────────────────────────────────────────────────────
// Razorpay integration — STUB, ready to activate.
//
// To enable:
//   1. npm install razorpay
//   2. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env.local
//   3. Uncomment the code below and remove the stub exports
// ─────────────────────────────────────────────────────────────────────────────

// import Razorpay from "razorpay";
// import crypto from "crypto";
//
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });
//
// /**
//  * Create a Razorpay order.
//  * @param {number} amountInRupees
//  * @param {string} receipt  – your internal order/product ID
//  */
// export async function createOrder(amountInRupees, receipt) {
//   return razorpay.orders.create({
//     amount: Math.round(amountInRupees * 100), // Razorpay uses paise
//     currency: "INR",
//     receipt,
//   });
// }
//
// /**
//  * Verify Razorpay webhook / payment signature.
//  */
// export function verifyPaymentSignature({ orderId, paymentId, signature }) {
//   const body = `${orderId}|${paymentId}`;
//   const expected = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(body)
//     .digest("hex");
//   return expected === signature;
// }

// ── Temporary stubs so imports don't break ────────────────────────────────
export async function createOrder() {
  throw new Error("Razorpay is not yet configured. See lib/razorpay.js");
}

export function verifyPaymentSignature() {
  throw new Error("Razorpay is not yet configured. See lib/razorpay.js");
}
