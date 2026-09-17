import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAdminRequest } from "../server/adminAuth.js";
import { getAdminAuctionSnapshot } from "../server/auctionService.js";
import { sendJson } from "../server/vercelHttp.js";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return sendJson(response, 405, { error: "Method not allowed." });
  }

  if (!isAdminRequest(request.headers.cookie)) {
    return sendJson(response, 401, { error: "Authentication required." });
  }

  try {
    return sendJson(response, 200, await getAdminAuctionSnapshot());
  } catch (error) {
    console.error("Unable to load admin auction data.", error);
    return sendJson(response, 500, { error: "Unable to load auction data." });
  }
}
