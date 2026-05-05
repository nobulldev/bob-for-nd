import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo.png";
import mediaPressImg from "@/assets/media-press.png";
import mediaLogosImg from "@/assets/media-logos.png";
import mediaBioImg from "@/assets/section-bio.png";
import mediaPlatformImg from "@/assets/section-platform.png";
import videoThumbImg from "@/assets/section-video.png";
import bobPhoto01 from "@/assets/bob-photo-01.png";
import bobPhoto02 from "@/assets/bob-photo-02.png";
import bobPhoto03 from "@/assets/bob-photo-03.png";
import bobPhoto04 from "@/assets/bob-photo-04.png";
import bobPhoto06 from "@/assets/bob-photo-06.png";
import bobPhoto07 from "@/assets/bob-photo-07.png";
import bobPhoto08 from "@/assets/bob-photo-08.png";
import bobPhoto10 from "@/assets/bob-photo-10.png";
import pressPhoto09 from "@/assets/09.png";
import pressPhoto10 from "@/assets/10.png";
import pressPhoto11 from "@/assets/11.png";
import assetLogo from "@/assets/asset-logo.png";
import assetYardSign from "@/assets/asset-yard-sign.png";

const STYLES = `
:root{
  --navy:#031f51;
  --red:#bf1e2e;
  --cream:#f5efe4;
  --cream-2:#faf5ea;
  --cream-3:#efe6d3;
  --gold:#fed648;
  --ink:#1c1c1c;
  --muted:#6b6357;
  --placeholder:#d4d4d4;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  font-family:'Inter',system-ui,sans-serif;
  background:var(--cream);
  color:var(--ink);
  font-size:17px;line-height:1.65;
  -webkit-font-smoothing:antialiased;
}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}

.nav{
  position:sticky;top:0;z-index:50;
  background:var(--navy);
  border-bottom:1px solid rgba(254,214,72,.18);
}
.nav .wrap{
  max-width:1440px;margin:0 auto;
  padding:14px 36px;
  display:flex;align-items:center;justify-content:space-between;gap:24px;
}
.brand{display:flex;align-items:center;gap:12px}
.brand img.brand-logo{height:54px;width:auto;display:block}
.back-link{
  font-family:'Oswald',sans-serif;text-transform:uppercase;
  font-size:13px;letter-spacing:.18em;color:var(--cream);
  display:inline-flex;align-items:center;gap:10px;
  padding:10px 18px;border:1.5px solid rgba(254,214,72,.4);
  border-radius:2px;transition:background .2s,color .2s,border-color .2s;
}
.back-link:hover{background:var(--gold);color:var(--navy);border-color:var(--gold)}

section.page{padding:80px 36px 110px}
.container{max-width:1440px;margin:0 auto}
.section-eyebrow{
  font-family:'Oswald',sans-serif;text-transform:uppercase;
  color:var(--red);font-size:12.5px;letter-spacing:.3em;
  display:inline-flex;align-items:center;gap:12px;
}
.section-eyebrow .dash{width:30px;height:2px;background:var(--red)}
.page-title{
  font-family:'Playfair Display',serif;font-weight:800;color:var(--navy);
  font-size:clamp(34px,4.2vw,52px);line-height:1.05;letter-spacing:-.005em;
  margin:18px 0 0;max-width:880px;
}
.page-title em{font-style:italic;color:var(--red);font-weight:800}
.page-sub{margin-top:14px;color:var(--muted);max-width:680px}

.group{margin-top:64px}
.group-head{
  display:flex;align-items:end;justify-content:space-between;gap:24px;flex-wrap:wrap;
  border-bottom:1px solid rgba(10,34,64,.15);padding-bottom:14px;margin-bottom:32px;
}
.group-title{
  font-family:'Playfair Display',serif;font-weight:800;color:var(--navy);
  font-size:30px;line-height:1.1;
}
.group-title em{font-style:italic;color:var(--red)}
.group-count{
  font-family:'Oswald',sans-serif;text-transform:uppercase;
  font-size:11.5px;letter-spacing:.22em;color:var(--muted);
}

.media-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px}

.media-card{
  background:var(--cream-2);border:1px solid rgba(10,34,64,.1);
  padding:20px;display:flex;flex-direction:column;gap:14px;
  transition:transform .2s,box-shadow .2s,border-color .2s;
}
.media-card:hover{transform:translateY(-4px);box-shadow:0 20px 40px -24px rgba(10,34,64,.25);border-color:transparent}
.media-card .ph{
  aspect-ratio:1/1;background:var(--placeholder);overflow:hidden;
  display:flex;align-items:center;justify-content:center;
}
.media-card .ph img{width:100%;height:100%;object-fit:cover;display:block}
.media-card .ph.video{position:relative}
.media-card .ph.video::after{
  content:"▶";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
  color:#fff;font-size:42px;text-shadow:0 4px 14px rgba(0,0,0,.5);
  background:rgba(3,31,81,.25);
}
.media-card h5{
  font-family:'Playfair Display',serif;font-weight:800;color:var(--navy);font-size:19px;line-height:1.25;
}
.media-card p{color:var(--muted);font-size:14px;line-height:1.55;flex:1}
.download{
  margin-top:4px;
  font-family:'Oswald',sans-serif;text-transform:uppercase;
  font-size:12px;letter-spacing:.22em;
  color:var(--red);background:transparent;
  padding:6px 0;border:0;cursor:pointer;
  display:inline-flex;align-items:center;gap:10px;align-self:flex-start;
  transition:gap .2s,color .2s;
}
.download:hover{color:#a51a27}
.download svg{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2}

@media (max-width:1100px){
  .media-grid{grid-template-columns:repeat(3,1fr)}
}
@media (max-width:720px){
  section.page{padding:60px 20px 80px}
  .media-grid{grid-template-columns:repeat(2,1fr);gap:16px}
  .nav .wrap{padding:12px 20px}
  .brand img.brand-logo{height:44px}
}
@media (max-width:480px){
  .media-grid{grid-template-columns:1fr}
}

/* ---------- Back-home CTA ---------- */
.back-home-wrap{
  margin-top:80px;display:flex;justify-content:center;
}
.back-home{
  font-family:'Oswald',sans-serif;text-transform:uppercase;
  font-size:13px;letter-spacing:.22em;
  color:var(--cream);background:var(--navy);
  padding:16px 32px;border:0;cursor:pointer;
  display:inline-flex;align-items:center;gap:12px;
  transition:background .2s,transform .2s;
}
.back-home:hover{background:var(--red);transform:translateY(-2px)}

/* ---------- Footer ---------- */
footer.pr-footer{background:var(--navy);color:var(--cream);padding:72px 28px 28px;margin-top:40px}
.foot-grid{
  max-width:1280px;margin:0 auto;
  display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:46px;
}
.foot-brand .foot-logo{height:72px;width:auto;display:block;margin-bottom:18px}
.foot-brand h4{font-family:'Playfair Display',serif;font-weight:800;font-size:24px;color:var(--cream)}
.foot-brand p{
  margin-top:10px;font-family:'Oswald',sans-serif;text-transform:uppercase;
  font-size:12px;letter-spacing:.22em;color:var(--gold);
}
.foot-col h5{
  font-family:'Oswald',sans-serif;text-transform:uppercase;font-size:12px;
  letter-spacing:.24em;color:var(--gold);margin-bottom:18px;
}
.foot-col ul{list-style:none;display:flex;flex-direction:column;gap:10px}
.foot-col a{color:rgba(245,239,228,.78);font-size:14.5px;transition:color .2s}
.foot-col a:hover{color:var(--cream)}
.foot-bottom{
  max-width:1440px;margin:54px auto 0;padding-top:24px;
  border-top:1px solid rgba(245,239,228,.15);
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;
  font-size:12.5px;color:rgba(245,239,228,.6);
  font-family:'Oswald',sans-serif;letter-spacing:.18em;text-transform:uppercase;
}
@media (max-width:900px){
  .foot-grid{grid-template-columns:1fr 1fr;gap:36px}
}
@media (max-width:520px){
  .foot-grid{grid-template-columns:1fr}
}

/* ---------- Scroll-to-top ---------- */
.scroll-top{
  position:fixed;right:28px;bottom:28px;z-index:60;
  width:52px;height:52px;border-radius:50%;
  background:var(--red);color:var(--cream);border:0;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 14px 30px -8px rgba(0,0,0,.35);
  opacity:0;pointer-events:none;transform:translateY(10px);
  transition:opacity .25s,transform .25s,background .2s;
}
.scroll-top.show{opacity:1;pointer-events:auto;transform:translateY(0)}
.scroll-top:hover{background:#a51a27}
.scroll-top svg{width:20px;height:20px;stroke:currentColor;fill:none;stroke-width:2.5}
@media (max-width:720px){
  .scroll-top{right:18px;bottom:18px;width:46px;height:46px}
}
`;

