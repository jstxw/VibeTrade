/**
 * Backend URL configuration.
 * Set NEXT_PUBLIC_API_URL at build time (e.g. https://vibe-trade-backend.onrender.com).
 * NEXT_PUBLIC_WS_URL is optional; when absent it is derived from the API URL.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const WS_BASE_URL =
  process.env.NEXT_PUBLIC_WS_URL ||
  API_BASE_URL.replace(/^http/, "ws");
