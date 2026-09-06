import { ensureAuctionDatabase } from "../server/auctionService";

await ensureAuctionDatabase();
console.log("Neon auction schema and seed data are ready.");
