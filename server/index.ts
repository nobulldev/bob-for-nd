import { resolve, sep } from "node:path";
import {
  AuctionBidError,
  ensureAuctionDatabase,
  getAuctionSnapshot,
  saveAuctionBid,
  validateBidInput,
  type BidInput,
} from "./auctionService";

const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });

const distRoot = resolve(import.meta.dir, "../dist");
const distPrefix = `${distRoot}${sep}`;

const serveFrontend = async (request: Request) => {
  const url = new URL(request.url);
  const relativePath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
  const requestedPath = resolve(distRoot, relativePath || "index.html");

  if (requestedPath !== distRoot && !requestedPath.startsWith(distPrefix)) {
    return new Response("Not found", { status: 404 });
  }

  const requestedFile = Bun.file(requestedPath);
  if (await requestedFile.exists()) {
    return new Response(requestedFile, {
      headers: { "X-Content-Type-Options": "nosniff" },
    });
  }

  return new Response(Bun.file(resolve(distRoot, "index.html")), {
    headers: { "X-Content-Type-Options": "nosniff" },
  });
};

const port = Number(process.env.PORT ?? 3001);

Bun.serve({
  port,
  hostname: "0.0.0.0",
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health" && request.method === "GET") {
      try {
        await ensureAuctionDatabase();
        return json({ status: "ok", database: "neon" });
      } catch (error) {
        console.error(error);
        return json({ status: "error", database: "neon" }, 503);
      }
    }

    if (url.pathname === "/api/auction" && request.method === "GET") {
      try {
        return json(await getAuctionSnapshot());
      } catch (error) {
        console.error(error);
        return json({ error: "Unable to load auction data." }, 500);
      }
    }

    if (url.pathname === "/api/bids" && request.method === "POST") {
      const contentLength = Number(request.headers.get("content-length") ?? 0);
      if (contentLength > 4096) return json({ error: "Request body is too large." }, 413);

      try {
        const body = await request.json() as BidInput;
        const validationError = validateBidInput(body);
        if (validationError) return json({ error: validationError }, 400);

        return json(await saveAuctionBid(body as Required<BidInput>), 201);
      } catch (error) {
        if (error instanceof AuctionBidError) {
          return json({ error: error.message }, error.statusCode);
        }
        console.error(error);
        return json({ error: "Unable to save bid." }, 500);
      }
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ error: "API route not found." }, 404);
    }

    return serveFrontend(request);
  },
  error(error) {
    console.error(error);
    return json({ error: "Internal server error." }, 500);
  },
});

console.log(`Auction development server listening on http://0.0.0.0:${port}`);
console.log("Database: Neon PostgreSQL");
