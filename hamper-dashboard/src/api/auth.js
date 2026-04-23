import { apiFetch } from "./api";

export const loginUser = (email, password) =>
  apiFetch("/auth/login", {
    method: "POST",
    body: { email, password },
  });

export const registerUser = (name, email, password) =>
  apiFetch("/auth/register", {
    method: "POST",
    body: { name, email, password },
  });

export const getMe = () =>
  apiFetch("/auth/me", {
    method: "GET",
  });

export const logoutUser = () =>
  apiFetch("/auth/logout", {
    method: "POST",
  });