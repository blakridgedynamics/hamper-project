// lib/whatsapp.js
// Generates a click-to-chat WhatsApp order link

/**
 * Build a WhatsApp order link for a product.
 *
 * @param {object} product   – Mongoose product document or plain object
 * @param {string} [number]  – Override the default WhatsApp number
 * @returns {string}         – Full wa.me URL
 *
 * Example output:
 *   https://wa.me/919876543210?text=Hi%2C+I+want+to+order+%22Luxury+Gift+Hamper%22+%E2%80%94+%E2%82%B91499
 */
export function generateWhatsAppOrderLink(product, number) {
  const whatsappNumber = number || process.env.WHATSAPP_NUMBER;

  if (!whatsappNumber) {
    throw new Error("WHATSAPP_NUMBER is not set in environment variables");
  }

  const productName = product.name || "this product";
  const price = product.price ? `₹${product.price}` : "";

  const text = [
    `Hi, I want to order "${productName}"`,
    price ? `— ${price}` : "",
    `\nPlease share availability and delivery details.`,
  ]
    .filter(Boolean)
    .join(" ");

  const encoded = encodeURIComponent(text);
  return `https://wa.me/${whatsappNumber}?text=${encoded}`;
}
