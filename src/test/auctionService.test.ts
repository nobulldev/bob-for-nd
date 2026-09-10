import { describe, expect, it } from "vitest";
import { validateBidInput } from "../../server/auctionService";

const validBid = {
  itemId: "snap-on-tool-kit",
  bidder: "Alex Morgan",
  email: "alex@example.com",
  phone: "701-555-0198",
  amount: 2201,
};

describe("validateBidInput", () => {
  it("requires a valid email address", () => {
    expect(validateBidInput({ ...validBid, email: undefined })).toBe("Enter a valid email address.");
    expect(validateBidInput({ ...validBid, email: "not-an-email" })).toBe("Enter a valid email address.");
  });

  it("accepts a bid with all required contact fields", () => {
    expect(validateBidInput(validBid)).toBeNull();
  });
});
