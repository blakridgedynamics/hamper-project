// scripts/seedAdmin.js
// Run once to create your first admin account:
//   node scripts/seedAdmin.js
//
// Requires MONGODB_URI in your environment (or .env.local via dotenv).

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

// ── Minimal inline Admin schema (no Next.js context needed) ───────────────
const AdminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌  MONGODB_URI is not set.");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("✅  Connected to MongoDB\n");

  const rl = readline.createInterface({ input, output });

  const email = await rl.question("Admin email: ");
  const password = await rl.question("Admin password (min 8 chars): ");
  rl.close();

  if (!email || password.length < 8) {
    console.error("❌  Invalid email or password too short.");
    process.exit(1);
  }

  const exists = await Admin.findOne({ email });
  if (exists) {
    console.error("❌  An admin with this email already exists.");
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 12);
  const admin = await Admin.create({ email, password: hashed });

  console.log(`\n✅  Admin created: ${admin.email} (id: ${admin._id})`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
