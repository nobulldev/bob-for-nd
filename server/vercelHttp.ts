import type { VercelResponse } from "@vercel/node";

export const sendJson = (response: VercelResponse, status: number, body: unknown) => {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.status(status).json(body);
};
