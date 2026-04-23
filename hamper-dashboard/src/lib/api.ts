const API = "https://hamper-project-pjl8.vercel.app/api";

export async function apiFetch(endpoint: string, options: any = {}) {
  const config: any = {
    method: options.method || "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  };

  // Only attach body if NOT GET
  if (options.body && config.method !== "GET") {
    config.body = JSON.stringify(options.body);
  }

  const res = await fetch(`${API}${endpoint}`, config);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "API error");
  }

  return data;
}