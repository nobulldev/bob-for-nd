import { spawnSync } from "node:child_process";
import { ensureAuctionDatabase } from "../server/auctionService.js";

if (!process.env.DATABASE_URL?.trim()) {
  throw new Error(
    "DATABASE_URL is required during deployment to synchronize the Neon auction catalog.",
  );
}

console.log("Synchronizing the auction catalog with Neon...");
await ensureAuctionDatabase();
console.log("Neon auction schema and catalog are synchronized.");

console.log("Building the production frontend...");
const buildResult = spawnSync(process.execPath, ["run", "build"], {
  stdio: "inherit",
});

if (buildResult.error) {
  throw buildResult.error;
}

if (buildResult.status !== 0) {
  throw new Error(`Production build failed with exit code ${buildResult.status ?? "unknown"}.`);
}

console.log("Deployment build is ready.");
