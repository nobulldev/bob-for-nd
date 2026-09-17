import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  authenticateAdminCredentials,
  clearAdminCookie,
  createAdminCookie,
  isAdminRequest,
} from "../server/adminAuth.js";
import { sendJson } from "../server/vercelHttp.js";

const isSecureRequest = (request: VercelRequest) =>
  request.headers["x-forwarded-proto"] === "https";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method === "GET") {
    if (!isAdminRequest(request.headers.cookie)) {
      return sendJson(response, 401, { authenticated: false });
    }
    return sendJson(response, 200, { authenticated: true });
  }

  if (request.method === "DELETE") {
    response.setHeader("Set-Cookie", clearAdminCookie(isSecureRequest(request)));
    return sendJson(response, 200, { authenticated: false });
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "GET, POST, DELETE");
    return sendJson(response, 405, { error: "Method not allowed." });
  }

  const contentLength = Number(request.headers["content-length"] ?? 0);
  if (contentLength > 2048) {
    return sendJson(response, 413, { error: "Request body is too large." });
  }

  try {
    const body = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
    if (!authenticateAdminCredentials(body?.email, body?.password)) {
      return sendJson(response, 401, { error: "Invalid email or password." });
    }

    response.setHeader("Set-Cookie", createAdminCookie(isSecureRequest(request)));
    return sendJson(response, 200, { authenticated: true });
  } catch {
    return sendJson(response, 400, { error: "Invalid request." });
  }
}
