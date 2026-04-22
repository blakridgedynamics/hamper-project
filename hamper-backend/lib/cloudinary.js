// lib/cloudinary.js
// Cloudinary v2 SDK — configured once, imported wherever needed

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload a file buffer or base64 string to Cloudinary.
 * @param {string} fileBuffer  – base64 data URI or file path
 * @param {string} folder      – Cloudinary folder name
 * @returns {Promise<{url: string, publicId: string}>}
 */
export async function uploadImage(fileBuffer, folder = "hamper-shop") {
  const result = await cloudinary.uploader.upload(fileBuffer, {
    folder,
    resource_type: "image",
    transformation: [
      { quality: "auto:good" },
      { fetch_format: "auto" },
    ],
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

/**
 * Delete an image from Cloudinary by its public_id.
 * @param {string} publicId
 */
export async function deleteImage(publicId) {
  await cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
