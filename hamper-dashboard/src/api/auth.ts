import { apiFetch } from "../lib/api";  // ⭐ CORRECT PATH

export async function loginUser(email: string, password: string) {
  return await apiFetch("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
