import heroBg from "@/assets/hero-bg.png";
import heroOverlay from "@/assets/hero-overlay.png";

export const SITE_STYLES = `
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
  --placeholder-ink:#7a7a7a;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
html,body{margin:0;padding:0;background:var(--navy)}
#root{margin:0;padding:0;min-height:100vh;background:var(--cream)}
body{
  font-family:'Inter',system-ui,sans-serif;
  background:var(--cream);
  color:var(--ink);
  font-size:17px;
  line-height:1.65;
  -webkit-font-smoothing:antialiased;
}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}

/* ---------- Nav ---------- */
.nav{
  position:sticky;top:0;z-index:50;
  background:var(--navy);
  transition:box-shadow .25s ease, background .25s ease;
  border-bottom:1px solid rgba(254,214,72,.18);
}
.nav.scrolled{ box-shadow:0 6px 22px rgba(0,0,0,.35); }
.nav .wrap{
  max-width:1600px;margin:0 auto;
  padding:14px 28px;
  display:flex;align-items:center;justify-content:space-between;gap:24px;
}
.brand{display:flex;align-items:center;gap:12px}
.brand img.brand-logo{ height:54px;width:auto;display:block; }
.menu{display:flex;align-items:center;gap:6px}
.menu a{
  font-family:'Oswald',sans-serif;text-transform:uppercase;
  font-size:13px;letter-spacing:.18em;color:var(--cream);
  padding:10px 14px;position:relative;transition:color .2s;
}
.menu a::after{
  content:"";position:absolute;left:14px;right:14px;bottom:4px;
  height:2px;background:var(--gold);transform:scaleX(0);transform-origin:left;
  transition:transform .25s ease;
}
.menu a:hover, .menu a.active{color:var(--gold)}
.menu a:hover::after, .menu a.active::after{transform:scaleX(1)}
.menu .donate-btn{
  margin-left:10px;background:var(--red);color:var(--cream);
  padding:11px 20px;border-radius:2px;letter-spacing:.18em;
  transition:background .2s, transform .2s;
}
.menu .donate-btn::after{display:none}
.menu .donate-btn:hover{background:var(--gold);color:var(--navy)}
.hamburger{
  display:none;background:transparent;border:0;cursor:pointer;
  width:42px;height:42px;color:var(--cream);
}
.hamburger svg{width:26px;height:26px}

/* ---------- Hero (Home only) ---------- */
.hero{
  position:relative;min-height:100vh;width:100%;overflow:hidden;
  background:#031f51;isolation:isolate;
}
.hero-bg{
  position:absolute;inset:-40px;
  background-image:url(${heroBg});
  background-size:cover;background-position:center;
  z-index:1;will-change:transform;
  transition:transform .25s cubic-bezier(.2,.8,.2,1);
}
.hero-candidate{
  position:absolute;right:4vw;bottom:0;height:96vh;max-height:1000px;
  z-index:2;pointer-events:none;will-change:transform;
  transition:transform .35s cubic-bezier(.2,.8,.2,1);
  filter:drop-shadow(0 30px 60px rgba(0,0,0,.45));
}
.hero-candidate img{height:100%;width:auto;display:block}
.hero-overlay{
  position:absolute;left:0;right:0;bottom:0;width:100%;
  z-index:3;pointer-events:none;display:block;
}
.hero-content{
  position:relative;z-index:4;
  max-width:1600px;margin:0 auto;
  padding:80px 28px 18vh;pointer-events:none;
}
.hero-content > *{pointer-events:auto}
.eyebrow{
  font-family:'Oswald',sans-serif;text-transform:uppercase;
  color:var(--gold);font-size:13px;letter-spacing:.28em;
  display:inline-flex;align-items:center;gap:12px;
}
.eyebrow .dash{width:36px;height:2px;background:var(--gold)}
.eyebrow .star{color:var(--gold);font-size:14px}
.hero h1{
  font-family:'Playfair Display',serif;font-weight:900;color:var(--cream);
  font-size:clamp(48px,6.6vw,92px);line-height:.98;letter-spacing:-.01em;
  margin:22px 0 18px;text-shadow:0 4px 30px rgba(0,0,0,.4);
}
.hero h1 .name{display:block;white-space:nowrap}
.hero h1 em{
  display:block;font-style:italic;font-weight:800;
  color:var(--gold);margin-top:6px;white-space:nowrap;
}
.tagline{
  font-family:'Oswald',sans-serif;text-transform:uppercase;
  font-size:15px;letter-spacing:.22em;color:var(--cream);
  display:inline-block;position:relative;padding-bottom:10px;
}
.tagline::after{
  content:"";position:absolute;left:0;right:0;bottom:0;height:6px;
  background:var(--gold);opacity:.85;border-radius:1px;
}
.lede{
  margin-top:26px;max-width:560px;color:rgba(245,239,228,.92);
  font-size:18px;line-height:1.7;
}
.cta-row{display:flex;gap:14px;margin-top:30px;flex-wrap:wrap}
.btn{
  font-family:'Oswald',sans-serif;text-transform:uppercase;
  letter-spacing:.2em;font-size:13px;padding:15px 26px;
  display:inline-flex;align-items:center;gap:10px;
  border:2px solid transparent;border-radius:2px;cursor:pointer;
  transition:background .2s,color .2s,border-color .2s,transform .2s;
}
.btn-red{background:var(--red);color:var(--cream);border-color:var(--red)}
.btn-red:hover{background:#a51a27;border-color:#a51a27}
.btn-outline{background:transparent;color:var(--cream);border-color:var(--cream)}
.btn-outline:hover{background:var(--cream);color:var(--navy)}
.btn-navy{background:var(--navy);color:var(--cream);border-color:var(--navy)}
.btn-navy:hover{background:var(--gold);color:var(--navy);border-color:var(--gold)}
.btn .arrow{transition:transform .2s}
.btn:hover .arrow{transform:translateX(4px)}

/* ---------- Section base ---------- */
section{padding:96px 28px;position:relative}
.container{max-width:1600px;margin:0 auto}
.section-eyebrow{
  font-family:'Oswald',sans-serif;text-transform:uppercase;
  color:var(--red);font-size:12.5px;letter-spacing:.3em;
  display:inline-flex;align-items:center;gap:12px;
}
.section-eyebrow .dash{width:30px;height:2px;background:var(--red)}
.section-title{
  font-family:'Playfair Display',serif;font-weight:800;color:var(--navy);
  font-size:clamp(34px,4.2vw,52px);line-height:1.05;letter-spacing:-.005em;
  margin:18px 0 0;max-width:880px;
}
.section-title em{font-style:italic;color:var(--red);font-weight:800}

/* ---------- Page hero (sub-pages) ---------- */
.page-hero{
  background:var(--navy);color:var(--cream);
  padding:90px 28px 70px;position:relative;overflow:hidden;
}
.page-hero::before{
  content:"";position:absolute;left:0;right:0;bottom:0;height:6px;background:var(--gold);
}
.page-hero .container{position:relative;z-index:2}
.page-hero .section-eyebrow{color:var(--gold)}
.page-hero .section-eyebrow .dash{background:var(--gold)}
.page-hero h1{
  font-family:'Playfair Display',serif;font-weight:800;color:var(--cream);
  font-size:clamp(40px,5.4vw,72px);line-height:1.05;margin-top:18px;max-width:980px;
}
.page-hero h1 em{font-style:italic;color:var(--gold)}
.page-hero p.lede{color:rgba(245,239,228,.9);max-width:760px;margin-top:22px;font-size:18px}

/* ---------- About ---------- */
.about-grid{
  display:grid;grid-template-columns:.85fr 1.4fr;gap:64px;margin-top:54px;align-items:start;
}
.quote-stack{position:sticky;top:120px;display:flex;flex-direction:column}
.quote-stack .gold-bar{height:8px;background:var(--gold)}
.quote-photo{
  width:100%;aspect-ratio:1/1;overflow:hidden;display:block;background:var(--navy);
}
.quote-photo img{width:100%;height:100%;object-fit:cover;display:block}
.quote-card{
  background:var(--navy);color:var(--cream);
  padding:42px 38px;
  box-shadow:0 30px 60px -30px rgba(10,34,64,.4);
}
.quote-card .qmark{
  font-family:'Playfair Display',serif;color:var(--gold);
  font-size:80px;line-height:.5;font-style:italic;display:block;margin-bottom:18px;
}
.quote-card blockquote{
  font-family:'Playfair Display',serif;font-style:italic;
  font-size:24px;line-height:1.4;color:var(--cream);
}
.quote-card cite{
  display:block;margin-top:22px;font-style:normal;
  font-family:'Oswald',sans-serif;text-transform:uppercase;
  font-size:12px;letter-spacing:.22em;color:var(--gold);
}
.bio h3{
  font-family:'Playfair Display',serif;font-weight:800;color:var(--navy);
  font-size:36px;margin-bottom:22px;
}
.bio p{margin-bottom:20px;color:#3a3a3a;font-size:17px;line-height:1.75}
.bio p:first-of-type::first-letter{
  font-family:'Playfair Display',serif;font-weight:900;
  color:var(--red);font-size:64px;line-height:.85;
  float:left;padding:6px 12px 0 0;
}
.bio .pull{
  border-left:4px solid var(--gold);
  padding:6px 0 6px 22px;margin:28px 0;
  font-family:'Playfair Display',serif;font-style:italic;
  color:var(--navy);font-size:21px;line-height:1.45;
}

/* bullet list (home About) */
.bullets{
  margin-top:36px;display:grid;grid-template-columns:1fr 1fr;gap:14px 30px;
}
.bullets li{
  list-style:none;display:flex;gap:12px;align-items:flex-start;
  font-size:16px;color:#2c2c2c;
}
.bullets li::before{
  content:"";flex:0 0 10px;width:10px;height:10px;background:var(--gold);
  margin-top:9px;border-radius:50%;
}

/* ---------- Priorities ---------- */
.priorities-head{display:flex;justify-content:space-between;align-items:end;gap:30px;flex-wrap:wrap}
.priorities-head p{max-width:420px;color:var(--muted);margin-top:14px}
.cards{ display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:54px; }
.card{
  position:relative;background:var(--cream-2);
  padding:38px 32px 34px;border:1px solid rgba(10,34,64,.1);
  transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease;
  overflow:hidden;
}
.card::before{
  content:"";position:absolute;left:0;right:0;top:0;height:3px;
  background:var(--red);transform:scaleX(0);transform-origin:left;
  transition:transform .3s ease;
}
.card:hover{transform:translateY(-6px);box-shadow:0 30px 50px -28px rgba(10,34,64,.25);border-color:transparent}
.card:hover::before{transform:scaleX(1)}
.card .num{
  position:absolute;top:18px;right:24px;
  font-family:'Playfair Display',serif;font-style:italic;font-weight:800;
  color:var(--gold);font-size:46px;line-height:1;transition:color .25s;
}
.card:hover .num{color:var(--red)}
.card h4{
  font-family:'Playfair Display',serif;font-weight:800;color:var(--navy);
  font-size:24px;margin:30px 0 14px;max-width:80%;line-height:1.2;
}
.card p{color:#3e3e3e;font-size:15.5px;line-height:1.65}

/* ---------- Issues ---------- */
.issues-grid{ display:grid;grid-template-columns:repeat(2,1fr);gap:48px 56px;margin-top:54px; }
.issue h4{
  font-family:'Playfair Display',serif;font-weight:800;color:var(--navy);
  font-size:26px;margin-bottom:16px;display:inline-block;position:relative;padding-bottom:10px;
}
.issue h4::after{
  content:"";position:absolute;left:0;right:0;bottom:0;height:5px;
  background:var(--gold);opacity:.85;
}
.issue p{color:#3a3a3a;font-size:16.5px;line-height:1.75;margin-bottom:14px}
.closing-band{
  margin-top:72px;background:var(--navy);color:var(--cream);
  padding:46px 50px;border-left:5px solid var(--gold);
  display:flex;align-items:center;
}
.closing-band p{
  font-family:'Playfair Display',serif;font-style:italic;
  font-size:24px;line-height:1.45;color:var(--cream);
}

/* ---------- Take Action ---------- */
.action-page{background:var(--navy);color:var(--cream)}
.action-page .section-eyebrow{color:var(--gold)}
.action-page .section-eyebrow .dash{background:var(--gold)}
.action-page .section-title{color:var(--cream)}
.action-page .section-title em{color:var(--gold)}
.action-cards{ display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:54px; }
.action-card{
  background:rgba(255,255,255,.04);
  border:1px solid rgba(254,214,72,.18);
  padding:30px 28px;display:flex;flex-direction:column;gap:16px;
  transition:background .2s, border-color .2s, transform .2s;
}
.action-card:hover{background:rgba(255,255,255,.07);border-color:var(--gold);transform:translateY(-4px)}
.action-card .icon{
  width:48px;height:48px;background:var(--red);
  display:flex;align-items:center;justify-content:center;color:var(--cream);
}
.action-card .icon svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:2}
.action-card h5{
  font-family:'Playfair Display',serif;font-weight:800;font-size:22px;color:var(--cream);
}
.action-card p{font-size:14.5px;line-height:1.65;color:rgba(245,239,228,.78)}

.action-form{
  margin-top:60px;background:var(--cream);color:var(--ink);
  padding:46px 48px;border:1px solid var(--gold);position:relative;
}
.action-form::before{
  content:"";position:absolute;inset:6px;border:1px solid rgba(254,214,72,.5);pointer-events:none;
}
.action-form h4{
  font-family:'Playfair Display',serif;font-weight:800;color:var(--navy);
  font-size:30px;margin-bottom:8px;
}
.action-form .sub{color:var(--muted);font-size:15px;margin-bottom:28px}
.form-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
.field{display:flex;flex-direction:column;gap:6px}
.field label{
  font-family:'Oswald',sans-serif;text-transform:uppercase;
  font-size:11px;letter-spacing:.22em;color:var(--navy);
}
.field input{
  background:var(--cream-2);border:1px solid rgba(10,34,64,.18);
  padding:13px 14px;font-family:'Inter',sans-serif;font-size:15px;color:var(--ink);
  border-radius:2px;outline:none;transition:border-color .2s, background .2s;
}
.field input:focus{border-color:var(--red);background:#fff}
.checks{ margin-top:24px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px 22px; }
.check{display:flex;align-items:center;gap:10px;font-size:14.5px;color:var(--ink)}
.check input{accent-color:var(--red);width:16px;height:16px}
.action-form .submit-row{margin-top:28px;display:flex;justify-content:flex-end}

.closing-cream{
  margin-top:64px;padding:46px 50px;background:var(--cream);color:var(--navy);
  border-left:5px solid var(--gold);
}
.closing-cream h4{
  font-family:'Playfair Display',serif;font-weight:800;font-size:28px;margin-bottom:14px;
}
.closing-cream p{font-size:17px;line-height:1.7;color:#2c2c2c;margin-bottom:10px}
.closing-cream .sign{
  font-family:'Playfair Display',serif;font-style:italic;color:var(--navy);
  font-size:20px;margin-top:8px;
}

/* ---------- Media ---------- */
.media-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:54px}
.media-card{
  background:var(--cream-2);border:1px solid rgba(10,34,64,.1);
  padding:26px;display:flex;flex-direction:column;gap:18px;
  transition:transform .2s, box-shadow .2s, border-color .2s;
}
.media-card:hover{transform:translateY(-4px);box-shadow:0 20px 40px -24px rgba(10,34,64,.25);border-color:transparent}
.media-card .ph{
  aspect-ratio:1/1;background:var(--placeholder);
  display:flex;align-items:center;justify-content:center;
  color:var(--placeholder-ink);font-family:'Oswald',sans-serif;
  text-transform:uppercase;font-size:11px;letter-spacing:.22em;
}
.media-card h5{
  font-family:'Playfair Display',serif;font-weight:800;color:var(--navy);font-size:22px;
}
.media-card p{color:var(--muted);font-size:14.5px}
.media-card .more{
  font-family:'Oswald',sans-serif;text-transform:uppercase;font-size:12px;letter-spacing:.22em;
  color:var(--red);display:inline-flex;align-items:center;gap:8px;
}
.social-row{ margin-top:64px;display:flex;justify-content:center;gap:18px; }
.social-row a{
  width:54px;height:54px;border:1.5px solid var(--navy);
  border-radius:50%;display:flex;align-items:center;justify-content:center;
  color:var(--navy);transition:background .2s, color .2s, transform .2s;
}
.social-row a:hover{background:var(--navy);color:var(--cream);transform:translateY(-3px)}
.social-row svg{width:20px;height:20px;fill:currentColor}

/* ---------- Donate Page ---------- */
.donate-band{
  background:var(--red);color:var(--cream);text-align:center;
  padding:90px 28px;position:relative;overflow:hidden;
}
.star-strip{
  position:absolute;left:0;right:0;height:24px;
  display:flex;justify-content:space-around;align-items:center;color:var(--gold);
}
.star-strip.top{top:14px}
.star-strip.bot{bottom:14px}
.star-strip span{font-size:14px;opacity:.85}
.donate-band h2{
  font-family:'Playfair Display',serif;font-weight:800;
  font-size:clamp(40px,5vw,64px);line-height:1.05;color:var(--cream);
}
.donate-band h2 em{font-style:italic;color:var(--gold)}
.donate-band .blurb{
  max-width:620px;margin:18px auto 0;font-size:17px;color:rgba(245,239,228,.9);
}
.amounts{ margin:36px auto 0;display:flex;justify-content:center;flex-wrap:wrap;gap:12px; }
.amount{
  background:transparent;color:var(--cream);
  border:1.5px solid rgba(245,239,228,.6);
  font-family:'Oswald',sans-serif;letter-spacing:.18em;font-size:14px;
  padding:14px 26px;cursor:pointer;border-radius:2px;
  transition:background .2s, color .2s, border-color .2s;
}
.amount:hover{border-color:var(--gold);color:var(--gold)}
.amount.active{background:var(--gold);color:var(--navy);border-color:var(--gold)}
.donate-cta{
  margin-top:32px;background:var(--cream);color:var(--navy);
  font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:.22em;
  font-size:14px;padding:18px 42px;border:0;cursor:pointer;border-radius:2px;
  display:inline-flex;align-items:center;gap:12px;
  transition:background .2s, color .2s;
}
.donate-cta:hover{background:var(--gold);color:var(--navy)}
.donate-cta .star{color:var(--red)}
.donate-cta:hover .star{color:var(--navy)}

/* ---------- Footer ---------- */
footer.site-footer{background:var(--navy);color:var(--cream);padding:72px 28px 28px}
.foot-grid{
  max-width:1280px;margin:0 auto;
  display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:46px;
}
.foot-brand .foot-logo{ height:72px;width:auto;display:block;margin-bottom:18px; }
.foot-brand h4{
  font-family:'Playfair Display',serif;font-weight:800;font-size:24px;color:var(--cream);
}
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
  max-width:1600px;margin:54px auto 0;padding-top:24px;
  border-top:1px solid rgba(245,239,228,.15);
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;
  font-size:12.5px;color:rgba(245,239,228,.6);
  font-family:'Oswald',sans-serif;letter-spacing:.18em;text-transform:uppercase;
}

/* ---------- Why I'm Running ---------- */
.why-grid{
  display:grid;grid-template-columns:1.1fr 1fr;gap:64px;margin-top:54px;align-items:center;
}
.why-text p{margin-bottom:18px;color:#3a3a3a;font-size:17px;line-height:1.75}
.why-text .signoff{
  margin-top:22px;font-family:'Playfair Display',serif;font-style:italic;
  color:var(--navy);font-size:22px;line-height:1.3;
}
.video-frame{
  position:relative;aspect-ratio:16/9;background:var(--placeholder);
  border-top:6px solid var(--gold);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 30px 60px -30px rgba(10,34,64,.4);overflow:hidden;
}
.video-frame::after{
  content:"";position:absolute;left:-14px;bottom:-14px;width:60%;height:30%;
  background:var(--navy);z-index:-1;
}
.play-btn{
  width:84px;height:84px;border-radius:50%;background:var(--red);
  display:flex;align-items:center;justify-content:center;color:var(--cream);
  box-shadow:0 14px 30px rgba(0,0,0,.3);
}
.play-btn svg{width:30px;height:30px;margin-left:5px;fill:currentColor}
.video-cap{
  position:absolute;left:0;right:0;bottom:0;padding:14px 20px;
  background:linear-gradient(to top,rgba(3,31,81,.92),transparent);
  font-family:'Oswald',sans-serif;text-transform:uppercase;font-size:12px;
  letter-spacing:.22em;color:var(--cream);
}

/* community leadership photo grid */
.photo-grid{
  margin-top:36px;display:grid;grid-template-columns:repeat(6,1fr);gap:10px;
}
.photo-grid .ph{
  aspect-ratio:1/1;background:var(--placeholder);
  display:flex;align-items:center;justify-content:center;
  font-family:'Oswald',sans-serif;font-size:10px;letter-spacing:.18em;
  color:var(--placeholder-ink);text-transform:uppercase;text-align:center;padding:6px;
}

/* community leadership cta band */
.cta-trio{
  margin-top:44px;display:grid;grid-template-columns:repeat(3,1fr);gap:18px;
}
.cta-trio .btn{justify-content:center;padding:18px 22px}

/* ---------- Fade up ---------- */
.fade-up{opacity:0;transform:translateY(18px);transition:opacity .8s ease, transform .8s ease}
.fade-up.in{opacity:1;transform:none}
.delay-1{transition-delay:.08s}
.delay-2{transition-delay:.16s}
.delay-3{transition-delay:.24s}
.delay-4{transition-delay:.32s}
.delay-5{transition-delay:.4s}

/* ---------- Responsive ---------- */
@media (max-width:960px){
  .nav .wrap{padding:12px 16px}
  .hero{min-height:auto;padding-bottom:0}
  .hero-content{padding:48px 16px 40px}
  .hero h1{font-size:clamp(40px,9vw,64px)}
  .hero h1 .name{white-space:normal}
  .hero h1 em{white-space:normal}
  .hero-candidate{
    position:relative;right:auto;left:auto;bottom:auto;
    height:auto;width:90vw;max-height:none;margin:20px auto 0;display:block;
  }
  .hero-candidate img{width:100%;height:auto}
  .hero-overlay{position:relative;margin-top:-2px}
  .cta-row{flex-wrap:nowrap}
  .cta-row .btn{flex:1;justify-content:center;padding:14px 14px;font-size:11.5px;letter-spacing:.14em;white-space:nowrap}
  .about-grid{grid-template-columns:1fr;gap:40px}
  .quote-stack{position:static}
  .why-grid{grid-template-columns:1fr;gap:36px}
  .cards{grid-template-columns:repeat(2,1fr)}
  .issues-grid{grid-template-columns:1fr;gap:36px}
  .action-cards{grid-template-columns:repeat(2,1fr)}
  .media-grid{grid-template-columns:repeat(2,1fr)}
  .foot-grid{grid-template-columns:1fr 1fr;gap:36px;padding:0 16px}
  .photo-grid{grid-template-columns:repeat(3,1fr)}
  .cta-trio{grid-template-columns:1fr}
  .bullets{grid-template-columns:1fr}
  .menu{
    display:none;position:absolute;top:100%;left:0;right:0;
    background:var(--navy);flex-direction:column;align-items:stretch;
    padding:14px 16px 20px;box-shadow:0 20px 40px -20px rgba(0,0,0,.4);
    border-top:1px solid rgba(254,214,72,.18);
  }
  .menu.open{display:flex}
  .menu a{padding:14px 6px}
  .menu a::after{display:none}
  .menu .donate-btn{margin:8px 0 0;text-align:center}
  .hamburger{display:inline-flex;align-items:center;justify-content:center}
  .nav .wrap{position:relative}
  section{padding:72px 16px}
  .closing-band{padding:34px 28px}
  .closing-cream{padding:34px 28px}
  .action-form{padding:32px 24px}
  .form-grid{grid-template-columns:1fr}
  .checks{grid-template-columns:1fr 1fr}
  .foot-bottom{padding-left:16px;padding-right:16px}
  .page-hero{padding:64px 16px 50px}
}
@media (max-width:640px){
  .cards{grid-template-columns:1fr}
  .action-cards{grid-template-columns:1fr}
  .media-grid{grid-template-columns:1fr}
  .foot-grid{grid-template-columns:1fr}
  .photo-grid{grid-template-columns:repeat(2,1fr)}
  .checks{grid-template-columns:1fr}
  .quote-card blockquote{font-size:20px}
  .closing-band p{font-size:19px}
  .donate-band{padding:70px 22px}
  .amount{padding:12px 18px;font-size:13px}
}

/* unused overlay image preload */
.hero-overlay-img{display:none}
.__preload{background-image:url(${heroOverlay});display:none}
`;
