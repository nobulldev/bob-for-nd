import { getAuctionCatalogItem, type AuctionType } from "@/data/auctionCatalog";

export type AdminBid = {
  id: number;
  bidder: string;
  email: string;
  phone: string;
  amount: number;
  createdAt: string;
};

export type AdminAuctionItem = {
  id: string;
  title: string;
  description: string;
  type: AuctionType;
  image: string;
  valueAmount: number | null;
  openingBid: number;
  minimumBid: number;
  reserveAmount: number | null;
  isOpen: boolean;
  bids: AdminBid[];
};

type ApiAdminAuctionItem = Omit<AdminAuctionItem, "image">;

export type AdminAuctionSnapshot = {
  items: AdminAuctionItem[];
};

const attachImages = (items: ApiAdminAuctionItem[]): AdminAuctionItem[] =>
  items.map((item) => {
    const catalogItem = getAuctionCatalogItem(item.id);
    if (!catalogItem) throw new Error(`Auction item ${item.id} has no image mapping.`);
    return { ...item, image: catalogItem.image };
  });

const parseJson = async (response: Response) => {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.error ?? "Admin request failed.");
  return payload;
};

export const checkAdminSession = async () => {
  const response = await fetch("/api/admin-auth", {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (response.status === 401) return false;
  await parseJson(response);
  return true;
};

export const loginAdmin = async (email: string, password: string) => {
  const response = await fetch("/api/admin-auth", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  await parseJson(response);
};

export const logoutAdmin = async () => {
  const response = await fetch("/api/admin-auth", {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });
  await parseJson(response);
};

export const loadAdminAuction = async (): Promise<AdminAuctionSnapshot> => {
  const response = await fetch("/api/admin-auction", {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  const payload = await parseJson(response) as { items: ApiAdminAuctionItem[] };
  return { items: attachImages(payload.items) };
};

export const closeAdminAuctionItem = async (itemId: string): Promise<AdminAuctionSnapshot> => {
  const response = await fetch("/api/admin-auction", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemId, isOpen: false }),
  });
  const payload = await parseJson(response) as { items: ApiAdminAuctionItem[] };
  return { items: attachImages(payload.items) };
};

export const reopenAdminAuctionItem = async (itemId: string): Promise<AdminAuctionSnapshot> => {
  const response = await fetch("/api/admin-auction", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemId, isOpen: true }),
  });
  const payload = await parseJson(response) as { items: ApiAdminAuctionItem[] };
  return { items: attachImages(payload.items) };
};
