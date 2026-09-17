import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpDown,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Gavel,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  Mail,
  Phone,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import logo from "@/assets/logo.png";
import {
  checkAdminSession,
  loadAdminAuction,
  loginAdmin,
  logoutAdmin,
  type AdminAuctionItem,
} from "@/lib/adminAuctionApi";
import "./AdminPage.css";

type AuthStatus = "checking" | "signed-out" | "signed-in";
type AuctionFilter = "All" | "Live" | "Silent";
type AuctionSort = "bid-newest" | "bid-oldest" | "alphabetical" | "value-high" | "value-low";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const dateTime = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Chicago",
});

const formatCurrency = (amount: number) => currency.format(amount);

const LoginScreen = ({ onSuccess }: { onSuccess: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await loginAdmin(email, password);
      onSuccess();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="admin-login">
      <section className="admin-login__card" aria-labelledby="admin-login-title">
        <a href="/" className="admin-login__logo" aria-label="Bob Heitkamp home">
          <img src={logo} alt="Bob Heitkamp for Senate" />
        </a>
        <div className="admin-login__icon"><LockKeyhole aria-hidden="true" /></div>
        <span className="admin-kicker">Authorized access only</span>
        <h1 id="admin-login-title">Auction Admin</h1>
        <p>Sign in to review auction items and complete bid activity.</p>

        <form onSubmit={submit} className="admin-login__form">
          <label htmlFor="admin-email">Email address</label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error ? <div className="admin-login__error" role="alert">{error}</div> : null}
          <button type="submit" disabled={submitting}>
            {submitting ? <LoaderCircle className="admin-spin" aria-hidden="true" /> : <ShieldCheck aria-hidden="true" />}
            {submitting ? "Signing in…" : "Sign in securely"}
          </button>
        </form>
        <a href="/auction" className="admin-login__back">← Return to auction</a>
      </section>
    </main>
  );
};

const StatCard = ({ icon, label, value }: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <article className="admin-stat">
    <span className="admin-stat__icon">{icon}</span>
    <div><small>{label}</small><strong>{value}</strong></div>
  </article>
);

