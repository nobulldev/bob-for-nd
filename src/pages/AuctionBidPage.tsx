import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Clock3,
  Database,
  Gavel,
  LoaderCircle,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import type { AuctionType } from "@/data/auctionCatalog";
import {
  loadAuctionDatabase,
  saveAuctionBid,
  type StoredAuctionItem,
} from "@/lib/auctionApi";
import "./AuctionPage.css";
import "./AuctionBidPage.css";

type FormErrors = Partial<Record<"amount" | "name" | "email" | "phone", string>>;

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatBidDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Chicago",
  })
    .format(new Date(value))
    .replace(/,(?= \d{1,2}:)/, " ·");

const AuctionBidPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<StoredAuctionItem[]>([]);
  const [selectedId, setSelectedId] = useState(
    () => new URLSearchParams(window.location.search).get("item") ?? "snap-on-tool-kit",
  );
  const [filter, setFilter] = useState<"All" | AuctionType>("All");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [databaseError, setDatabaseError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = "Preview Items & Bid Online | Bob Heitkamp Auction";
    let active = true;

    const synchronizeAuction = async (initialLoad = false) => {
      try {
        const snapshot = await loadAuctionDatabase();
        if (!active) return;

        setItems(snapshot.items);
        setDatabaseError("");
        setSelectedId((currentSelectedId) =>
          snapshot.items.some((item) => item.id === currentSelectedId)
            ? currentSelectedId
            : snapshot.items[0]?.id ?? "",
        );
      } catch (error) {
        if (!active) return;
        console.error("Unable to load the auction database.", error);
        if (initialLoad) {
          setDatabaseError("The auction database could not be loaded. Refresh the page to try again.");
        }
      } finally {
        if (active && initialLoad) setIsLoading(false);
      }
    };

    void synchronizeAuction(true);
    const synchronizationInterval = window.setInterval(() => {
      if (document.visibilityState === "visible") void synchronizeAuction();
    }, 10_000);
    const synchronizeWhenVisible = () => {
      if (document.visibilityState === "visible") void synchronizeAuction();
    };
    document.addEventListener("visibilitychange", synchronizeWhenVisible);

    return () => {
      active = false;
      window.clearInterval(synchronizationInterval);
      document.removeEventListener("visibilitychange", synchronizeWhenVisible);
      document.title = previousTitle;
    };
  }, []);

  const selectedItem = items.find((item) => item.id === selectedId) ?? items[0];
  const currentBid = selectedItem?.bids[0];
  const isSilentAuction = selectedItem?.type === "Silent";
  const minimumNextBid = selectedItem
    ? isSilentAuction
      ? selectedItem.openingBid
      : Math.max(selectedItem.openingBid, (currentBid?.amount ?? 0) + 1)
    : 0;

  const filteredItems = useMemo(
    () => items.filter((item) => filter === "All" || item.type === filter),
    [filter, items],
  );

  const chooseItem = (itemId: string) => {
    setSelectedId(itemId);
    setAmount("");
    setErrors({});
    setSuccessMessage("");
    setSubmitError("");
  };

  const chooseFilter = (nextFilter: "All" | AuctionType) => {
    setFilter(nextFilter);
    const nextItems = items.filter((item) => nextFilter === "All" || item.type === nextFilter);
    if (!nextItems.some((item) => item.id === selectedId) && nextItems.length > 0) {
      chooseItem(nextItems[0].id);
    }
  };

  const submitBid = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedItem) return;

    const numericAmount = Number(amount);
    const nextErrors: FormErrors = {};

    if (!Number.isInteger(numericAmount) || numericAmount < minimumNextBid) {
      nextErrors.amount = `Enter a whole-dollar bid of at least ${formatCurrency(minimumNextBid)}.`;
    }
    if (name.trim().length < 2) {
      nextErrors.name = "Enter your full name.";
    }
    if (!isValidEmail(email) || email.length > 254) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Enter a valid phone number with area code.";
    }

    setErrors(nextErrors);
    setSuccessMessage("");
    setSubmitError("");
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const snapshot = await saveAuctionBid({
        itemId: selectedItem.id,
        bidder: name,
        email,
        phone,
        amount: numericAmount,
      });
      setItems(snapshot.items);
      setAmount("");
      setSuccessMessage(
        isSilentAuction
          ? `Your ${formatCurrency(numericAmount)} sealed bid has been recorded. Thank you for your support!`
          : `Your ${formatCurrency(numericAmount)} bid is now leading this item. Thank you for your support!`,
      );
    } catch (error) {
      console.error("Unable to save bid.", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Your bid could not be saved. Review the amount and try again.",
      );

      try {
        const snapshot = await loadAuctionDatabase();
        setItems(snapshot.items);
      } catch (synchronizationError) {
        console.error("Unable to refresh bids after the rejected bid.", synchronizationError);
      }
    } finally {
      setIsSubmitting(false);
    }
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
              <Database aria-hidden="true" />
              <strong>Shared online auction</strong>
              <span>Items and bids are synchronized securely through the campaign&apos;s Neon database.</span>
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
                    disabled={isLoading || Boolean(databaseError)}
                    onClick={() => chooseFilter(option)}
                  >
                    {option} ({option === "All" ? items.length : items.filter((item) => item.type === option).length})
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="auction-bid-database-state" role="status">
                <LoaderCircle aria-hidden="true" />
                <strong>Loading auction database…</strong>
              </div>
            ) : databaseError ? (
              <div className="auction-bid-database-state auction-bid-database-state--error" role="alert">
                <Database aria-hidden="true" />
                <strong>{databaseError}</strong>
              </div>
            ) : selectedItem ? (
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
                                <b>{formatCurrency(leadingBid?.amount ?? item.openingBid)}</b>
                              </span>
                              <span className="auction-bid-card__leader">
                                {leadingBid
                                  ? `${leadingBid.bidder} · ${formatBidDate(leadingBid.createdAt)}`
                                  : "No bids yet"}
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
                      {isSilentAuction ? (
                        <>
                          <span>
                            <small>Minimum bid</small>
                            <strong>{formatCurrency(selectedItem.openingBid)}</strong>
                          </span>
                          {selectedItem.reserveAmount !== null ? (
                            <span>
                              <small>Reserve</small>
                              <strong>{formatCurrency(selectedItem.reserveAmount)}</strong>
                            </span>
                          ) : null}
                        </>
                      ) : (
                        <>
                          {selectedItem.valueAmount !== null ? (
                            <span>
                              <small>Value</small>
                              <strong>{formatCurrency(selectedItem.valueAmount)}</strong>
                            </span>
                          ) : null}
                          <span>
                            <small>Opening bid</small>
                            <strong>{formatCurrency(selectedItem.openingBid)}</strong>
                          </span>
                          {selectedItem.reserveAmount !== null ? (
                            <span>
                              <small>Reserve</small>
                              <strong>{formatCurrency(selectedItem.reserveAmount)}</strong>
                            </span>
                          ) : null}
                        </>
                      )}
                    </div>

                    {!isSilentAuction && currentBid ? (
                      <>
                        <div className="auction-current-bid">
                          <div className="auction-current-bid__heading">
                            <span><Gavel aria-hidden="true" /> Current bid</span>
                            <small>{selectedItem.bids.length} {selectedItem.bids.length === 1 ? "bid" : "bids"}</small>
                          </div>
                          <strong>{formatCurrency(currentBid.amount)}</strong>
                          <div className="auction-current-bid__meta">
                            <span><UserRound aria-hidden="true" /> {currentBid.bidder}</span>
                            <span><Clock3 aria-hidden="true" /> {formatBidDate(currentBid.createdAt)}</span>
                          </div>
                        </div>

                        <section className="auction-bid-history" aria-labelledby="bid-history-title">
                          <div className="auction-bid-subheading">
                            <h3 id="bid-history-title">Bid history</h3>
                            <span>Most recent first</span>
                          </div>
                          <ol>
                            {selectedItem.bids.map((bid, index) => (
                              <li key={bid.id}>
                                <span className="auction-bid-history__rank">{index + 1}</span>
                                <span className="auction-bid-history__bidder">
                                  <strong>{bid.bidder}</strong>
                                  <small>{formatBidDate(bid.createdAt)}</small>
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
                          <span>Email address</span>
                          <input
                            type="email"
                            autoComplete="email"
                            required
                            maxLength={254}
                            value={email}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? "bid-email-error" : "bid-contact-note"}
                            placeholder="you@example.com"
                            onChange={(event) => setEmail(event.target.value)}
                          />
                          {errors.email ? <small className="auction-bid-error" id="bid-email-error">{errors.email}</small> : null}
                        </label>
                        <label className="auction-bid-field">
                          <span>Phone number</span>
                          <input
                            type="tel"
                            autoComplete="tel"
                            required
                            value={phone}
                            aria-invalid={Boolean(errors.phone)}
                            aria-describedby={errors.phone ? "bid-phone-error" : "bid-contact-note"}
                            placeholder="(701) 555-0123"
                            onChange={(event) => setPhone(event.target.value)}
                          />
                          {errors.phone ? <small className="auction-bid-error" id="bid-phone-error">{errors.phone}</small> : null}
                        </label>
                      </div>

                      <div className="auction-bid-form__footer">
                        <p id="bid-contact-note">
                          <ShieldCheck aria-hidden="true" />
                          Your email and phone number are kept private and used only to contact you about your bid.
                        </p>
                        <button className="auction-button auction-button--red" type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Saving…" : "Place Bid"} <Gavel aria-hidden="true" />
                        </button>
                      </div>

                      {submitError ? <p className="auction-bid-submit-error" role="alert">{submitError}</p> : null}
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
            ) : null}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
};

export default AuctionBidPage;
