import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { saveAuctionBid } from "@/lib/auctionApi";
import AuctionBidPage from "./AuctionBidPage";

vi.mock("@/lib/auctionApi", () => {
  const createItems = () => [
    {
      id: "snap-on-tool-kit",
      title: "Snap-on Professional Tool Kit & Storage",
      description: "Tools",
      type: "Live" as const,
      image: "/tools.jpg",
      valueAmount: 4000,
      openingBid: 1800,
      reserveAmount: 2000,
      bids: [
        { id: 1, bidder: "Sarah M.", amount: 2200, createdAt: "2026-09-05T18:42:00-05:00" },
      ],
    },
    {
      id: "jump-starter",
      title: "Cen-Tech Portable Jump Starter",
      description: "Jump starter",
      type: "Silent" as const,
      image: "/jump-starter.jpg",
      valueAmount: null,
      openingBid: 40,
      reserveAmount: 50,
      bids: [],
    },
  ];

  return {
    loadAuctionDatabase: vi.fn(async () => ({ items: createItems() })),
    saveAuctionBid: vi.fn(async (input: { bidder: string; email: string; phone: string; amount: number }) => {
      const items = createItems();
      items[0].bids.unshift({
        id: 2,
        bidder: input.bidder,
        amount: input.amount,
        createdAt: "2026-09-05T19:00:00-05:00",
      });
      return { items };
    }),
  };
});

describe("AuctionBidPage", () => {
  beforeEach(() => {
    vi.stubGlobal("scrollTo", vi.fn());
  });

  it("shows the leading bid and adds a valid Neon bid to the history", async () => {
    render(
      <MemoryRouter initialEntries={["/auction/bid"]}>
        <AuctionBidPage />
      </MemoryRouter>,
    );

    expect(await screen.findByRole("heading", { name: "Choose an item to bid" })).toBeInTheDocument();
    expect(await screen.findByText("Sarah M.", { selector: ".auction-current-bid__meta span" })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Bid amount"), { target: { value: "2201" } });
    fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "Alex Morgan" } });
    fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "alex@example.com" } });
    fireEvent.change(screen.getByLabelText("Phone number"), { target: { value: "701-555-0198" } });
    fireEvent.click(screen.getByRole("button", { name: /Place Bid/i }));

    expect(await screen.findByText("You're the high bidder!")).toBeInTheDocument();
    expect(screen.getByText(/Thank you for your support!/i)).toBeInTheDocument();
    expect(screen.getAllByText("Alex Morgan").length).toBeGreaterThan(0);
    expect(screen.getAllByText("$2,201").length).toBeGreaterThan(0);
    expect(saveAuctionBid).toHaveBeenCalledWith(expect.objectContaining({ email: "alex@example.com" }));
  });

  it("validates all bid fields before accepting a bid", async () => {
    render(
      <MemoryRouter initialEntries={["/auction/bid"]}>
        <AuctionBidPage />
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByRole("button", { name: /Place Bid/i }));

    expect(screen.getByText("Enter a whole-dollar bid of at least $2,201.")).toBeInTheDocument();
    expect(screen.getByText("Enter your full name.")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid phone number with area code.")).toBeInTheDocument();
  });

  it("keeps current bids and bid history private for silent auction items", async () => {
    render(
      <MemoryRouter initialEntries={["/auction/bid"]}>
        <AuctionBidPage />
      </MemoryRouter>,
    );

    fireEvent.click(await screen.findByRole("button", { name: "Silent (1)" }));

    expect(screen.queryByText("Current bid")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Bid history" })).not.toBeInTheDocument();
    expect(screen.getByText("Minimum $40")).toBeInTheDocument();
  });
});