const AuctionItemCard = ({ item }: { item: AdminAuctionItem }) => {
  const latestBid = item.bids.at(-1);
  const descendingBidProgression = item.bids
    .map((bid, index) => ({
      bid,
      step: index + 1,
      increase: bid.amount - (index === 0 ? item.openingBid : item.bids[index - 1].amount),
    }))
    .reverse();

  return (
    <details className="admin-item">
      <summary>
        <img src={item.image} alt="" />
        <div className="admin-item__identity">
          <span className={`admin-type admin-type--${item.type.toLowerCase()}`}>{item.type}</span>
          <h2>{item.title}</h2>
          <p>{item.bids.length === 1 ? "1 bid" : `${item.bids.length} bids`}</p>
          <span className={`admin-item__mobile-value${latestBid ? "" : " admin-item__mobile-value--empty"}`}>
            {latestBid ? `Current bid ${formatCurrency(latestBid.amount)}` : "No bids yet"}
          </span>
        </div>
        <div className="admin-item__metric">
          <small>{latestBid ? "Current bid" : "Opening bid"}</small>
          <strong>{formatCurrency(latestBid?.amount ?? item.openingBid)}</strong>
        </div>
        <div className="admin-item__metric admin-item__metric--bidder">
          <small>Leading bidder</small>
          <strong className={latestBid ? undefined : "admin-item__no-bids"}>
            {latestBid?.bidder ?? "No bids yet"}
          </strong>
        </div>
        <ChevronDown className="admin-item__chevron" aria-hidden="true" />
      </summary>

      <div className="admin-item__details">
        <div className="admin-item__facts">
          <span><small>Opening bid</small><strong>{formatCurrency(item.openingBid)}</strong></span>
          <span><small>Next minimum</small><strong>{formatCurrency(item.minimumBid)}</strong></span>
          <span><small>Reserve</small><strong>{item.reserveAmount === null ? "None" : formatCurrency(item.reserveAmount)}</strong></span>
          <span><small>Item value</small><strong>{item.valueAmount === null ? "Not listed" : formatCurrency(item.valueAmount)}</strong></span>
        </div>

        <div className="admin-progression__heading">
          <div>
            <span className="admin-kicker">Bid progression</span>
            <h3>Complete activity</h3>
          </div>
          <span>Newest to oldest</span>
        </div>

        {item.bids.length === 0 ? (
          <div className="admin-empty-bids">
            <Gavel aria-hidden="true" />
            <strong>No bids placed</strong>
            <span>This item will appear here as soon as its first bid is received.</span>
          </div>
        ) : (
          <div className="admin-bids-table-wrap">
            <table className="admin-bids-table">
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Bidder</th>
                  <th>Contact</th>
                  <th>Date &amp; time</th>
                  <th>Increase</th>
                  <th>Bid amount</th>
                </tr>
              </thead>
              <tbody>
                {descendingBidProgression.map(({ bid, step, increase }) => {
                  return (
                    <tr key={bid.id}>
                      <td data-label="Step"><span className="admin-step">{step}</span></td>
                      <td data-label="Bidder"><strong>{bid.bidder}</strong><small>Bid #{bid.id}</small></td>
                      <td data-label="Contact">
                        <a href={`mailto:${bid.email}`}><Mail aria-hidden="true" />{bid.email}</a>
                        <a href={`tel:${bid.phone}`}><Phone aria-hidden="true" />{bid.phone}</a>
                      </td>
                      <td data-label="Date & time"><time dateTime={bid.createdAt}>{dateTime.format(new Date(bid.createdAt))}</time><small>Central Time</small></td>
                      <td data-label="Increase" className={increase > 0 ? "admin-increase" : undefined}>{increase > 0 ? `+${formatCurrency(increase)}` : "—"}</td>
                      <td data-label="Bid amount"><strong className="admin-bid-amount">{formatCurrency(bid.amount)}</strong></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </details>
  );
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [items, setItems] = useState<AdminAuctionItem[]>([]);
  const [filter, setFilter] = useState<AuctionFilter>("All");
  const [sort, setSort] = useState<AuctionSort>("bid-newest");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const refreshInFlight = useRef(false);

  const refresh = async (initial = false) => {
    if (refreshInFlight.current) return;
    refreshInFlight.current = true;
    if (initial) setLoading(true);
    try {
      const snapshot = await loadAdminAuction();
      setItems(snapshot.items);
      setUpdatedAt(new Date());
      setError("");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load auction data.");
    } finally {
      setLoading(false);
      refreshInFlight.current = false;
    }
  };

  useEffect(() => {
    void refresh(true);
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void refresh();
    }, 1_000);
    return () => window.clearInterval(interval);
  }, []);

  const allBids = useMemo(() => items.flatMap((item) => item.bids), [items]);
  const totalCurrent = useMemo(
    () => items.reduce((sum, item) => sum + (item.bids.at(-1)?.amount ?? 0), 0),
    [items],
  );
  const uniqueBidders = useMemo(
    () => new Set(allBids.map((bid) => bid.email.toLowerCase())).size,
    [allBids],
  );
  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    const matchingItems = items.filter((item) => {
      const matchesType = filter === "All" || item.type === filter;
      const matchesQuery = !query
        || item.title.toLowerCase().includes(query)
        || item.bids.some((bid) => `${bid.bidder} ${bid.email} ${bid.phone}`.toLowerCase().includes(query));
      return matchesType && matchesQuery;
    });

    const latestBidTime = (item: AdminAuctionItem) => {
      if (item.bids.length === 0) return null;
      return Math.max(...item.bids.map((bid) => new Date(bid.createdAt).getTime()));
    };
    const currentValue = (item: AdminAuctionItem) => item.bids.at(-1)?.amount ?? item.openingBid;

    return matchingItems.sort((left, right) => {
      if (sort === "alphabetical") return left.title.localeCompare(right.title, "en");
      if (sort === "value-high") return currentValue(right) - currentValue(left);
      if (sort === "value-low") return currentValue(left) - currentValue(right);

      const leftTime = latestBidTime(left);
      const rightTime = latestBidTime(right);
      if (leftTime === null && rightTime === null) return left.title.localeCompare(right.title, "en");
      if (leftTime === null) return 1;
      if (rightTime === null) return -1;
      return sort === "bid-newest" ? rightTime - leftTime : leftTime - rightTime;
    });
  }, [filter, items, search, sort]);

  return (
    <main className="admin-dashboard">
      <header className="admin-header">
        <a href="/" aria-label="Bob Heitkamp home"><img src={logo} alt="Bob Heitkamp for Senate" /></a>
        <div>
          <ShieldCheck aria-hidden="true" />
          <span><small>Secure workspace</small><strong>Auction Admin</strong></span>
        </div>
        <button type="button" onClick={onLogout}><LogOut aria-hidden="true" /> Sign out</button>
      </header>

      <div className="admin-content">
        <section className="admin-titlebar">
          <div>
            <h1>Auction overview</h1>
          </div>
        </section>

        <section className="admin-stats" aria-label="Auction totals">
          <StatCard icon={<Gavel />} label="Auction items" value={String(items.length)} />
          <StatCard icon={<TrendingUp />} label="Total bids" value={String(allBids.length)} />
          <StatCard icon={<Users />} label="Unique bidders" value={String(uniqueBidders)} />
          <StatCard icon={<CircleDollarSign />} label="Current bid total" value={formatCurrency(totalCurrent)} />
        </section>

        <section className="admin-controls" aria-label="Filter auction items">
          <div className="admin-filters">
            {(["All", "Live", "Silent"] as AuctionFilter[]).map((value) => {
              const count = value === "All" ? items.length : items.filter((item) => item.type === value).length;
              return (
                <button
                  type="button"
                  className={filter === value ? "active" : ""}
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                  key={value}
                >
                  {value} <span>{count}</span>
                </button>
              );
            })}
          </div>
          <div className="admin-control-actions">
            <label className="admin-sort">
              <ArrowUpDown aria-hidden="true" />
              <span className="sr-only">Sort auction items</span>
              <select value={sort} onChange={(event) => setSort(event.target.value as AuctionSort)}>
                <option value="bid-newest">Newest bid first</option>
                <option value="bid-oldest">Oldest bid first</option>
                <option value="alphabetical">Alphabetical A–Z</option>
                <option value="value-high">Bid value: high to low</option>
                <option value="value-low">Bid value: low to high</option>
              </select>
            </label>
            <label className="admin-search">
              <Search aria-hidden="true" />
              <span className="sr-only">Search items or bidders</span>
              <input
                type="search"
                placeholder="Search item, bidder, email or phone"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
          </div>
        </section>

        <div className="admin-sync-status">
          <span>{filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}</span>
          {updatedAt ? (
            <span className="admin-sync-status__updated">
              <Clock3 aria-hidden="true" />
              Updated {updatedAt.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          ) : null}
        </div>

        {loading ? (
          <div className="admin-state"><LoaderCircle className="admin-spin" aria-hidden="true" /><strong>Loading auction data…</strong></div>
        ) : error ? (
          <div className="admin-state admin-state--error" role="alert"><strong>{error}</strong><button type="button" onClick={() => void refresh()}>Try again</button></div>
        ) : filteredItems.length === 0 ? (
          <div className="admin-state"><Search aria-hidden="true" /><strong>No matching items found.</strong></div>
        ) : (
          <section className="admin-items" aria-label="Auction items">
            {filteredItems.map((item) => <AuctionItemCard item={item} key={item.id} />)}
          </section>
        )}
      </div>
    </main>
  );
};

const AdminPage = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");

  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = "Auction Admin | Bob Heitkamp";
    void checkAdminSession()
      .then((authenticated) => setAuthStatus(authenticated ? "signed-in" : "signed-out"))
      .catch(() => setAuthStatus("signed-out"));
    return () => { document.title = previousTitle; };
  }, []);

  const signOut = async () => {
    try {
      await logoutAdmin();
    } finally {
      setAuthStatus("signed-out");
    }
  };

  if (authStatus === "checking") {
    return <main className="admin-boot"><LoaderCircle className="admin-spin" aria-hidden="true" /><span>Checking secure session…</span></main>;
  }
  if (authStatus === "signed-out") {
    return <LoginScreen onSuccess={() => setAuthStatus("signed-in")} />;
  }
  return <AdminDashboard onLogout={() => void signOut()} />;
};

export default AdminPage;
