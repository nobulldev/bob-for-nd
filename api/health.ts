import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ensureAuctionDatabase } from "../server/auctionService";
import { sendJson } from "../server/vercelHttp";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return sendJson(response, 405, { error: "Method not allowed." });
  }

  try {
    await ensureAuctionDatabase();
    return sendJson(response, 200, { status: "ok", database: "neon" });
  } catch (error) {
    console.error("Neon health check failed.", error);
    return sendJson(response, 503, { status: "error", database: "neon" });
  }
}
