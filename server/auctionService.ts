import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import {
  AUCTION_CATALOG_DATA,
  type AuctionType,
} from "../src/data/auctionCatalogData.js";

type Sql = NeonQueryFunction<false, false>;

type ItemRow = {
  id: string;
  title: string;
  description: string;
  type: AuctionType;
  valueAmount: number | null;
  openingBid: number;
  reserveAmount: number | null;
};

type BidRow = {
  id: string | number;
  itemId: string;
  bidder: string;
  amount: number;
  createdAt: string | Date;
};

export type BidInput = {
  itemId?: unknown;
  bidder?: unknown;
  email?: unknown;
  phone?: unknown;
  amount?: unknown;
};

export class AuctionBidError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
  }
}

let sqlClient: Sql | undefined;
let initialization: Promise<void> | undefined;

const getSql = () => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is not configured.");

  sqlClient ??= neon(databaseUrl);
  return sqlClient;
};

const catalogRows = AUCTION_CATALOG_DATA.map((item) => ({
  id: item.id,
  title: item.title,
  description: item.description,
  auction_type: item.type,
  value_amount: item.valueAmount,
  opening_bid: item.openingBid,
  reserve_amount: item.reserveAmount,
  sort_order: item.sortOrder,
}));

const initialize = async () => {
  const sql = getSql();
  const catalogJson = JSON.stringify(catalogRows);

  await sql.transaction((tx) => [
    tx`SELECT pg_advisory_xact_lock(741852963)`,
    tx`
      CREATE TABLE IF NOT EXISTS auction_items (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        auction_type TEXT NOT NULL CHECK (auction_type IN ('Live', 'Silent')),
        value_amount INTEGER,
        opening_bid INTEGER NOT NULL CHECK (opening_bid >= 0),
        reserve_amount INTEGER,
        sort_order INTEGER NOT NULL
      )
    `,
    tx`
      CREATE TABLE IF NOT EXISTS bids (
        id BIGSERIAL PRIMARY KEY,
        source_key TEXT UNIQUE,
        item_id TEXT NOT NULL REFERENCES auction_items(id) ON DELETE CASCADE,
        bidder_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        amount INTEGER NOT NULL CHECK (amount > 0),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `,
    tx`ALTER TABLE bids ADD COLUMN IF NOT EXISTS email TEXT`,
    tx`UPDATE bids SET email = 'legacy-bid-' || id || '@invalid.local' WHERE email IS NULL`,
    tx`ALTER TABLE bids ALTER COLUMN email SET NOT NULL`,
    tx`
      CREATE INDEX IF NOT EXISTS bids_item_amount_idx
      ON bids (item_id, amount DESC, created_at DESC)
    `,
    tx`
      DROP FUNCTION IF EXISTS place_auction_bid(TEXT, TEXT, TEXT, INTEGER)
    `,
    tx`
      CREATE OR REPLACE FUNCTION place_auction_bid(
        p_item_id TEXT,
        p_bidder_name TEXT,
        p_email TEXT,
        p_phone TEXT,
        p_amount INTEGER
      )
      RETURNS TABLE (saved BOOLEAN, minimum_bid INTEGER)
      LANGUAGE plpgsql
      AS $$
      DECLARE
        item_type TEXT;
        item_opening_bid INTEGER;
        required_bid INTEGER;
      BEGIN
        PERFORM pg_advisory_xact_lock(hashtext(p_item_id));

        SELECT auction_type, opening_bid
          INTO item_type, item_opening_bid
        FROM auction_items
        WHERE id = p_item_id;

        IF NOT FOUND THEN
          RETURN QUERY SELECT FALSE, NULL::INTEGER;
          RETURN;
        END IF;

        IF item_type = 'Live' THEN
          SELECT GREATEST(item_opening_bid, COALESCE(MAX(amount), 0) + 1)
            INTO required_bid
          FROM bids
          WHERE item_id = p_item_id;
        ELSE
          required_bid := item_opening_bid;
        END IF;

        IF p_amount < required_bid THEN
          RETURN QUERY SELECT FALSE, required_bid;
          RETURN;
        END IF;

        INSERT INTO bids (item_id, bidder_name, email, phone, amount)
        VALUES (p_item_id, p_bidder_name, p_email, p_phone, p_amount);

        RETURN QUERY SELECT TRUE, required_bid;
      END;
      $$
    `,
    tx`
      INSERT INTO auction_items (
        id, title, description, auction_type, value_amount,
        opening_bid, reserve_amount, sort_order
      )
      SELECT
        item.id, item.title, item.description, item.auction_type,
        item.value_amount, item.opening_bid, item.reserve_amount, item.sort_order
      FROM json_to_recordset(${catalogJson}::json) AS item(
        id TEXT,
        title TEXT,
        description TEXT,
        auction_type TEXT,
        value_amount INTEGER,
        opening_bid INTEGER,
        reserve_amount INTEGER,
        sort_order INTEGER
      )
      ON CONFLICT (id) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        auction_type = EXCLUDED.auction_type,
        value_amount = EXCLUDED.value_amount,
        opening_bid = EXCLUDED.opening_bid,
        reserve_amount = EXCLUDED.reserve_amount,
        sort_order = EXCLUDED.sort_order
    `,
  ]);
};

