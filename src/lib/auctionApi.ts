import { getAuctionCatalogItem, type AuctionType } from "@/data/auctionCatalog";

export type StoredBid = {
  id: number;
  bidder: string;
  amount: number;
  createdAt: string;
};

export type StoredAuctionItem = {
  id: string;
  title: string;
  description: string;
  type: AuctionType;
  image: string;
  valueAmount: number | null;
  openingBid: number;
  reserveAmount: number | null;
  bids: StoredBid[];
};

type AuctionApiItem = Omit<StoredAuctionItem, "image">;

export type AuctionDatabaseSnapshot = {
  items: StoredAuctionItem[];
};

const attachImages = (items: AuctionApiItem[]): StoredAuctionItem[] =>
  items.map((item) => {
    const catalogItem = getAuctionCatalogItem(item.id);
    if (!catalogItem) throw new Error(`Auction item ${item.id} has no image mapping.`);
    return { ...item, image: catalogItem.image };
  });

const parseResponse = async (response: Response): Promise<AuctionDatabaseSnapshot> => {
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.error ?? "Auction service request failed.");
  }
  return { items: attachImages(payload.items as AuctionApiItem[]) };
};

export const loadAuctionDatabase = async (): Promise<AuctionDatabaseSnapshot> => {
  const response = await fetch("/api/auction", {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  return parseResponse(response);
};

export const saveAuctionBid = async (input: {
  itemId: string;
  bidder: string;
  phone: string;
  amount: number;
}): Promise<AuctionDatabaseSnapshot> => {
  const response = await fetch("/api/bids", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  return parseResponse(response);
};
