import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AdminPage from "./AdminPage";
import { loginAdmin } from "@/lib/adminAuctionApi";

vi.mock("@/lib/adminAuctionApi", () => ({
  checkAdminSession: vi.fn(async () => true),
  loginAdmin: vi.fn(async () => undefined),
  logoutAdmin: vi.fn(async () => undefined),
  loadAdminAuction: vi.fn(async () => ({
    items: [
      {
        id: "jump-starter",
        title: "Cen-Tech Portable Jump Starter",
        description: "Jump starter",
        type: "Silent" as const,
        image: "/jump-starter.jpg",
        valueAmount: null,
        openingBid: 40,
        minimumBid: 76,
        reserveAmount: 50,
        bids: [
          {
            id: 10,
            bidder: "Alex Morgan",
            email: "alex@example.com",
            phone: "701-555-0198",
            amount: 50,
            createdAt: "2026-09-17T17:00:00.000Z",
          },
          {
            id: 11,
            bidder: "Jordan Lee",
            email: "jordan@example.com",
            phone: "701-555-0112",
            amount: 75,
            createdAt: "2026-09-17T17:30:00.000Z",
          },
        ],
      },
    ],
  })),
}));

describe("AdminPage", () => {
  beforeEach(() => {
    vi.stubGlobal("scrollTo", vi.fn());
  });

  it("shows full bid details and progression for silent auction items", async () => {
    render(<AdminPage />);

    expect(await screen.findByRole("heading", { name: "Auction overview" })).toBeInTheDocument();
    expect(screen.getByText("Cen-Tech Portable Jump Starter")).toBeInTheDocument();
    expect(screen.getByText("Alex Morgan")).toBeInTheDocument();
    expect(screen.getByText("alex@example.com")).toBeInTheDocument();
    expect(screen.getByText("701-555-0198")).toBeInTheDocument();
    expect(screen.getByText("+$10")).toBeInTheDocument();
    expect(screen.getByText("+$25")).toBeInTheDocument();
    expect(screen.getByText("$75", { selector: ".admin-bid-amount" })).toBeInTheDocument();
  });

  it("submits the configured login form", async () => {
    const api = await import("@/lib/adminAuctionApi");
    vi.mocked(api.checkAdminSession).mockResolvedValueOnce(false);
    render(<AdminPage />);

    fireEvent.change(await screen.findByLabelText("Email address"), { target: { value: "votebob26@gmail.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "Bob4theWin!" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign in securely" }));

    expect(loginAdmin).toHaveBeenCalledWith("votebob26@gmail.com", "Bob4theWin!");
    expect(await screen.findByRole("heading", { name: "Auction overview" })).toBeInTheDocument();
  });
});
