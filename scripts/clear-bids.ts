import { clearAuctionBids } from "../server/auctionService.js";

if (!process.argv.includes("--confirm")) {
  throw new Error("Bid reset cancelled. Run this script through bun run db:clear-bids.");
}

await clearAuctionBids();
console.log("All Neon bids were deleted. Auction items were preserved.");
