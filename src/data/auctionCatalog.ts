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
import outdoorPizzaOvenPhoto from "@/assets/auction/OutdoorWood-Fired-Pizza-Oven-NWTF-photo.jpg";
import winterRefugePhoto from "@/assets/auction/WINTER-REFUGE-by-Gregory-Nelson-photo.jpg";
import roundHandmadeThrowPhoto from "@/assets/auction/36-Round-Handmade-Throw-photo.jpg";
import handmadeAfghanPhoto from "@/assets/auction/Handmade-Afghan-photo.jpg";
import changeableWelcomeMatPhoto from "@/assets/auction/Changeable-Welcome-Mat-photo.jpg";
import coffeeNotesSetPhoto from "@/assets/auction/CoffeeNotes-Set-photo.jpg";
import bodyCareSetPhoto from "@/assets/auction/Body-Care-Set-photo.jpg";
import brumateKitchenMagnetsPhoto from "@/assets/auction/BRUMate-water-bottle-and-Kitchen-Magnets-photo.jpg";
import kitchenTowelSetPhoto from "@/assets/auction/Kitchen-Towel-Set-photo.jpg";
import dishTowelSetPhoto from "@/assets/auction/Dish-Towel-Set-photo.jpg";
import christmasDecorationPhoto from "@/assets/auction/Christmas-decoration-photo.jpg";
import soupBreadComboOnePhoto from "@/assets/auction/SoupBread-combo1-photo.jpg";
import soupBreadComboTwoPhoto from "@/assets/auction/SoupBread-combo2-photo.jpg";
import hangingWelcomeSignPhoto from "@/assets/auction/hanging-WELCOME-sign-photo.jpg";
import homemadeHoneyPhoto from "@/assets/auction/homemade-honey-1-pound-photo.jpg";
import mediumTeePhoto from "@/assets/auction/Size-medium-tee-photo.jpg";
import infusedOliveOilsPhoto from "@/assets/auction/Infused-Olive-Oils-Set-photo.jpg";
import sympathyComfortGiftSetPhoto from "@/assets/auction/Sympathy-&-Comfort-Gift-Set-photo.jpg";
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
  "outdoor-pizza-oven": outdoorPizzaOvenPhoto,
  "winter-refuge-print": winterRefugePhoto,
  "round-handmade-throw": roundHandmadeThrowPhoto,
  "handmade-afghan": handmadeAfghanPhoto,
  "changeable-welcome-mat": changeableWelcomeMatPhoto,
  "coffee-notes-set": coffeeNotesSetPhoto,
  "body-care-set": bodyCareSetPhoto,
  "brumate-kitchen-magnets": brumateKitchenMagnetsPhoto,
  "kitchen-towel-set": kitchenTowelSetPhoto,
  "dish-towel-set": dishTowelSetPhoto,
  "christmas-decoration": christmasDecorationPhoto,
  "soup-bread-combo-1": soupBreadComboOnePhoto,
  "soup-bread-combo-2": soupBreadComboTwoPhoto,
  "hanging-welcome-sign": hangingWelcomeSignPhoto,
  "homemade-honey": homemadeHoneyPhoto,
  "medium-tee": mediumTeePhoto,
  "infused-olive-oils-set": infusedOliveOilsPhoto,
  "sympathy-comfort-gift-set": sympathyComfortGiftSetPhoto,
};

export type AuctionCatalogItem = AuctionCatalogRecord & { image: string };

export const AUCTION_CATALOG: AuctionCatalogItem[] = AUCTION_CATALOG_DATA.map((item) => ({
  ...item,
  image: auctionImages[item.id],
}));

export const getAuctionCatalogItem = (itemId: string) =>
  AUCTION_CATALOG.find((item) => item.id === itemId);
