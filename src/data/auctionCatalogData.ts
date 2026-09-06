export type AuctionType = "Live" | "Silent";

export type AuctionCatalogRecord = {
  id: string;
  title: string;
  description: string;
  type: AuctionType;
  valueAmount: number | null;
  openingBid: number;
  reserveAmount: number | null;
  sortOrder: number;
  featured?: boolean;
};

export type AuctionBidSeed = {
  sourceKey: string;
  itemId: string;
  bidder: string;
  phone: string;
  amount: number;
  createdAt: string;
};

export const AUCTION_CATALOG_DATA: AuctionCatalogRecord[] = [
  { id: "snap-on-tool-kit", title: "Snap-on Professional Tool Kit & Storage", description: "Built for people who take pride in doing the job right. Snap-on is known for premium professional tools, durable equipment, and tool storage designed to perform for years.", type: "Live", valueAmount: 4000, openingBid: 1800, reserveAmount: 2000, sortOrder: 1, featured: true },
  { id: "property-cleanup", title: "Professional Property Cleanup", description: "Take back your yard and enjoy a clean, safe outdoor space you can be proud of. Professional cleanup can include removing dead trees, clearing overgrown areas, cutting back unwanted vegetation, and hauling away outdoor debris.", type: "Live", valueAmount: 2000, openingBid: 2500, reserveAmount: null, sortOrder: 2, featured: true },
  { id: "dewalt-driver-set", title: "DeWalt Drill or Impact Driver Set", description: "A powerful, dependable set for home projects, repairs, and demanding jobs. Includes a ½-inch drill, impact driver, two batteries, and charger.", type: "Live", valueAmount: 230, openingBid: 100, reserveAmount: 150, sortOrder: 3 },
  { id: "electric-fireplace", title: "Electric Fireplace", description: "Add instant warmth and atmosphere to your home without the work of a traditional fireplace.", type: "Live", valueAmount: 50, openingBid: 100, reserveAmount: null, sortOrder: 4 },
  { id: "pizza-maker", title: "Presto Pizza Maker", description: "Make hot, crispy pizza at home with a convenient countertop appliance that is easy to use and clean.", type: "Live", valueAmount: 85, openingBid: 85, reserveAmount: null, sortOrder: 5 },
  { id: "jump-starter", title: "Cen-Tech Portable Jump Starter", description: "Be ready for a dead battery at home or on the road. This portable 750-peak-amp jump starter also includes a work light and 12V and USB power options.", type: "Silent", valueAmount: null, openingBid: 40, reserveAmount: 50, sortOrder: 6 },
  { id: "bottle-jack", title: "Pittsburgh 20-Ton Hydraulic Bottle Jack", description: "Heavy-duty lifting power for vehicles, trailers, equipment, and demanding workshop jobs.", type: "Silent", valueAmount: null, openingBid: 40, reserveAmount: 50, sortOrder: 7 },
  { id: "tongue-wrench", title: "Pittsburgh Tongue Wrench", description: "A dependable addition to any toolbox for automotive maintenance, equipment repairs, and projects requiring precise tightening.", type: "Silent", valueAmount: null, openingBid: 20, reserveAmount: 30, sortOrder: 8 },
  { id: "locking-pliers", title: "Pittsburgh Curved Locking Pliers Set", description: "A practical locking-pliers set that provides a secure grip for repairs, maintenance, and workshop projects.", type: "Silent", valueAmount: null, openingBid: 10, reserveAmount: 20, sortOrder: 9 },
  { id: "screwdriver-set", title: "Pittsburgh Screwdriver Set", description: "A versatile set of everyday screwdrivers for household projects, repairs, workshop tasks, and regular maintenance.", type: "Silent", valueAmount: null, openingBid: 25, reserveAmount: 30, sortOrder: 10 },
  { id: "solar-cow", title: "Solar Cow", description: "Add personality to your garden with this charming reading Highland cow and colorful solar-powered flower light.", type: "Silent", valueAmount: null, openingBid: 15, reserveAmount: 25, sortOrder: 11 },
  { id: "metal-dog", title: "Decorative Metal Dog", description: "A playful metal dog with plenty of personality, ready to bring character and humor to your home, porch, or garden.", type: "Silent", valueAmount: null, openingBid: 15, reserveAmount: 25, sortOrder: 12 },
  { id: "birdhouse-wind-chime", title: "Decorative Birdhouse Wind Chime", description: "A cheerful birdhouse topped with a colorful bird and finished with a hanging bell to brighten any porch, patio, or garden.", type: "Silent", valueAmount: null, openingBid: 5, reserveAmount: 10, sortOrder: 13 },
];

