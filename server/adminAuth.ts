import { createHmac, timingSafeEqual } from "node:crypto";

const ADMIN_EMAIL = "votebob26@gmail.com";
const ADMIN_PASSWORD = "Bob4theWin!";
const SESSION_SECRET = "bob-for-nd-auction-admin-session-2026-v1";
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

export const ADMIN_COOKIE_NAME = "bob_auction_admin";

type AdminSession = {
  email: string;
  expiresAt: number;
};

const safeEqual = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
};

const sign = (payload: string) =>
  createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");

export const authenticateAdminCredentials = (email: unknown, password: unknown) =>
  typeof email === "string"
  && typeof password === "string"
  && safeEqual(email.trim().toLowerCase(), ADMIN_EMAIL)
  && safeEqual(password, ADMIN_PASSWORD);

export const createAdminSessionToken = (now = Date.now()) => {
  const session: AdminSession = {
    email: ADMIN_EMAIL,
    expiresAt: now + SESSION_DURATION_MS,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
};

export const verifyAdminSessionToken = (token: string | undefined, now = Date.now()) => {
  if (!token) return false;
  const separator = token.lastIndexOf(".");
  if (separator < 1) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (!safeEqual(signature, sign(payload))) return false;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession;
    return session.email === ADMIN_EMAIL
      && Number.isFinite(session.expiresAt)
      && session.expiresAt > now;
  } catch {
    return false;
  }
};

export const getCookieValue = (cookieHeader: string | undefined, name: string) => {
  if (!cookieHeader) return undefined;
  for (const cookie of cookieHeader.split(";")) {
    const [rawName, ...rawValue] = cookie.trim().split("=");
    if (rawName === name) {
      try {
        return decodeURIComponent(rawValue.join("="));
      } catch {
        return undefined;
      }
    }
  }
  return undefined;
};

export const isAdminRequest = (cookieHeader: string | undefined) =>
  verifyAdminSessionToken(getCookieValue(cookieHeader, ADMIN_COOKIE_NAME));

export const createAdminCookie = (secure: boolean) => {
  const attributes = [
    `${ADMIN_COOKIE_NAME}=${encodeURIComponent(createAdminSessionToken())}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    `Max-Age=${SESSION_DURATION_MS / 1000}`,
  ];
  if (secure) attributes.push("Secure");
  return attributes.join("; ");
};

export const clearAdminCookie = (secure: boolean) => {
  const attributes = [
    `${ADMIN_COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Strict",
    "Max-Age=0",
  ];
  if (secure) attributes.push("Secure");
  return attributes.join("; ");
};
