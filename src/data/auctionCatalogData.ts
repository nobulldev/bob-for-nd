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

export const AUCTION_CATALOG_DATA: AuctionCatalogRecord[] = [
  { id: "snap-on-tool-kit", title: "Snap-on Professional Tool Kit & Storage", description: "Built for people who take pride in doing the job right. Snap-on is known for premium professional tools, durable equipment, and tool storage designed to perform for years.", type: "Live", valueAmount: 3000, openingBid: 1800, reserveAmount: 2000, sortOrder: 1, featured: true },
  { id: "property-cleanup", title: "Professional Property Cleanup", description: "Take back your yard and enjoy a clean, safe outdoor space you can be proud of. Professional cleanup can include removing dead trees, clearing overgrown areas, cutting back unwanted vegetation, and hauling away outdoor debris.", type: "Live", valueAmount: 4000, openingBid: 2000, reserveAmount: 2500, sortOrder: 2, featured: true },
  { id: "dewalt-driver-set", title: "DeWalt Drill or Impact Driver Set", description: "A powerful, dependable set for home projects, repairs, and demanding jobs. Includes a ½-inch drill, impact driver, two batteries, and charger.", type: "Live", valueAmount: 230, openingBid: 100, reserveAmount: 150, sortOrder: 3 },
  { id: "electric-fireplace", title: "Electric Fireplace", description: "Add instant warmth and atmosphere to your home without the work of a traditional fireplace.", type: "Live", valueAmount: 50, openingBid: 100, reserveAmount: null, sortOrder: 4 },
  { id: "pizza-maker", title: "Presto Pizza Maker", description: "Make hot, crispy pizza at home with a convenient countertop appliance that is easy to use and clean.", type: "Live", valueAmount: 100, openingBid: 75, reserveAmount: null, sortOrder: 5 },
  { id: "jump-starter", title: "Cen-Tech Portable Jump Starter", description: "Be ready for a dead battery at home or on the road. This portable 750-peak-amp jump starter also includes a work light and 12V and USB power options.", type: "Silent", valueAmount: null, openingBid: 40, reserveAmount: 50, sortOrder: 6 },
  { id: "bottle-jack", title: "Pittsburgh 20-Ton Hydraulic Bottle Jack", description: "Heavy-duty lifting power for vehicles, trailers, equipment, and demanding workshop jobs.", type: "Silent", valueAmount: null, openingBid: 40, reserveAmount: 50, sortOrder: 7 },
  { id: "tongue-wrench", title: "Pittsburgh Tongue Wrench", description: "A dependable addition to any toolbox for automotive maintenance, equipment repairs, and projects requiring precise tightening.", type: "Silent", valueAmount: null, openingBid: 20, reserveAmount: 30, sortOrder: 8 },
  { id: "locking-pliers", title: "Pittsburgh Curved Locking Pliers Set", description: "A practical locking-pliers set that provides a secure grip for repairs, maintenance, and workshop projects.", type: "Silent", valueAmount: null, openingBid: 10, reserveAmount: 20, sortOrder: 9 },
  { id: "screwdriver-set", title: "Pittsburgh Screwdriver Set", description: "A versatile set of everyday screwdrivers for household projects, repairs, workshop tasks, and regular maintenance.", type: "Silent", valueAmount: null, openingBid: 25, reserveAmount: 30, sortOrder: 10 },
  { id: "solar-cow", title: "Solar Cow", description: "Add personality to your garden with this charming reading Highland cow and colorful solar-powered flower light.", type: "Silent", valueAmount: null, openingBid: 15, reserveAmount: 25, sortOrder: 11 },
  { id: "metal-dog", title: "Decorative Metal Dog", description: "A playful metal dog with plenty of personality, ready to bring character and humor to your home, porch, or garden.", type: "Silent", valueAmount: null, openingBid: 15, reserveAmount: 25, sortOrder: 12 },
  { id: "birdhouse-wind-chime", title: "Decorative Birdhouse Wind Chime", description: "A cheerful birdhouse topped with a colorful bird and finished with a hanging bell to brighten any porch, patio, or garden.", type: "Silent", valueAmount: null, openingBid: 5, reserveAmount: 10, sortOrder: 13 },
];