type Item = {
  title: string;
  desc: string;
  img?: string;
  isVideo?: boolean;
  href?: string;
  download?: boolean;
};

const PRESS_RELEASES: Item[] = [
  {
    title: "Press Releases",
    desc: "Official announcements and statements from the campaign.",
    img: mediaPressImg,
    href: "https://votebob26.com/assets/presskit/release.pdf",
  },
];


const BOB_PHOTO_IMAGES = [
  bobPhoto01,
  bobPhoto02,
  bobPhoto03,
  bobPhoto04,
  bobPhoto06,
  bobPhoto07,
  bobPhoto08,
  bobPhoto10,
  pressPhoto09,
  pressPhoto10,
  pressPhoto11,
];

const BOB_PHOTOS: Item[] = BOB_PHOTO_IMAGES.map((img, i) => ({
  title: `Bob Heitkamp Photo ${i + 1}`,
  desc: "Approved photos for media use and supporters.",
  img,
  href: `https://votebob26.com/assets/presskit/images/${String(i + 1).padStart(2, "0")}.png`,
  download: true,
}));

const VIDEOS: Item[] = [
  { title: "Video 1", desc: "Speeches, ads, and trail moments from across the district.", img: videoThumbImg, isVideo: true },
  { title: "Video 2", desc: "Speeches, ads, and trail moments from across the district.", img: videoThumbImg, isVideo: true },
];

