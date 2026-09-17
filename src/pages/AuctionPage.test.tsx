import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { loadAuctionDatabase } from "@/lib/auctionApi";
import AuctionPage from "./AuctionPage";

vi.mock("@/lib/auctionApi", () => ({
  loadAuctionDatabase: vi.fn(async () => ({
    items: [
      {
        id: "snap-on-tool-kit",
        title: "Database Live Item",
        description: "Loaded from Neon",
        type: "Live" as const,
        image: "/live.jpg",
        valueAmount: 5000,
        openingBid: 1800,
        minimumBid: 2751,
        reserveAmount: 3000,
        bids: [
          { id: 1, bidder: "Database Bidder", amount: 2750, createdAt: "2026-09-17T12:00:00Z" },
        ],
      },
      {
        id: "jump-starter",
        title: "Database Silent Item",
        description: "Loaded silently from Neon",
        type: "Silent" as const,
        image: "/silent.jpg",
        valueAmount: null,
        openingBid: 40,
        minimumBid: 91,
        reserveAmount: 100,
        bids: [],
      },
    ],
  })),
}));

describe("AuctionPage", () => {
  beforeEach(() => {
    vi.stubGlobal("scrollTo", vi.fn());
  });

  it("loads auction items and current bid values from the database", async () => {
    render(
      <MemoryRouter initialEntries={["/auction"]}>
        <AuctionPage />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { name: "Database Live Item" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Database Silent Item" })).toBeInTheDocument();
    expect(screen.getByText("Current Bid")).toBeInTheDocument();
    expect(screen.getByText("$2,750")).toBeInTheDocument();
    expect(screen.getByText("$91")).toBeInTheDocument();
    expect(loadAuctionDatabase).toHaveBeenCalledTimes(1);
  });
});
