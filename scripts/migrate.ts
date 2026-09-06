import { ensureAuctionDatabase } from "../server/auctionService.js";

await ensureAuctionDatabase();
console.log("Neon auction schema and seed data are ready.");
