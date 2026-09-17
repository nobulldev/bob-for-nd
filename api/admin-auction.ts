import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAdminRequest } from "../server/adminAuth.js";
import {
  AuctionBidError,
  getAdminAuctionSnapshot,
  setAuctionItemOpen,
} from "../server/auctionService.js";
import { sendJson } from "../server/vercelHttp.js";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "GET" && request.method !== "PATCH") {
    response.setHeader("Allow", "GET, PATCH");
    return sendJson(response, 405, { error: "Method not allowed." });
  }

  if (!isAdminRequest(request.headers.cookie)) {
    return sendJson(response, 401, { error: "Authentication required." });
  }

  try {
    if (request.method === "PATCH") {
      const contentLength = Number(request.headers["content-length"] ?? 0);
      if (contentLength > 2048) {
        return sendJson(response, 413, { error: "Request body is too large." });
      }
      const body = typeof request.body === "string" ? JSON.parse(request.body) : request.body;
      return sendJson(response, 200, await setAuctionItemOpen(body?.itemId, body?.isOpen));
    }
    return sendJson(response, 200, await getAdminAuctionSnapshot());
  } catch (error) {
    if (error instanceof AuctionBidError) {
      return sendJson(response, error.statusCode, { error: error.message });
    }
    console.error("Unable to load admin auction data.", error);
    return sendJson(response, 500, { error: "Unable to load auction data." });
  }
}
