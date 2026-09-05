import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Clock3,
  Gavel,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
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
import "./AuctionPage.css";
import "./AuctionBidPage.css";

type AuctionType = "Live" | "Silent";

type Bid = {
  bidder: string;
  amount: number;
  date: string;
};

type AuctionItem = {
  id: string;
  title: string;
  description: string;
  type: AuctionType;
  image: string;
  estimatedValue: number;
  openingBid: number;
  bids: Bid[];
};

type FormErrors = Partial<Record<"amount" | "name" | "phone", string>>;

const auctionItems: AuctionItem[] = [
  {
    id: "snap-on-tool-kit",
    title: "Snap-on Professional Tool Kit & Storage",
    description:
      "Premium professional tools, durable equipment, and tool storage built to perform for years.",
    type: "Live",
    image: snapOnToolKitPhoto,
    estimatedValue: 4000,
    openingBid: 1800,
    bids: [
      { bidder: "Sarah M.", amount: 2200, date: "Sep 5, 2026 · 6:42 PM" },
      { bidder: "Daniel R.", amount: 2100, date: "Sep 5, 2026 · 5:18 PM" },
      { bidder: "Sarah M.", amount: 2000, date: "Sep 5, 2026 · 3:06 PM" },
    ],
  },
  {
    id: "property-cleanup",
    title: "Professional Property Cleanup",
    description:
      "Professional removal of dead trees, overgrowth, unwanted vegetation, and outdoor debris.",
    type: "Live",
    image: propertyCleanupPhoto,
    estimatedValue: 2000,
    openingBid: 500,
    bids: [
      { bidder: "Mark T.", amount: 900, date: "Sep 5, 2026 · 4:51 PM" },
      { bidder: "Kelly B.", amount: 800, date: "Sep 5, 2026 · 1:30 PM" },
    ],
  },
  {
    id: "dewalt-driver-set",
    title: "DeWalt Drill or Impact Driver Set",
    description:
      "Includes a ½-inch drill, impact driver, two batteries, and charger for home or jobsite projects.",
    type: "Live",
    image: dewaltDrillPhoto,
    estimatedValue: 230,
    openingBid: 100,
    bids: [
      { bidder: "Emily K.", amount: 140, date: "Sep 5, 2026 · 2:44 PM" },
      { bidder: "John P.", amount: 130, date: "Sep 5, 2026 · 12:08 PM" },
    ],
  },
  {
    id: "electric-fireplace",
    title: "Electric Fireplace",
    description: "Instant warmth and atmosphere without the work of a traditional fireplace.",
    type: "Live",
    image: electricFireplacePhoto,
    estimatedValue: 150,
    openingBid: 50,
    bids: [
      { bidder: "Linda A.", amount: 100, date: "Sep 4, 2026 · 8:15 PM" },
      { bidder: "Chris N.", amount: 80, date: "Sep 4, 2026 · 6:32 PM" },
    ],
  },
  {
    id: "pizza-maker",
    title: "Presto Pizza Maker",
    description: "A convenient countertop appliance for making hot, crispy pizza at home.",
    type: "Live",
    image: prestoPizzaMakerPhoto,
    estimatedValue: 85,
    openingBid: 35,
    bids: [
      { bidder: "Rachel S.", amount: 65, date: "Sep 5, 2026 · 11:24 AM" },
      { bidder: "Mike J.", amount: 55, date: "Sep 4, 2026 · 7:03 PM" },
    ],
  },
  {
    id: "jump-starter",
    title: "Cen-Tech Portable Jump Starter",
    description: "A 750-peak-amp jump starter with work light plus 12V and USB power options.",
    type: "Silent",
    image: cenTechJumpStarterPhoto,
    estimatedValue: 80,
    openingBid: 40,
    bids: [
      { bidder: "Thomas W.", amount: 55, date: "Sep 5, 2026 · 3:37 PM" },
      { bidder: "Amy C.", amount: 50, date: "Sep 5, 2026 · 10:19 AM" },
    ],
  },
  {
    id: "bottle-jack",
    title: "Pittsburgh 20-Ton Hydraulic Bottle Jack",
    description: "Heavy-duty lifting power for vehicles, trailers, equipment, and workshop jobs.",
    type: "Silent",
    image: bottleJackPhoto,
    estimatedValue: 75,
    openingBid: 40,
    bids: [{ bidder: "Gary L.", amount: 50, date: "Sep 5, 2026 · 9:46 AM" }],
  },
  {
    id: "tongue-wrench",
    title: "Pittsburgh Tongue Wrench",
    description: "A dependable toolbox addition for automotive maintenance and equipment repairs.",
    type: "Silent",
    image: tongueWrenchPhoto,
    estimatedValue: 40,
    openingBid: 20,
    bids: [{ bidder: "Paul D.", amount: 30, date: "Sep 4, 2026 · 5:55 PM" }],
  },
  {
    id: "locking-pliers",
    title: "Pittsburgh Curved Locking Pliers Set",
    description: "A practical pliers set with a secure grip for repairs and workshop projects.",
    type: "Silent",
    image: lockingPliersPhoto,
    estimatedValue: 30,
    openingBid: 10,
    bids: [{ bidder: "Jean H.", amount: 20, date: "Sep 5, 2026 · 1:12 PM" }],
  },
  {
    id: "screwdriver-set",
    title: "Pittsburgh Screwdriver Set",
    description: "A versatile everyday screwdriver set for household repairs and regular maintenance.",
    type: "Silent",
    image: screwdriverSetPhoto,
    estimatedValue: 45,
    openingBid: 25,
    bids: [{ bidder: "Brian F.", amount: 30, date: "Sep 4, 2026 · 9:20 PM" }],
  },
  {
    id: "solar-cow",
    title: "Solar Cow",
    description: "A charming reading Highland cow with a colorful solar-powered flower light.",
    type: "Silent",
    image: solarCowPhoto,
    estimatedValue: 35,
    openingBid: 15,
    bids: [
      { bidder: "Mary E.", amount: 30, date: "Sep 5, 2026 · 4:03 PM" },
      { bidder: "Lisa V.", amount: 25, date: "Sep 5, 2026 · 8:51 AM" },
    ],
  },
  {
    id: "metal-dog",
    title: "Decorative Metal Dog",
    description: "A playful metal dog ready to bring character to a home, porch, or garden.",
    type: "Silent",
    image: decorativeDogPhoto,
    estimatedValue: 35,
    openingBid: 15,
    bids: [{ bidder: "Nancy G.", amount: 25, date: "Sep 5, 2026 · 12:48 PM" }],
  },
  {
    id: "birdhouse-wind-chime",
    title: "Decorative Birdhouse Wind Chime",
    description: "A colorful birdhouse and hanging bell to brighten any porch, patio, or garden.",
    type: "Silent",
    image: birdhouseWindChimePhoto,
    estimatedValue: 20,
    openingBid: 5,
    bids: [{ bidder: "Olivia C.", amount: 15, date: "Sep 4, 2026 · 4:11 PM" }],
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatBidDate = () =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
  })
    .format(new Date())
    .replace(/,(?= \d{1,2}:)/, " ·");

const AuctionBidPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(auctionItems);
  const [selectedId, setSelectedId] = useState(() => {
    const requestedItem = new URLSearchParams(window.location.search).get("item");
    return auctionItems.some((item) => item.id === requestedItem)
      ? requestedItem as string
      : auctionItems[0].id;
  });
  const [filter, setFilter] = useState<"All" | AuctionType>("All");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = "Preview Items & Bid Online | Bob Heitkamp Auction";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const selectedItem = items.find((item) => item.id === selectedId) ?? items[0];
  const currentBid = selectedItem.bids[0];
  const isSilentAuction = selectedItem.type === "Silent";
  const minimumNextBid = isSilentAuction ? selectedItem.openingBid : currentBid.amount + 1;

  const filteredItems = useMemo(
    () => items.filter((item) => filter === "All" || item.type === filter),
    [filter, items],
  );

  const chooseItem = (itemId: string) => {
    setSelectedId(itemId);
    setAmount("");
    setErrors({});
    setSuccessMessage("");
  };

  const chooseFilter = (nextFilter: "All" | AuctionType) => {
    setFilter(nextFilter);
    const nextItems = items.filter((item) => nextFilter === "All" || item.type === nextFilter);
    if (!nextItems.some((item) => item.id === selectedId)) {
      chooseItem(nextItems[0].id);
    }
  };

  const submitBid = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const numericAmount = Number(amount);
    const nextErrors: FormErrors = {};

    if (!Number.isFinite(numericAmount) || numericAmount < minimumNextBid) {
      nextErrors.amount = `Enter a bid of at least ${formatCurrency(minimumNextBid)}.`;
    }
    if (name.trim().length < 2) {
      nextErrors.name = "Enter your full name.";
    }
    if (phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Enter a valid phone number with area code.";
    }

    setErrors(nextErrors);
    setSuccessMessage("");
    if (Object.keys(nextErrors).length > 0) return;

    const newBid: Bid = {
      bidder: name.trim(),
      amount: numericAmount,
      date: formatBidDate(),
    };

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === selectedItem.id ? { ...item, bids: [newBid, ...item.bids] } : item,
      ),
    );
    setAmount("");
    setSuccessMessage(
      isSilentAuction
        ? `Your ${formatCurrency(numericAmount)} sealed bid has been recorded.`
        : `Your ${formatCurrency(numericAmount)} bid is now leading this item.`,
    );
  };

  return (
    <>
      <SiteHeader />
      <main className="auction-page auction-bid-page">
        <section className="auction-bid-section">
          <div className="auction-container">
            <button
              className="auction-bid-back"
              type="button"
              aria-label="Go back"
              onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/auction"))}
            >
              <ArrowLeft aria-hidden="true" />
              <span>Go back</span>
            </button>

            <div className="auction-bid-demo" role="note">
              <strong>Demo preview</strong>
              <span>Bids on this page use mock data and are not submitted to the campaign.</span>
            </div>

            <div className="auction-bid-toolbar">
              <div>
                <span className="auction-bid-kicker">Available lots</span>
                <h2>Choose an item to bid</h2>
              </div>
              <div className="auction-bid-filters" aria-label="Filter auction items">
                {(["All", "Live", "Silent"] as const).map((option) => (
                  <button
                    className={filter === option ? "active" : ""}
                    key={option}
                    type="button"
                    aria-pressed={filter === option}
                    onClick={() => chooseFilter(option)}
                  >
                    {option} ({option === "All" ? items.length : items.filter((item) => item.type === option).length})
                  </button>
                ))}
              </div>
            </div>

            <div className="auction-bid-layout">
              <div className="auction-bid-items" aria-label="Auction items">
                {filteredItems.map((item) => {
                  const leadingBid = item.bids[0];
                  const selected = selectedId === item.id;
                  return (
                    <button
                      className={`auction-bid-card${selected ? " auction-bid-card--selected" : ""}`}
                      key={item.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => chooseItem(item.id)}
                    >
                      <span className="auction-bid-card__image">
                        <img src={item.image} alt="" loading="lazy" />
                        <small>{item.type} auction</small>
                      </span>
                      <span className="auction-bid-card__body">
                        <strong>{item.title}</strong>
                        {item.type === "Live" ? (
                          <>
                            <span className="auction-bid-card__current">
                              <small>Current bid</small>
                              <b>{formatCurrency(leadingBid.amount)}</b>
                            </span>
                            <span className="auction-bid-card__leader">
                              {leadingBid.bidder} · {leadingBid.date}
                            </span>
                          </>
                        ) : (
                          <span className="auction-bid-card__current">
                            <small>Minimum bid</small>
                            <b>{formatCurrency(item.openingBid)}</b>
                          </span>
                        )}
                      </span>
                      <ChevronRight className="auction-bid-card__arrow" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>

              <article className="auction-bid-detail" aria-live="polite">
                <div className="auction-bid-detail__image">
                  <img src={selectedItem.image} alt={selectedItem.title} />
                  <span>{selectedItem.type} auction</span>
                </div>
                <div className="auction-bid-detail__content">
                  <span className="auction-bid-kicker">Selected item</span>
                  <h2>{selectedItem.title}</h2>

                  <div className="auction-bid-stats">
                    <span>
                      <small>Estimated value</small>
                      <strong>{formatCurrency(selectedItem.estimatedValue)}</strong>
                    </span>
                    <span>
                      <small>Opening bid</small>
                      <strong>{formatCurrency(selectedItem.openingBid)}</strong>
                    </span>
                  </div>

                  {!isSilentAuction ? (
                    <>
                      <div className="auction-current-bid">
                        <div className="auction-current-bid__heading">
                          <span><Gavel aria-hidden="true" /> Current bid</span>
                          <small>{selectedItem.bids.length} {selectedItem.bids.length === 1 ? "bid" : "bids"}</small>
                        </div>
                        <strong>{formatCurrency(currentBid.amount)}</strong>
                        <div className="auction-current-bid__meta">
                          <span><UserRound aria-hidden="true" /> {currentBid.bidder}</span>
                          <span><Clock3 aria-hidden="true" /> {currentBid.date}</span>
                        </div>
                      </div>

                      <section className="auction-bid-history" aria-labelledby="bid-history-title">
                        <div className="auction-bid-subheading">
                          <h3 id="bid-history-title">Bid history</h3>
                          <span>Most recent first</span>
                        </div>
                        <ol>
                          {selectedItem.bids.map((bid, index) => (
                            <li key={`${bid.bidder}-${bid.date}-${index}`}>
                              <span className="auction-bid-history__rank">{index + 1}</span>
                              <span className="auction-bid-history__bidder">
                                <strong>{bid.bidder}</strong>
                                <small>{bid.date}</small>
                              </span>
                              <b>{formatCurrency(bid.amount)}</b>
                            </li>
                          ))}
                        </ol>
                      </section>
                    </>
                  ) : null}

                  <form className="auction-bid-form" onSubmit={submitBid} noValidate>
                    <div className="auction-bid-subheading">
                      <h3>Place your bid</h3>
                      <span>Minimum {formatCurrency(minimumNextBid)}</span>
                    </div>

                    <label className="auction-bid-field auction-bid-field--amount">
                      <span>Bid amount</span>
                      <span className="auction-bid-input-wrap">
                        <b>$</b>
                        <input
                          type="number"
                          inputMode="decimal"
                          min={minimumNextBid}
                          step="1"
                          value={amount}
                          aria-invalid={Boolean(errors.amount)}
                          aria-describedby={errors.amount ? "bid-amount-error" : undefined}
                          placeholder={String(minimumNextBid)}
                          onChange={(event) => setAmount(event.target.value)}
                        />
                      </span>
                      {errors.amount ? <small className="auction-bid-error" id="bid-amount-error">{errors.amount}</small> : null}
                    </label>

                    <div className="auction-bid-form__row">
                      <label className="auction-bid-field">
                        <span>Full name</span>
                        <input
                          type="text"
                          autoComplete="name"
                          value={name}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? "bid-name-error" : undefined}
                          placeholder="Your full name"
                          onChange={(event) => setName(event.target.value)}
                        />
                        {errors.name ? <small className="auction-bid-error" id="bid-name-error">{errors.name}</small> : null}
                      </label>
                      <label className="auction-bid-field">
                        <span>Phone number</span>
                        <input
                          type="tel"
                          autoComplete="tel"
                          value={phone}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? "bid-phone-error" : "bid-phone-note"}
                          placeholder="(701) 555-0123"
                          onChange={(event) => setPhone(event.target.value)}
                        />
                        {errors.phone ? <small className="auction-bid-error" id="bid-phone-error">{errors.phone}</small> : null}
                      </label>
                    </div>

                    <div className="auction-bid-form__footer">
                      <p id="bid-phone-note">
                        <ShieldCheck aria-hidden="true" />
                        Your phone number is kept private and used only to contact you if you win.
                      </p>
                      <button className="auction-button auction-button--red" type="submit">
                        Place Bid <Gavel aria-hidden="true" />
                      </button>
                    </div>

                    {successMessage ? (
                      <div className="auction-bid-success" role="status">
                        <ShieldCheck aria-hidden="true" />
                        <span>
                          <strong>{isSilentAuction ? "Bid received" : "You're the high bidder!"}</strong>
                          {successMessage}
                        </span>
                      </div>
                    ) : null}
                  </form>
                </div>
              </article>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
};

export default AuctionBidPage;
