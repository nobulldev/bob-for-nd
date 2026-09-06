import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAuctionSnapshot } from "../server/auctionService.js";
import { sendJson } from "../server/vercelHttp.js";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return sendJson(response, 405, { error: "Method not allowed." });
  }

  try {
    return sendJson(response, 200, await getAuctionSnapshot());
  } catch (error) {
    console.error("Unable to load auction data.", error);
    return sendJson(response, 500, { error: "Unable to load auction data." });
  }
}
