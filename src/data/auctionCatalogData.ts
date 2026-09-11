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
  { id: "snap-on-tool-kit", title: "Snap-on Professional Storage", description: "Built for people who take pride in doing the job right. Snap-on is known for premium professional tool storage designed to perform for years.", type: "Live", valueAmount: 3000, openingBid: 1800, reserveAmount: 2000, sortOrder: 1, featured: true },
  { id: "property-cleanup", title: "Professional Property Cleanup", description: "Take back your yard and enjoy a clean, safe outdoor space you can be proud of. Professional cleanup can include removing dead trees, clearing overgrown areas, cutting back unwanted vegetation, and hauling away outdoor debris.", type: "Live", valueAmount: 4000, openingBid: 2000, reserveAmount: 2500, sortOrder: 2, featured: true },
  { id: "dewalt-driver-set", title: "DeWalt Drill or Impact Driver Set", description: "A powerful, dependable set for home projects, repairs, and demanding jobs. Includes a ½-inch drill, impact driver, two batteries, and charger.", type: "Live", valueAmount: 230, openingBid: 100, reserveAmount: 150, sortOrder: 3 },
  { id: "electric-fireplace", title: "Electric Fireplace", description: "Add instant warmth and atmosphere to your home without the work of a traditional fireplace.", type: "Live", valueAmount: 50, openingBid: 100, reserveAmount: null, sortOrder: 4 },
  { id: "pizza-maker", title: "Presto Pizza Maker", description: "Make hot, crispy pizza at home with a convenient countertop appliance that is easy to use and clean.", type: "Live", valueAmount: 100, openingBid: 75, reserveAmount: null, sortOrder: 5 },
  { id: "infused-olive-oils-set", title: "Garlic & Herb and Smoked Bacon Infused Olive Oils Set", description: "A flavorful pairing of garlic-and-herb and smoked-bacon infused olive oils for dipping, drizzling, marinades, and everyday cooking.", type: "Live", valueAmount: 100, openingBid: 75, reserveAmount: null, sortOrder: 6 },
  { id: "sympathy-comfort-gift-set", title: "Sympathy & Comfort Gift Set", description: "A thoughtfully arranged gift set designed to offer warmth, care, and comfort during a difficult time.", type: "Live", valueAmount: 60, openingBid: 40, reserveAmount: 50, sortOrder: 7 },
  { id: "jump-starter", title: "Cen-Tech Portable Jump Starter", description: "Be ready for a dead battery at home or on the road. This portable 750-peak-amp jump starter also includes a work light and 12V and USB power options.", type: "Silent", valueAmount: null, openingBid: 40, reserveAmount: 50, sortOrder: 8 },
  { id: "bottle-jack", title: "Pittsburgh 20-Ton Hydraulic Bottle Jack", description: "Heavy-duty lifting power for vehicles, trailers, equipment, and demanding workshop jobs.", type: "Silent", valueAmount: null, openingBid: 40, reserveAmount: 50, sortOrder: 9 },
  { id: "tongue-wrench", title: "Pittsburgh Tongue Wrench", description: "A dependable addition to any toolbox for automotive maintenance, equipment repairs, and projects requiring precise tightening.", type: "Silent", valueAmount: null, openingBid: 20, reserveAmount: 30, sortOrder: 10 },
  { id: "locking-pliers", title: "Pittsburgh Curved Locking Pliers Set", description: "A practical locking-pliers set that provides a secure grip for repairs, maintenance, and workshop projects.", type: "Silent", valueAmount: null, openingBid: 10, reserveAmount: 20, sortOrder: 11 },
  { id: "screwdriver-set", title: "Pittsburgh Screwdriver Set", description: "A versatile set of everyday screwdrivers for household projects, repairs, workshop tasks, and regular maintenance.", type: "Silent", valueAmount: null, openingBid: 25, reserveAmount: 30, sortOrder: 12 },
  { id: "solar-cow", title: "Solar Cow", description: "Add personality to your garden with this charming reading Highland cow and colorful solar-powered flower light.", type: "Silent", valueAmount: null, openingBid: 15, reserveAmount: 25, sortOrder: 13 },
  { id: "metal-dog", title: "Decorative Metal Dog", description: "A playful metal dog with plenty of personality, ready to bring character and humor to your home, porch, or garden.", type: "Silent", valueAmount: null, openingBid: 15, reserveAmount: 25, sortOrder: 14 },
  { id: "birdhouse-wind-chime", title: "Decorative Birdhouse Wind Chime", description: "A cheerful birdhouse topped with a colorful bird and finished with a hanging bell to brighten any porch, patio, or garden.", type: "Silent", valueAmount: null, openingBid: 5, reserveAmount: 10, sortOrder: 15 },
  { id: "outdoor-pizza-oven", title: "Outdoor/Wood-Fired Pizza Oven NWTF", description: "Bring wood-fired flavor outdoors with a pizza oven made for crisp crusts and memorable backyard meals.", type: "Silent", valueAmount: null, openingBid: 75, reserveAmount: null, sortOrder: 16 },
  { id: "winter-refuge-print", title: '"WINTER REFUGE" by Gregory Nelson', description: "A numbered Gregory Nelson print, edition 132 of 500, featuring the serene winter scene titled “WINTER REFUGE.”", type: "Silent", valueAmount: null, openingBid: 50, reserveAmount: null, sortOrder: 17 },
  { id: "round-handmade-throw", title: '36" Round Handmade Throw', description: "A handcrafted 36-inch round throw that adds warmth, texture, and a personal touch to any room.", type: "Silent", valueAmount: null, openingBid: 25, reserveAmount: null, sortOrder: 18 },
  { id: "handmade-afghan", title: 'Handmade Afghan, 60" x 60"', description: "A generously sized handmade afghan measuring 60 by 60 inches, perfect for cozy evenings at home.", type: "Silent", valueAmount: null, openingBid: 65, reserveAmount: null, sortOrder: 19 },
  { id: "changeable-welcome-mat", title: "Changeable Welcome Mat", description: "A versatile welcome mat designed to refresh your entryway with an easily changeable look.", type: "Silent", valueAmount: null, openingBid: 55, reserveAmount: null, sortOrder: 20 },
  { id: "coffee-notes-set", title: "Coffee/Notes Set", description: "A coordinating coffee and notes set for relaxed mornings, desk breaks, and thoughtful gifting.", type: "Silent", valueAmount: null, openingBid: 15, reserveAmount: null, sortOrder: 21 },
  { id: "body-care-set", title: "Body Care Set", description: "A soothing collection of body-care essentials for a little everyday relaxation and self-care.", type: "Silent", valueAmount: null, openingBid: 55, reserveAmount: null, sortOrder: 22 },
  { id: "brumate-kitchen-magnets", title: "BRUMate Water Bottle & Kitchen Magnets", description: "A BRUMate water bottle paired with a set of kitchen magnets for a practical and fun combination.", type: "Silent", valueAmount: null, openingBid: 30, reserveAmount: null, sortOrder: 23 },
  { id: "kitchen-towel-set", title: "Kitchen Towel Set", description: "A coordinated set of kitchen towels that brings a useful and polished touch to everyday cleanup.", type: "Silent", valueAmount: null, openingBid: 15, reserveAmount: null, sortOrder: 24 },
  { id: "dish-towel-set", title: "Dish Towel Set", description: "A practical set of dish towels ready for daily kitchen use or gifting.", type: "Silent", valueAmount: null, openingBid: 25, reserveAmount: null, sortOrder: 25 },
  { id: "christmas-decoration", title: "Christmas Decoration", description: "A festive decoration to bring seasonal warmth and holiday cheer to your home.", type: "Silent", valueAmount: null, openingBid: 35, reserveAmount: null, sortOrder: 26 },
  { id: "soup-bread-combo-1", title: "Soup/Bread Combo 1", description: "A comforting soup-and-bread combination ready to make mealtime simple and satisfying.", type: "Silent", valueAmount: null, openingBid: 15, reserveAmount: null, sortOrder: 27 },
  { id: "soup-bread-combo-2", title: "Soup/Bread Combo 2", description: "A second comforting soup-and-bread combination for an easy, hearty meal.", type: "Silent", valueAmount: null, openingBid: 15, reserveAmount: null, sortOrder: 28 },
  { id: "hanging-welcome-sign", title: "Hanging WELCOME Sign", description: "A welcoming hanging sign that adds a friendly decorative accent to an entryway, porch, or wall.", type: "Silent", valueAmount: null, openingBid: 30, reserveAmount: null, sortOrder: 29 },
  { id: "homemade-honey", title: "Homemade Honey — 1 Pound", description: "One pound of homemade honey with naturally sweet flavor for tea, toast, baking, and more.", type: "Silent", valueAmount: null, openingBid: 5, reserveAmount: null, sortOrder: 30 },
  { id: "medium-tee", title: "Medium T-Shirt", description: "A comfortable size-medium T-shirt ready for casual everyday wear.", type: "Silent", valueAmount: null, openingBid: 5, reserveAmount: null, sortOrder: 31 },
];
