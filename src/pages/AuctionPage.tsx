import { useEffect } from "react";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import heroBackground from "@/assets/auction/auction-hero-background-image.jpg";
import starIcon from "@/assets/auction/auction-star-icon.svg";
import trygveHammerPhoto from "@/assets/auction/auction-trygve-hammer-photo.png";
import vernThompsonPhoto from "@/assets/auction/auction-vern-thompson-photo.png";
import tracyLayneFossPhoto from "@/assets/auction/auction-tracy-layne-foss-photo.png";
import jamieSelzlerPhoto from "@/assets/auction/auction-jamie-selzler-photo.png";
import { AUCTION_CATALOG } from "@/data/auctionCatalog";
import "./AuctionPage.css";

const DONATE_URL = "https://secure.actblue.com/donate/bob-heitkamp";

const guests = [
  {
    name: "Trygve Hammer",
    role: "Candidate for U.S. House of Representatives, North Dakota At-Large",
    photo: trygveHammerPhoto,
  },
  {
    name: "Vern Thompson",
    role: "Candidate for North Dakota Agriculture Commissioner",
    photo: vernThompsonPhoto,
  },
  {
    name: "Tracy Layne Foss",
    role: "Candidate for North Dakota Superintendent of Public Instruction",
    photo: tracyLayneFossPhoto,
  },
  {
    name: "Jamie Selzler",
    role: "North Dakota State Senator, District 44",
    photo: jamieSelzlerPhoto,
  },
];

const formatAuctionValue = (value: number) => `$${value.toLocaleString("en-US")}`;

const toLiveItem = (item: (typeof AUCTION_CATALOG)[number]) => ({
  ...item,
  value: item.valueAmount === null ? undefined : formatAuctionValue(item.valueAmount),
  bid: formatAuctionValue(item.openingBid),
  buyNow: item.reserveAmount === null ? undefined : formatAuctionValue(item.reserveAmount),
});

const featuredItems = AUCTION_CATALOG.filter((item) => item.featured).map(toLiveItem);

const liveItems = AUCTION_CATALOG.filter((item) => item.type === "Live" && !item.featured).map(toLiveItem);

const silentItems = AUCTION_CATALOG.filter((item) => item.type === "Silent").map((item) => ({
  ...item,
  bid: formatAuctionValue(item.openingBid),
  reserve: item.reserveAmount === null ? undefined : formatAuctionValue(item.reserveAmount),
}));

const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <div className={`auction-eyebrow${light ? " auction-eyebrow--light" : ""}`}>
    <span>{children}</span>
    <i aria-hidden="true" />
  </div>
);

const Arrow = () => <span className="auction-arrow" aria-hidden="true">→</span>;

const AuctionItemImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="auction-item-image">
    <img src={src} alt={alt} loading="lazy" />
  </div>
);

const Metric = ({ label, value }: { label: string; value: string }) => (
  <span className="auction-metric">
    <small>{label}</small>
    <strong>{value}</strong>
  </span>
);

const AuctionPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = "Come Hungry. Leave Ready. | Bob Heitkamp Auction";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <>
      <SiteHeader />
      <main className="auction-page">
        <section className="auction-hero" style={{ backgroundImage: `url(${heroBackground})` }}>
          <div className="auction-hero__content">
            <div className="auction-hero__kicker">
              <img src={starIcon} alt="" aria-hidden="true" />
              North Dakota · Dist 25
              <img src={starIcon} alt="" aria-hidden="true" />
            </div>
            <h1>Come Hungry. <em>Leave Ready<br />to Make a Difference.</em></h1>
            <p className="auction-hero__subhead">Join Us for a Fundraiser to Elect Bob Heitkamp to the North Dakota State Senate</p>

            <div className="auction-hero__event" aria-label="Event details">
              <div className="auction-hero__date">
                <strong>THURSDAY, SEPTEMBER 17 | 5–7 PM</strong>
                <span>Live auction begins at 6:30 PM</span>
              </div>
              <div className="auction-hero__venue">
                <strong>Mantador VFW Post #9317</strong>
                <span>301 Main Street, Mantador, ND 58058</span>
              </div>
            </div>

            <p className="auction-hero__description">
              Enjoy Bob&apos;s pulled pork, brats, tacos in a bag, and special deals on refreshments all while helping elect a proven local leader to represent all of us in Bismarck.
            </p>
            <p className="auction-hero__details">Food · Special Guests · Live &amp; Silent Auctions</p>
            <a className="auction-button auction-button--red" href={DONATE_URL}>Support Bob&apos;s Campaign <Arrow /></a>
          </div>
        </section>

        <section className="auction-section auction-meet">
          <div className="auction-container">
            <Eyebrow>Meet Bob</Eyebrow>
            <h2>Your Neighbor. <em>Your Voice in<br className="auction-desktop-break" /> Bismarck.</em></h2>
            <div className="auction-meet__grid">
              <div className="auction-copy">
                <p>District 25 is full of promise: dedicated families, hardworking farmers, small businesses creating opportunity, and young people with big dreams.</p>
                <p>Bob Heitkamp is a lifelong North Dakotan who started his first business at sixteen. He has created jobs, worked in local industries, and served his community as a volunteer firefighter, church leader, and education advocate.</p>
                <p>Now he is ready to bring that experience, work ethic, and commitment to the North Dakota State Senate.</p>
              </div>
              <aside className="auction-meet__card">
                <h3>Bob will work to:</h3>
                <ul>
                  <li>Grow local jobs and strengthen small businesses</li>
                  <li>Stand strong for agriculture and family farms</li>
                  <li>Protect rural health care and essential services</li>
                  <li>Invest in roads, infrastructure, and emergency response</li>
                  <li>Help seniors remain in the communities they built</li>
                  <li>Create real opportunity for the next generation</li>
                </ul>
              </aside>
            </div>
            <div className="auction-meet__signoff">
              <p>Proven Experience. Local Leadership. Forward Together.</p>
              <a href="/#about">Meet Bob</a>
            </div>
          </div>
        </section>

        <section className="auction-section auction-guests">
          <div className="auction-container">
            <Eyebrow light>Special Guests</Eyebrow>
            <h2>Special <em>Guests</em></h2>
            <p className="auction-section__intro">Join candidates and elected leaders working to build a stronger North Dakota.</p>
            <div className="auction-guests__grid">
              {guests.map((guest) => (
                <article className="auction-guest" key={guest.name}>
                  <img src={guest.photo} alt={guest.name} />
                  <div className="auction-guest__content">
                    <h3>{guest.name}</h3>
                    <p>{guest.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="auction-section auction-live" id="live-auction">
          <div className="auction-container">
            <Eyebrow>Live Auction</Eyebrow>
            <h2>Bid Big <em>for Bob!</em></h2>
            <p className="auction-section__micro">Live auction begins at 6:30 PM</p>
            <p className="auction-section__intro auction-section__intro--dark">Every winning bid helps Bob reach voters, organize supporters, and run a strong campaign for the North Dakota State Senate.</p>

            <div className="auction-featured-list">
              {featuredItems.map((item) => (
                <a className="auction-featured auction-item-link" href={`/auction/bid?item=${item.id}`} key={item.title}>
                  <AuctionItemImage src={item.image} alt={item.title} />
                  <div className="auction-featured__content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="auction-metrics">
                      {item.value ? <Metric label="Value" value={item.value} /> : null}
                      <Metric label="Opening Bid" value={item.bid} />
                      {item.buyNow ? <Metric label="Reserve" value={item.buyNow} /> : null}
                    </div>
                    <span className="auction-availability">Available online and during the live auction</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="auction-live__grid">
              {liveItems.map((item) => (
                <a className="auction-live-card auction-item-link" href={`/auction/bid?item=${item.id}`} key={item.title}>
                  <AuctionItemImage src={item.image} alt={item.title} />
                  <div className="auction-live-card__content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="auction-metrics">
                      {item.value ? <Metric label="Value" value={item.value} /> : null}
                      <Metric label="Opening Bid" value={item.bid} />
                      {item.buyNow ? <Metric label="Reserve" value={item.buyNow} /> : null}
                    </div>
                  </div>
                </a>
              ))}
            </div>
            <a className="auction-button auction-button--outline-red" href="/auction/bid">Preview Items &amp; Bid Online <Arrow /></a>
          </div>
        </section>

        <section className="auction-section auction-silent" id="silent-auction">
          <div className="auction-container">
            <Eyebrow>Silent Auction</Eyebrow>
            <h2>Silent Auction <em>Favorites</em></h2>
            <p className="auction-section__micro">Find something you love. Place your bid. Support Bob.</p>
            <p className="auction-section__intro auction-section__intro--dark">Bid throughout the evening on tools, equipment, gifts, and fun finds. Items are shown in order of value. Online bids can be made up to 12 noon Sept. 17, 2026.</p>

            <div className="auction-silent__grid">
              {silentItems.map((item) => (
                <a className="auction-silent-card auction-item-link" href={`/auction/bid?item=${item.id}`} key={item.title}>
                  <AuctionItemImage src={item.image} alt={item.title} />
                  <div className="auction-silent-card__content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="auction-metrics">
                      <Metric label="Minimum bid" value={item.bid} />
                      {item.reserve ? <Metric label="Reserve" value={item.reserve} /> : null}
                    </div>
                    <span className="auction-availability">Silent Auction or place an online bid ›</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="auction-extras" id="event-support">
          <div className="auction-container auction-extras__grid">
            <div>
              <h3>Everybody Wins with Bob</h3>
              <a href={DONATE_URL} target="_blank" rel="noopener noreferrer">
                <span>Grab Bags — <em>$25 Each</em></span>
                <p>Choose a bag and take home a surprise while supporting Bob&apos;s campaign.</p>
              </a>
            </div>
            <div>
              <h3>Show Your Support</h3>
              <a href={DONATE_URL} target="_blank" rel="noopener noreferrer">
                <span>Bob Heitkamp T-Shirts — <em>$25</em></span>
                <p>Wear your support for Bob throughout the campaign.</p>
              </a>
              <a href={DONATE_URL} target="_blank" rel="noopener noreferrer">
                <span>Bob Heitkamp Lawn Signs — <em>$10</em></span>
                <p>Help spread the word in your neighborhood and community.</p>
              </a>
            </div>
          </div>
        </section>

        <section className="auction-cta">
          <div className="auction-cta__content">
            <span>Let&apos;s Send Bob to Bismarck</span>
            <h2>Let&apos;s Send Bob to <em>Bismarck</em></h2>
            <p>Join your friends and neighbors for an evening dedicated to creating a stronger future for North Dakota.</p>
            <div className="auction-cta__rule" />
            <strong>Thursday, September 17 | 5–7 PM</strong>
            <strong>Live auction begins at 6:30 PM</strong>
            <address>Mantador VFW Post #9317<br />301 Main Street, Mantador, ND 58058</address>
            <div className="auction-cta__rule auction-cta__rule--short" />
            <a className="auction-button auction-button--gold" href={DONATE_URL} target="_blank" rel="noopener noreferrer">Donate <strong>★</strong></a>
            <em className="auction-cta__hashtag">votebob26.com</em>
            <small>Vote Bob Heitkamp for North Dakota Senate District 25 on November 3rd.</small>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
};

export default AuctionPage;