export const AUCTION_BID_SEEDS: AuctionBidSeed[] = [
  { sourceKey: "snap-1", itemId: "snap-on-tool-kit", bidder: "Sarah M.", phone: "7015550101", amount: 2200, createdAt: "2026-09-05T18:42:00-05:00" },
  { sourceKey: "snap-2", itemId: "snap-on-tool-kit", bidder: "Daniel R.", phone: "7015550102", amount: 2100, createdAt: "2026-09-05T17:18:00-05:00" },
  { sourceKey: "snap-3", itemId: "snap-on-tool-kit", bidder: "Sarah M.", phone: "7015550101", amount: 2000, createdAt: "2026-09-05T15:06:00-05:00" },
  { sourceKey: "cleanup-1", itemId: "property-cleanup", bidder: "Mark T.", phone: "7015550103", amount: 2700, createdAt: "2026-09-05T16:51:00-05:00" },
  { sourceKey: "cleanup-2", itemId: "property-cleanup", bidder: "Kelly B.", phone: "7015550104", amount: 2600, createdAt: "2026-09-05T13:30:00-05:00" },
  { sourceKey: "dewalt-1", itemId: "dewalt-driver-set", bidder: "Emily K.", phone: "7015550105", amount: 160, createdAt: "2026-09-05T14:44:00-05:00" },
  { sourceKey: "dewalt-2", itemId: "dewalt-driver-set", bidder: "John P.", phone: "7015550106", amount: 150, createdAt: "2026-09-05T12:08:00-05:00" },
  { sourceKey: "fireplace-1", itemId: "electric-fireplace", bidder: "Linda A.", phone: "7015550107", amount: 120, createdAt: "2026-09-04T20:15:00-05:00" },
  { sourceKey: "fireplace-2", itemId: "electric-fireplace", bidder: "Chris N.", phone: "7015550108", amount: 110, createdAt: "2026-09-04T18:32:00-05:00" },
  { sourceKey: "pizza-1", itemId: "pizza-maker", bidder: "Rachel S.", phone: "7015550109", amount: 95, createdAt: "2026-09-05T11:24:00-05:00" },
  { sourceKey: "pizza-2", itemId: "pizza-maker", bidder: "Mike J.", phone: "7015550110", amount: 90, createdAt: "2026-09-04T19:03:00-05:00" },
  { sourceKey: "jump-1", itemId: "jump-starter", bidder: "Thomas W.", phone: "7015550111", amount: 55, createdAt: "2026-09-05T15:37:00-05:00" },
  { sourceKey: "bottle-1", itemId: "bottle-jack", bidder: "Gary L.", phone: "7015550112", amount: 50, createdAt: "2026-09-05T09:46:00-05:00" },
  { sourceKey: "wrench-1", itemId: "tongue-wrench", bidder: "Paul D.", phone: "7015550113", amount: 30, createdAt: "2026-09-04T17:55:00-05:00" },
  { sourceKey: "pliers-1", itemId: "locking-pliers", bidder: "Jean H.", phone: "7015550114", amount: 20, createdAt: "2026-09-05T13:12:00-05:00" },
  { sourceKey: "drivers-1", itemId: "screwdriver-set", bidder: "Brian F.", phone: "7015550115", amount: 30, createdAt: "2026-09-04T21:20:00-05:00" },
  { sourceKey: "cow-1", itemId: "solar-cow", bidder: "Mary E.", phone: "7015550116", amount: 30, createdAt: "2026-09-05T16:03:00-05:00" },
  { sourceKey: "dog-1", itemId: "metal-dog", bidder: "Nancy G.", phone: "7015550117", amount: 25, createdAt: "2026-09-05T12:48:00-05:00" },
  { sourceKey: "birdhouse-1", itemId: "birdhouse-wind-chime", bidder: "Olivia C.", phone: "7015550118", amount: 15, createdAt: "2026-09-04T16:11:00-05:00" },
];
