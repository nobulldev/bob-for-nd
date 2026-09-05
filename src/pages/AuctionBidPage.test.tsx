import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AuctionBidPage from "./AuctionBidPage";

describe("AuctionBidPage", () => {
  beforeEach(() => {
    vi.stubGlobal("scrollTo", vi.fn());
  });

  it("shows the leading bid and adds a valid mock bid to the history", () => {
    render(
      <MemoryRouter initialEntries={["/auction/bid"]}>
        <AuctionBidPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Choose an item to bid" })).toBeInTheDocument();
    expect(screen.getByText("Sarah M.", { selector: ".auction-current-bid__meta span" })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Bid amount"), { target: { value: "2201" } });
    fireEvent.change(screen.getByLabelText("Full name"), { target: { value: "Alex Morgan" } });
    fireEvent.change(screen.getByLabelText("Phone number"), { target: { value: "701-555-0198" } });
    fireEvent.click(screen.getByRole("button", { name: /Place Bid/i }));

    expect(screen.getByText("You're the high bidder!")).toBeInTheDocument();
    expect(screen.getAllByText("Alex Morgan").length).toBeGreaterThan(0);
    expect(screen.getAllByText("$2,201").length).toBeGreaterThan(0);
  });

  it("validates all bid fields before accepting a bid", () => {
    render(
      <MemoryRouter initialEntries={["/auction/bid"]}>
        <AuctionBidPage />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /Place Bid/i }));

    expect(screen.getByText("Enter a bid of at least $2,201.")).toBeInTheDocument();
    expect(screen.getByText("Enter your full name.")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid phone number with area code.")).toBeInTheDocument();
  });

  it("keeps current bids and bid history private for silent auction items", () => {
    render(
      <MemoryRouter initialEntries={["/auction/bid"]}>
        <AuctionBidPage />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Silent (8)" }));

    expect(screen.queryByText("Current bid")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Bid history" })).not.toBeInTheDocument();
    expect(screen.getByText("Minimum $40")).toBeInTheDocument();
  });
});
