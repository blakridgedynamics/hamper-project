const API = "https://hamper-project-pjl8.vercel.app/api";

export async function apiFetch(endpoint: string, options: any = {}) {
  const res = await fetch(`${API}${endpoint}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "API error");
  }

  return data;
}