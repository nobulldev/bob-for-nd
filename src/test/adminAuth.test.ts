import { describe, expect, it } from "vitest";
import {
  ADMIN_COOKIE_NAME,
  authenticateAdminCredentials,
  createAdminSessionToken,
  getCookieValue,
  verifyAdminSessionToken,
} from "../../server/adminAuth";

describe("admin authentication", () => {
  it("only accepts the configured admin credentials", () => {
    expect(authenticateAdminCredentials("votebob26@gmail.com", "Bob4theWin!")).toBe(true);
    expect(authenticateAdminCredentials("other@example.com", "Bob4theWin!")).toBe(false);
    expect(authenticateAdminCredentials("votebob26@gmail.com", "wrong-password")).toBe(false);
  });

  it("signs, validates, and expires admin sessions", () => {
    const now = Date.UTC(2026, 8, 17, 12);
    const token = createAdminSessionToken(now);

    expect(verifyAdminSessionToken(token, now + 1_000)).toBe(true);
    expect(verifyAdminSessionToken(`${token}tampered`, now + 1_000)).toBe(false);
    expect(verifyAdminSessionToken(token, now + 9 * 60 * 60 * 1_000)).toBe(false);
  });

  it("reads the session cookie without failing on malformed values", () => {
    expect(getCookieValue(`theme=dark; ${ADMIN_COOKIE_NAME}=abc.def`, ADMIN_COOKIE_NAME)).toBe("abc.def");
    expect(getCookieValue(`${ADMIN_COOKIE_NAME}=%E0%A4%A`, ADMIN_COOKIE_NAME)).toBeUndefined();
  });
});