export const ensureAuctionDatabase = async () => {
  initialization ??= initialize().catch((error) => {
    initialization = undefined;
    throw error;
  });
  return initialization;
};

export const clearAuctionBids = async () => {
  await ensureAuctionDatabase();
  const sql = getSql();
  await sql`TRUNCATE TABLE bids RESTART IDENTITY`;
};

export const getAuctionSnapshot = async () => {
  await ensureAuctionDatabase();
  const sql = getSql();

  const [rawItems, rawBids] = await Promise.all([
    sql`
      SELECT
        id,
        title,
        description,
        auction_type AS "type",
        value_amount AS "valueAmount",
        opening_bid AS "openingBid",
        reserve_amount AS "reserveAmount"
      FROM auction_items
      ORDER BY sort_order
    `,
    sql`
      SELECT
        b.id,
        b.item_id AS "itemId",
        b.bidder_name AS bidder,
        b.amount,
        b.created_at AS "createdAt"
      FROM bids b
      INNER JOIN auction_items i ON i.id = b.item_id
      WHERE i.auction_type = 'Live'
      ORDER BY b.item_id, b.amount DESC, b.created_at DESC
    `,
  ]);

  const items = rawItems as unknown as ItemRow[];
  const bids = rawBids as unknown as BidRow[];
  const bidsByItem = new Map<string, Array<{
    id: number;
    bidder: string;
    amount: number;
    createdAt: string;
  }>>();

  for (const bid of bids) {
    const itemBids = bidsByItem.get(bid.itemId) ?? [];
    itemBids.push({
      id: Number(bid.id),
      bidder: bid.bidder,
      amount: Number(bid.amount),
      createdAt: new Date(bid.createdAt).toISOString(),
    });
    bidsByItem.set(bid.itemId, itemBids);
  }

  return {
    items: items.map((item) => ({
      ...item,
      valueAmount: item.valueAmount === null ? null : Number(item.valueAmount),
      openingBid: Number(item.openingBid),
      reserveAmount: item.reserveAmount === null ? null : Number(item.reserveAmount),
      bids: bidsByItem.get(item.id) ?? [],
    })),
  };
};

export const validateBidInput = (body: BidInput) => {
  if (typeof body.itemId !== "string" || body.itemId.length > 100) return "Invalid auction item.";
  if (typeof body.bidder !== "string" || body.bidder.trim().length < 2 || body.bidder.length > 100) return "Enter a valid full name.";
  if (typeof body.email !== "string" || body.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) return "Enter a valid email address.";
  if (typeof body.phone !== "string" || body.phone.replace(/\D/g, "").length < 10 || body.phone.length > 30) return "Enter a valid phone number.";
  if (typeof body.amount !== "number" || !Number.isInteger(body.amount) || body.amount <= 0 || body.amount > 10_000_000) return "Enter a valid whole-dollar bid.";
  return null;
};

export const saveAuctionBid = async (input: Required<BidInput>) => {
  await ensureAuctionDatabase();
  const sql = getSql();
  const result = await sql`
    SELECT
      saved,
      minimum_bid AS "minimumBid"
    FROM place_auction_bid(
      ${String(input.itemId)},
      ${String(input.bidder).trim()},
      ${String(input.email).trim().toLowerCase()},
      ${String(input.phone).trim()},
      ${Number(input.amount)}
    )
  ` as unknown as Array<{ saved: boolean; minimumBid: number | null }>;

  const outcome = result[0];
  if (!outcome || outcome.minimumBid === null) {
    throw new AuctionBidError("Auction item not found.", 404);
  }
  if (!outcome.saved) {
    throw new AuctionBidError(`Bid must be at least ${Number(outcome.minimumBid)}.`, 409);
  }

  return getAuctionSnapshot();
};