const LOGOS: Item[] = [
  { title: "Logo", desc: "Campaign logo for press, partners, and supporters.", img: assetLogo },
  { title: "Pin", desc: "Round icon mark for avatars and small placements.", img: mediaLogosImg },
  { title: "Yard Sign", desc: "Approved yard sign artwork in print-ready format.", img: assetYardSign },
];

const BIO: Item[] = [
  { title: "Bob Heitkamp Bio", desc: "Bob's full biography for press and event organizers.", img: mediaBioImg, href: "https://votebob26.com/assets/presskit/bio.pdf" },
];

const PLATFORM: Item[] = [
  { title: "Campaign Platform", desc: "The full platform document outlining priorities for District 25.", img: mediaPlatformImg, href: "https://votebob26.com/assets/presskit/platform.pdf" },
];

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 4v12m0 0l-5-5m5 5l5-5M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Card = ({ item }: { item: Item }) => (
  <article className="media-card">
    <div className={`ph${item.isVideo ? " video" : ""}`}>
      {item.img ? <img src={item.img} alt={item.title} loading="lazy" /> : null}
    </div>
    <h5>{item.title}</h5>
    <p>{item.desc}</p>
    {item.href ? (
      <a href={item.href} {...(item.download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })} className="download">
        Download <DownloadIcon />
      </a>
    ) : (
      <button type="button" className="download" onClick={() => window.alert(`Download: ${item.title}`)}>
        Download <DownloadIcon />
      </button>
    )}
  </article>
);

const Group = ({
  title,
  emTitle,
  items,
}: {
  title: string;
  emTitle?: string;
  items: Item[];
}) => (
  <div className="group">
    <div className="group-head">
      <h3 className="group-title">
        {title}
        {emTitle ? <em> {emTitle}</em> : null}
      </h3>
      <span className="group-count">{items.length} item{items.length === 1 ? "" : "s"}</span>
    </div>
    <div className="media-grid">
      {items.map((it) => (
        <Card key={it.title} item={it} />
      ))}
    </div>
  </div>
);

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61576634976767",
  instagram: "https://www.instagram.com/votebob26/",
  youtube: "https://www.youtube.com/channel/UCbAtqwDwr7iK8L3yU3Nst0Q",
};

const PressResources = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{STYLES}</style>
      <header className="nav">
        <div className="wrap">
          <Link to="/" className="brand" aria-label="Bob Heitkamp for Senate — Home">
            <img className="brand-logo" src={logoImg} alt="Bob Heitkamp for Senate" />
          </Link>
          <Link to="/#media" className="back-link">
            ← Back to site
          </Link>
        </div>
      </header>

      <section className="page">
        <div className="container">
          <span className="section-eyebrow">
            <span className="dash" /> Media Library
          </span>
          <h1 className="page-title">
            Press, Photos &amp; <em>Resources</em>
          </h1>
          <p className="page-sub">
            Download official campaign materials — press releases, photos, videos, logos, and platform documents.
          </p>

          <Group title="Press" emTitle="Releases" items={PRESS_RELEASES} />
          <Group title="Bob Heitkamp" emTitle="Photos" items={BOB_PHOTOS} />
          <Group title="Videos" items={VIDEOS} />
          <Group title="Logos &" emTitle="Brand Assets" items={LOGOS} />
          <Group title="Bio" items={BIO} />
          <Group title="Platform" items={PLATFORM} />

          <div className="back-home-wrap">
            <Link to="/" className="back-home">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      <footer className="pr-footer">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src={logoImg} alt="Bob Heitkamp for Senate" className="foot-logo" />
            <h4>Bob Heitkamp</h4>
            <p>Proven Experience · Local Leadership · Forward Together</p>
          </div>
          <div className="foot-col">
            <h5>Campaign</h5>
            <ul>
              <li><Link to="/#about">About Bob</Link></li>
              <li><Link to="/#issues">Issues</Link></li>
              <li><Link to="/#priorities">Priorities</Link></li>
              <li><Link to="/#action">Take Action</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Resources</h5>
            <ul>
              <li><Link to="/press">Press Releases</Link></li>
              <li><Link to="/press">Images & Logos</Link></li>
              <li><Link to="/press">Bio</Link></li>
              <li><Link to="/press">Platform</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Follow</h5>
            <ul>
              <li><a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>Paid for by Bob Heitkamp for North Dakota Senate District 25. Julie Prochnow - Treasurer</span>
          <span>© {new Date().getFullYear()} Bob Heitkamp for Senate</span>
        </div>
      </footer>

      <button
        type="button"
        className={`scroll-top${showTop ? " show" : ""}`}
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 19V5m0 0l-7 7m7-7l7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
};

export default PressResources;
