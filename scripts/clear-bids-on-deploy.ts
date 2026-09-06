import { clearAuctionBids } from "../server/auctionService.js";

if (process.env.VERCEL !== "1") {
  throw new Error("Automatic bid cleanup can only run during a Vercel deployment.");
}

if (process.env.VERCEL_ENV !== "production") {
  console.log(`Bid cleanup skipped for Vercel environment: ${process.env.VERCEL_ENV ?? "unknown"}.`);
  process.exit(0);
}

await clearAuctionBids();
console.log("Production deployment: all Neon bids were deleted.");
