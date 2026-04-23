import { Link } from "react-router-dom";
import logoImg from "@/assets/logo.png";
import mediaPressImg from "@/assets/media-press.png";
import mediaImagesImg from "@/assets/media-images.png";
import mediaLogosImg from "@/assets/media-logos.png";
import mediaBioImg from "@/assets/section-bio.png";
import mediaPlatformImg from "@/assets/section-platform.png";
import videoThumbImg from "@/assets/section-video.png";

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
.download:hover{color:#a51a27;gap:14px}
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
`;

type Item = {
  title: string;
  desc: string;
  img?: string;
  isVideo?: boolean;
};

const PRESS_RELEASES: Item[] = [
  {
    title: "Press Releases",
    desc: "Official announcements and statements from the campaign.",
    img: mediaPressImg,
  },
];


const BOB_PHOTOS: Item[] = Array.from({ length: 8 }).map((_, i) => ({
  title: `Bob Heitkamp Photo ${i + 1}`,
  desc: "Approved photos for media use and supporters.",
  img: mediaImagesImg,
}));

const VIDEOS: Item[] = [
  { title: "Video 1", desc: "Speeches, ads, and trail moments from across the district.", img: videoThumbImg, isVideo: true },
  { title: "Video 2", desc: "Speeches, ads, and trail moments from across the district.", img: videoThumbImg, isVideo: true },
];

const LOGOS: Item[] = [
  { title: "Logo", desc: "Campaign logo for press, partners, and supporters.", img: mediaLogosImg },
  { title: "Icon", desc: "Square icon mark for avatars and small placements.", img: mediaLogosImg },
  { title: "Yard Sign", desc: "Approved yard sign artwork in print-ready format.", img: mediaLogosImg },
];

const BIO: Item[] = [
  { title: "Bob Heitkamp Bio", desc: "Bob's full biography for press and event organizers.", img: mediaBioImg },
];

const PLATFORM: Item[] = [
  { title: "Campaign Platform", desc: "The full platform document outlining priorities for District 25.", img: mediaPlatformImg },
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
    <button type="button" className="download" onClick={() => window.alert(`Download: ${item.title}`)}>
      Download <DownloadIcon />
    </button>
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

const PressResources = () => {
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
        </div>
      </section>
    </>
  );
};

export default PressResources;
