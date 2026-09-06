import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  AuctionBidError,
  saveAuctionBid,
  validateBidInput,
  type BidInput,
} from "../server/auctionService";
import { sendJson } from "../server/vercelHttp";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendJson(response, 405, { error: "Method not allowed." });
  }

  const contentLength = Number(request.headers["content-length"] ?? 0);
  if (contentLength > 4096) {
    return sendJson(response, 413, { error: "Request body is too large." });
  }

  try {
    const body = (typeof request.body === "string"
      ? JSON.parse(request.body)
      : request.body) as BidInput;
    const validationError = validateBidInput(body ?? {});
    if (validationError) return sendJson(response, 400, { error: validationError });

    const snapshot = await saveAuctionBid(body as Required<BidInput>);
    return sendJson(response, 201, snapshot);
  } catch (error) {
    if (error instanceof AuctionBidError) {
      return sendJson(response, error.statusCode, { error: error.message });
    }

    console.error("Unable to save auction bid.", error);
    return sendJson(response, 500, { error: "Unable to save bid." });
  }
}
