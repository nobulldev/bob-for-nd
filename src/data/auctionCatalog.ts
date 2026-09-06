import snapOnToolKitPhoto from "@/assets/auction/Snap-on-Professional-Tool-Kit-&-Storage-photo.jpg";
import propertyCleanupPhoto from "@/assets/auction/Professional-Property-Cleanup-photo.jpg";
import dewaltDrillPhoto from "@/assets/auction/DeWalt-Drill-&-Impact-Driver-Set-photo.jpg";
import electricFireplacePhoto from "@/assets/auction/Electric-Fireplace-photo.jpg";
import prestoPizzaMakerPhoto from "@/assets/auction/Presto-Pizza-Maker-photo.jpg";
import cenTechJumpStarterPhoto from "@/assets/auction/Cen-Tech-Portable-Jump-Starter-photo.jpg";
import bottleJackPhoto from "@/assets/auction/Pittsburgh-20-Ton-Hydraulic-Bottle-Jack-photo.jpg";
import tongueWrenchPhoto from "@/assets/auction/Pittsburgh-Tongue-Wrench-photo.jpg";
import lockingPliersPhoto from "@/assets/auction/Pittsburgh-Curved-Locking-Pliers-Set-photo.jpg";
import screwdriverSetPhoto from "@/assets/auction/Pittsburgh-Screwdriver-Set-photo.jpg";
import solarCowPhoto from "@/assets/auction/Solar-Cow-photo.jpg";
import decorativeDogPhoto from "@/assets/auction/Decorative-Metal-Dog-photo.jpg";
import birdhouseWindChimePhoto from "@/assets/auction/Decorative-Birdhouse-Wind-Chime-photo.jpg";
import { AUCTION_CATALOG_DATA, type AuctionCatalogRecord } from "./auctionCatalogData";

export type { AuctionType } from "./auctionCatalogData";

const auctionImages: Record<string, string> = {
  "snap-on-tool-kit": snapOnToolKitPhoto,
  "property-cleanup": propertyCleanupPhoto,
  "dewalt-driver-set": dewaltDrillPhoto,
  "electric-fireplace": electricFireplacePhoto,
  "pizza-maker": prestoPizzaMakerPhoto,
  "jump-starter": cenTechJumpStarterPhoto,
  "bottle-jack": bottleJackPhoto,
  "tongue-wrench": tongueWrenchPhoto,
  "locking-pliers": lockingPliersPhoto,
  "screwdriver-set": screwdriverSetPhoto,
  "solar-cow": solarCowPhoto,
  "metal-dog": decorativeDogPhoto,
  "birdhouse-wind-chime": birdhouseWindChimePhoto,
};

export type AuctionCatalogItem = AuctionCatalogRecord & { image: string };

export const AUCTION_CATALOG: AuctionCatalogItem[] = AUCTION_CATALOG_DATA.map((item) => ({
  ...item,
  image: auctionImages[item.id],
}));

export const getAuctionCatalogItem = (itemId: string) =>
  AUCTION_CATALOG.find((item) => item.id === itemId);
