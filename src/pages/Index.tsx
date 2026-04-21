import { useEffect, useRef } from "react";
import heroBg from "@/assets/hero-bg.png";
import heroOverlay from "@/assets/hero-overlay.png";
import candidateImg from "@/assets/candidate.png";
import logoImg from "@/assets/logo.png";
import bobQuoteImg from "@/assets/bob-quote.jpg";
import bobIssuesImg from "@/assets/bob-issues.png";

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
  --placeholder-ink:#7a7a7a;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
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
.nav.scrolled{
  box-shadow:0 6px 22px rgba(0,0,0,.35);
}
.nav .wrap{
  max-width:1440px;margin:0 auto;
  padding:14px 36px;
  display:flex;align-items:center;justify-content:space-between;gap:24px;
}
.brand{display:flex;align-items:center;gap:12px}
.brand img.brand-logo{
  height:54px;width:auto;display:block;
}
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
.menu a:hover{color:var(--gold)}
.menu a:hover::after{transform:scaleX(1)}
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

/* ---------- Hero ---------- */
.hero{
  position:relative;
  min-height:100vh;
  width:100%;
  overflow:hidden;
  background:#031f51;
  isolation:isolate;
}
.hero-bg{
  position:absolute;inset:-40px;
  background-image:url(${heroBg});
  background-size:cover;
  background-position:center;
  z-index:1;
  will-change:transform;
  transition:transform .25s cubic-bezier(.2,.8,.2,1);
}
.hero-candidate{
  position:absolute;
  right:4vw;
  bottom:0;
  height:96vh;
  max-height:1000px;
  z-index:2;
  pointer-events:none;
  will-change:transform;
  transition:transform .35s cubic-bezier(.2,.8,.2,1);
  filter:drop-shadow(0 30px 60px rgba(0,0,0,.45));
}
.hero-candidate img{height:100%;width:auto;display:block}
.hero-overlay{
  position:absolute;
  left:0;right:0;bottom:0;
  width:100%;
  z-index:3;
  pointer-events:none;
  display:block;
}
.hero-content{
  position:relative;z-index:4;
  max-width:1440px;margin:0 auto;
  padding:80px 36px 18vh;
  pointer-events:none;
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
  font-family:'Playfair Display',serif;
  font-weight:900;color:var(--cream);
  font-size:clamp(48px,6.6vw,92px);
  line-height:.98;letter-spacing:-.01em;
  margin:22px 0 18px;
  text-shadow:0 4px 30px rgba(0,0,0,.4);
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
.btn .arrow{transition:transform .2s}
.btn:hover .arrow{transform:translateX(4px)}

/* ---------- Section base ---------- */
section{padding:96px 36px;position:relative}
.container{max-width:1440px;margin:0 auto}
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

/* ---------- About ---------- */
#about{background:var(--cream-2)}
.about-grid{
  display:grid;grid-template-columns:.85fr 1.4fr;gap:64px;margin-top:54px;
  align-items:start;
}
.quote-stack{position:sticky;top:120px;display:flex;flex-direction:column}
.quote-stack .gold-bar{height:8px;background:var(--gold)}
.quote-photo{
  width:100%;aspect-ratio:1/1;overflow:hidden;display:block;background:var(--navy);
}
.quote-photo img{width:100%;height:100%;object-fit:cover;display:block}
.quote-card{
  position:relative;
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
/* Reusable Bob quote (blue plate + yellow right line) */
.quote-blue{
  background:var(--navy);color:var(--cream);
  border-right:6px solid var(--gold);
  padding:28px 30px;margin-top:28px;
  font-family:'Playfair Display',serif;font-style:italic;font-weight:300;
  font-size:22px;line-height:1.35;
  box-shadow:0 20px 40px -24px rgba(10,34,64,.4);
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
.facts{
  margin-top:70px;display:grid;grid-template-columns:repeat(4,1fr);
  gap:0;border-top:1px solid rgba(10,34,64,.15);
  border-bottom:1px solid rgba(10,34,64,.15);
}
.fact{
  padding:36px 22px;text-align:center;
  border-right:1px solid rgba(10,34,64,.15);
}
.fact:last-child{border-right:0}
.fact .num{
  font-family:'Playfair Display',serif;font-weight:900;color:var(--navy);
  font-size:54px;line-height:1;
}
.fact .num em{font-style:italic;color:var(--red)}
.fact .lbl{
  margin-top:10px;font-family:'Oswald',sans-serif;text-transform:uppercase;
  font-size:11.5px;letter-spacing:.22em;color:var(--muted);
}

/* ---------- Priorities ---------- */
.priorities-head{display:flex;justify-content:space-between;align-items:end;gap:30px;flex-wrap:wrap}
.priorities-head p{max-width:420px;color:var(--muted);margin-top:14px}
.cards{
  display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:54px;
}
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
#issues{background:var(--cream-3)}
.issues-hero{
  position:relative;width:100%;aspect-ratio:21/9;max-height:520px;
  overflow:hidden;display:flex;align-items:flex-end;
  box-shadow:0 30px 60px -30px rgba(10,34,64,.35);
}
.issues-hero img{
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;z-index:1;
}
.issues-hero-overlay{
  position:absolute;inset:0;z-index:2;
  background:linear-gradient(180deg,rgba(3,31,81,.45) 0%,rgba(3,31,81,.7) 100%);
}
.issues-hero-content{
  position:relative;z-index:3;padding:42px 48px;width:100%;
}
.issues-hero-eyebrow{color:var(--gold)!important}
.issues-hero-eyebrow .dash{background:var(--gold)!important}
.issues-hero-title{color:var(--cream)!important;margin:14px 0 0!important}
.issues-hero-title em{color:var(--gold)!important}
.issues-grid{
  display:grid;grid-template-columns:repeat(2,1fr);gap:48px 56px;margin-top:54px;
}
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
#action{background:var(--navy);color:var(--cream)}
#action .section-eyebrow{color:var(--gold)}
#action .section-eyebrow .dash{background:var(--gold)}
#action .section-title{color:var(--cream)}
#action .section-title em{color:var(--gold)}
.action-cards{
  display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:54px;
}
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
  padding:46px 48px;border:1px solid var(--gold);
  position:relative;
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
.checks{
  margin-top:28px;
  display:grid;
  grid-template-columns:repeat(2,minmax(280px,1fr));
  gap:12px 24px;
  align-items:start;
}
.check{
  position:relative;
  display:grid;
  grid-template-columns:18px minmax(0,1fr);
  align-items:start;
  column-gap:12px;
  row-gap:0;
  padding:8px 0;
  background:transparent;
  border:0;
  border-radius:0;
  font-family:'Inter',sans-serif;
  font-size:15px;
  line-height:1.3;
  color:var(--ink);
  cursor:pointer;
  writing-mode:horizontal-tb;
  text-orientation:mixed;
  transform:none;
  white-space:normal;
  min-width:0;
}
.check:hover{color:var(--navy)}
.check input{
  appearance:none;
  -webkit-appearance:none;
  width:18px;
  height:18px;
  margin:2px 0 0;
  border:1.5px solid rgba(10,34,64,.35);
  border-radius:3px;
  background:#fff;
  display:block;
  transition:background .2s,border-color .2s,box-shadow .2s;
}
.check input:checked{background:var(--red);border-color:var(--red);box-shadow:0 0 0 2px rgba(191,30,46,.12)}
.check input:checked::after{
  content:"";
  display:block;
  width:5px;
  height:9px;
  margin:2px 0 0 5px;
  border:solid #fff;
  border-width:0 2px 2px 0;
  transform:rotate(45deg);
}
.check span{
  display:block;
  min-width:0;
  max-width:22ch;
  writing-mode:horizontal-tb;
  text-orientation:mixed;
  transform:none;
  white-space:normal;
  overflow-wrap:anywhere;
  word-break:normal;
}
.action-form .submit-row{margin-top:28px;display:flex;justify-content:flex-end}

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

.social-row{
  margin-top:64px;display:flex;justify-content:center;gap:18px;
}
.social-row a{
  width:54px;height:54px;border:1.5px solid var(--navy);
  border-radius:50%;display:flex;align-items:center;justify-content:center;
  color:var(--navy);transition:background .2s, color .2s, transform .2s;
}
.social-row a:hover{background:var(--navy);color:var(--cream);transform:translateY(-3px)}
.social-row svg{width:20px;height:20px;fill:currentColor}

/* ---------- Donate Band ---------- */
#donate{
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
#donate h2{
  font-family:'Playfair Display',serif;font-weight:800;
  font-size:clamp(40px,5vw,64px);line-height:1.05;color:var(--cream);
}
#donate h2 em{font-style:italic;color:var(--gold)}
#donate .blurb{
  max-width:620px;margin:18px auto 0;font-size:17px;color:rgba(245,239,228,.9);
}
.amounts{
  margin:36px auto 0;display:flex;justify-content:center;flex-wrap:wrap;gap:12px;
}
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
footer{background:var(--navy);color:var(--cream);padding:72px 28px 28px}
.foot-grid{
  max-width:1280px;margin:0 auto;
  display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:46px;
}
.foot-brand .foot-logo{
  height:72px;width:auto;display:block;margin-bottom:18px;
}
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
  max-width:1440px;margin:54px auto 0;padding-top:24px;
  border-top:1px solid rgba(245,239,228,.15);
  display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;
  font-size:12.5px;color:rgba(245,239,228,.6);
  font-family:'Oswald',sans-serif;letter-spacing:.18em;text-transform:uppercase;
}

/* ---------- Why I'm Running (Video) ---------- */
#why{background:var(--cream-2)}
.why-grid{
  display:grid;grid-template-columns:1.1fr 1fr;gap:64px;margin-top:54px;align-items:start;
}
.why-text p{margin-bottom:18px;color:#3a3a3a;font-size:17px;line-height:1.75}
.why-text .signoff{
  margin-top:22px;font-family:'Playfair Display',serif;font-style:italic;
  color:var(--navy);font-size:22px;line-height:1.3;
}
.why-video-wrap{position:relative;padding-top:160px}
.video-frame{
  position:relative;aspect-ratio:16/9;background:var(--placeholder);
  border-top:6px solid var(--gold);
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 30px 60px -30px rgba(10,34,64,.4);
  overflow:hidden;
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
  .nav .wrap{padding:12px 20px}
  .hero{min-height:auto;padding-bottom:0;display:flex;flex-direction:column;position:relative;overflow:hidden}
  .hero-bg{inset:-20px}
  .hero-content{padding:0;display:contents}
  .hero-content > *{position:relative;z-index:4}
  .hero-content > .eyebrow,
  .hero-content > h1,
  .hero-content > .tagline{padding-left:20px;padding-right:20px}
  .hero-content > .eyebrow{order:1;margin-top:-56px;padding-top:0;white-space:nowrap;font-size:11px;letter-spacing:.18em;flex-wrap:nowrap}
  .hero-content > .eyebrow .dash{width:18px;flex-shrink:0}
  .hero-content > h1{order:2;margin-top:10px;margin-bottom:14px}
  .hero-content > .tagline{order:3;margin:14px 0 0;width:100%;max-width:100%;padding:0 20px;display:block}
  .hero-content > .tagline::after{display:none}
  .hero-candidate{
    position:relative;right:auto;left:auto;bottom:auto;
    height:auto;width:calc(100% - 40px);max-width:none;max-height:none;margin:18px 20px 0;display:block;order:4;
    z-index:4;
  }
  .hero-candidate::after{
    content:"";position:absolute;left:0;right:0;top:100%;height:8px;
    background:var(--gold);opacity:.95;z-index:6;pointer-events:none;
  }
  .hero-candidate img{width:100%;height:auto;display:block}
  .hero-content > .lede{order:6;padding:0 20px;margin-top:20px}
  .hero-content > .cta-row{order:7;padding:0 10px;margin:24px 10px 32px;display:flex}
  .hero-overlay{position:relative;order:8;left:50%;right:auto;transform:translateX(-50%);width:100vw;max-width:100vw;margin-top:-8vw;display:block;z-index:3}
  .hero h1{font-size:clamp(40px,9vw,64px)}
  .cta-row{flex-wrap:nowrap}
  .cta-row .btn{flex:1;justify-content:center;padding:14px 14px;font-size:11.5px;letter-spacing:.14em;white-space:nowrap}
  .about-grid{grid-template-columns:1fr;gap:40px}
  .quote-stack{position:static}
  .why-grid{grid-template-columns:1fr;gap:24px}
  .why-grid .why-text{display:contents}
  .why-grid .why-text > .section-eyebrow{order:1}
  .why-grid .why-text > h2{order:2}
  .why-grid .why-text > div{order:4}
  .why-video-wrap{order:3;padding-top:0}
  .issues-hero{aspect-ratio:3/4;width:100%;min-height:540px;max-height:none}
  .issues-hero-content{padding:24px 20px}
  .cards{grid-template-columns:repeat(2,1fr)}
  .issues-grid{grid-template-columns:1fr;gap:36px}
  .action-cards{grid-template-columns:repeat(2,1fr)}
  .media-grid{grid-template-columns:repeat(2,1fr)}
  .foot-grid{grid-template-columns:1fr 1fr;gap:36px;padding:0 20px}
  .facts{grid-template-columns:repeat(2,1fr)}
  .fact:nth-child(2){border-right:0}
  .fact:nth-child(1),.fact:nth-child(2){border-bottom:1px solid rgba(10,34,64,.15)}
  .menu{
    display:none;position:absolute;top:100%;left:0;right:0;
    background:var(--navy);flex-direction:column;align-items:stretch;
    padding:14px 20px 20px;box-shadow:0 20px 40px -20px rgba(0,0,0,.4);
    border-top:1px solid rgba(254,214,72,.18);
  }
  .menu.open{display:flex}
  .menu a{padding:14px 6px}
  .menu a::after{display:none}
  .menu .donate-btn{margin:8px 0 0;text-align:center}
  .hamburger{display:inline-flex;align-items:center;justify-content:center}
  .nav .wrap{position:relative}
  section{padding:72px 20px}
  .closing-band{padding:34px 28px}
  .action-form{padding:32px 24px}
  .form-grid{grid-template-columns:1fr}
  .checks{grid-template-columns:1fr 1fr;gap:10px 18px}
  .foot-bottom{padding-left:20px;padding-right:20px}
}
@media (max-width:640px){
  .cards{grid-template-columns:1fr}
  .action-cards{grid-template-columns:1fr}
  .media-grid{grid-template-columns:1fr}
  .foot-grid{grid-template-columns:1fr}
  .facts{grid-template-columns:1fr}
  .fact{border-right:0;border-bottom:1px solid rgba(10,34,64,.15)}
  .fact:last-child{border-bottom:0}
  .checks{grid-template-columns:1fr}
  .check span{max-width:none}
  .quote-card blockquote{font-size:20px}
  .closing-band p{font-size:19px}
  #donate{padding:70px 22px}
  .amount{padding:12px 18px;font-size:13px}
}
`;

const SOCIAL_ICONS = {
  facebook: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 22v-8h3l1-4h-4V7.5c0-1.1.3-1.9 2-1.9h2V2.1C16.6 2 15.4 2 14.2 2 11.5 2 9.7 3.7 9.7 6.7V10H7v4h2.7v8H13z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.5 1s.8.9 1 1.5c.2.4.3 1.1.4 2.3.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-1 1.5s-.9.8-1.5 1c-.4.2-1.1.3-2.3.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.5-1s-.8-.9-1-1.5c-.2-.4-.3-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.9.4-2.3.2-.6.5-1 1-1.5s.9-.8 1.5-1c.4-.2 1.1-.3 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1 0-1.6.2-1.9.3-.5.2-.8.4-1.2.8s-.6.7-.8 1.2c-.1.3-.3.9-.3 1.9-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 1 .2 1.6.3 1.9.2.5.4.8.8 1.2s.7.6 1.2.8c.3.1.9.3 1.9.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1 0 1.6-.2 1.9-.3.5-.2.8-.4 1.2-.8s.6-.7.8-1.2c.1-.3.3-.9.3-1.9.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1-.2-1.6-.3-1.9-.2-.5-.4-.8-.8-1.2s-.7-.6-1.2-.8c-.3-.1-.9-.3-1.9-.3-1.2-.1-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm5.1-8.3a1.1 1.1 0 1 1 0-2.3 1.1 1.1 0 0 1 0 2.3z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2C.5 9.1.5 12 .5 12s0 2.9.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8zM9.8 15.6V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.6 6.7a5.3 5.3 0 0 1-3.2-1.1 5.3 5.3 0 0 1-2-3H11v12.7a2.6 2.6 0 1 1-1.9-2.5V8.6a5.7 5.7 0 1 0 5 5.6V9.7a8.3 8.3 0 0 0 5.5 2v-5z" />
    </svg>
  ),
};

const Star = ({ className = "" }: { className?: string }) => (
  <span className={className} aria-hidden="true">
    ★
  </span>
);

const HeroStars = () => {
  // deterministic positions
  const stars = [
    { x: 6, y: 12, c: "navy", s: 14 },
    { x: 16, y: 64, c: "red", s: 10 },
    { x: 24, y: 28, c: "navy", s: 12 },
    { x: 36, y: 78, c: "navy", s: 10 },
    { x: 44, y: 18, c: "red", s: 14 },
    { x: 56, y: 50, c: "navy", s: 11 },
    { x: 68, y: 8, c: "navy", s: 13 },
    { x: 78, y: 70, c: "red", s: 12 },
    { x: 88, y: 32, c: "navy", s: 14 },
    { x: 94, y: 80, c: "navy", s: 10 },
    { x: 12, y: 86, c: "navy", s: 11 },
    { x: 50, y: 88, c: "red", s: 10 },
  ];
  return (
    <svg className="stars" viewBox="0 0 100 100" preserveAspectRatio="none">
      {stars.map((s, i) => (
        <text
          key={i}
          x={s.x}
          y={s.y}
          fontSize={s.s * 0.35}
          fill={s.c === "navy" ? "#0a2240" : "#bf1e2e"}
          opacity="0.18"
          fontFamily="serif"
        >
          ★
        </text>
      ))}
    </svg>
  );
};

const PRIORITIES = [
  { n: "01", t: "Strong Communities", d: "Support the local institutions and volunteers that keep our towns strong." },
  { n: "02", t: "Agriculture & Rural Prosperity", d: "Stand with farmers and strengthen rural economies." },
  { n: "03", t: "Business Growth", d: "Support local employers and expand opportunity." },
  {
    n: "04",
    t: "Infrastructure & Essential Services",
    d: "Improve roads, strengthen infrastructure, and expand reliable internet access.",
  },
  { n: "05", t: "Opportunity for the Next Generation", d: "Help young people build their future right here at home." },
];

const ISSUES = [
  {
    t: "Community Leadership & Responsible Government",
    p: [
      "Families, farmers, homeowners, and local businesses all feel the pressure when costs keep rising. Bob will support efforts that ease the strain on working families and retirees without shifting that burden onto local businesses or weakening the services communities depend on. Government should respect taxpayers, spend carefully, and focus on the basics people count on every day.",
      "Bob believes leadership begins with listening carefully, and treating people with respect. He is running to represent District 25 faithfully, work with others, and keep his focus on solving problems.",
    ],
  },
  {
    t: "Agriculture & Rural Communities",
    p: [
      "Bob will stand up for family farmers and ranchers, support agriculture, protect the infrastructure needed to move products to market, and make sure rural voices are heard in Bismarck. He knows rural communities need steady advocacy and practical results.",
    ],
  },
  {
    t: "Business, Manufacturing & Local Jobs",
    p: [
      "Bob has spent his life in business, so he understands what it means to meet payroll, manage costs, serve customers, and keep going when margins are tight.",
      "He will support policies that help small businesses grow, reduce unnecessary burdens, strengthen the local workforce, and support the manufacturers and agricultural employers that keep this region moving.",
    ],
  },
  {
    t: "Infrastructure & Essential Services",
    p: [
      "Bob believes District 25 deserves fair investment and long-term planning for the services communities depend on every day. He supports safe, well-maintained roads and bridges, dependable utilities, expanded broadband, rural health care, emergency response, and other essential services that keep farms, families, seniors, workers, schools, and local businesses connected and secure.",
      "Strong communities need reliable physical and digital infrastructure, access to care, and the basic services that help people live, work, and thrive close to home.",
    ],
  },
  {
    t: "Schools, Opportunity & the Next Generation",
    p: [
      "Bob believes District 25 grows when young people can see a future here, when employers can find workers, and when families can afford to build a life and stay. He supports strong schools, workforce development, job training, housing growth, child care support, and practical policies that help communities recruit and retain the people they need.",
    ],
  },
];

const ACTIONS = [
  {
    t: "Donate",
    d: "Every contribution helps reach voters, grow the campaign, and share Bob's message across District 25.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    t: "Volunteer",
    d: "Dedicate any amount of time for an activity of your choice: community events, phone calls, door knocking, sign delivery, or administrative help.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0zM3 21a9 9 0 0 1 18 0" />
      </svg>
    ),
  },
  {
    t: "Host an Event",
    d: "Invite Bob to meet your neighbors, friends, business, church, organization, or community group.",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="16" rx="1" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </svg>
    ),
  },
  {
    t: "Request a Yard Sign",
    d: "Show your support and help neighbors learn more about Bob.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 4h12l4 5-4 5H4zM4 14v7" />
      </svg>
    ),
  },
  {
    t: "Stay Updated",
    d: "Receive campaign news, event updates, and important reminders.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 6h16v12H4zM4 6l8 7 8-7" />
      </svg>
    ),
  },
  {
    t: "Have an Idea? Let's Hear It",
    d: "Great ideas often come from the people who live and work here every day. Share your thoughts, concerns, or ideas for District 25.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12c1 1 1.5 2 1.5 3h5c0-1 .5-2 1.5-3a7 7 0 0 0-4-12z" />
      </svg>
    ),
  },
];

const MEDIA = [
  {
    t: "Press Releases",
    d: "Official announcements and statements from the campaign.",
    note: "Press release thumbnail",
  },
  { t: "Images", d: "Approved photos for media use and supporters.", note: "Image preview" },
  { t: "Videos", d: "Speeches, ads, and trail moments from across the district.", note: "Video thumbnail" },
  { t: "Logos", d: "Campaign logos and brand assets in multiple formats.", note: "Logo preview" },
  { t: "Bio", d: "Bob's full biography for press and event organizers.", note: "Document preview" },
  { t: "Platform", d: "The full platform document outlining priorities for District 25.", note: "Document preview" },
];

const Index = () => {
  const heroBgRef = useRef<HTMLDivElement>(null);
  const candidateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Nav shadow on scroll
    const nav = document.querySelector(".nav");
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 8) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Hamburger toggle
    const ham = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    const onHam = () => menu?.classList.toggle("open");
    ham?.addEventListener("click", onHam);
    const closeMenu = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "A") menu?.classList.remove("open");
    };
    menu?.addEventListener("click", closeMenu);

    // Donate amount toggle
    const amounts = document.querySelectorAll(".amount");
    const onAmount = (e: Event) => {
      amounts.forEach((b) => b.classList.remove("active"));
      (e.currentTarget as HTMLElement).classList.add("active");
    };
    amounts.forEach((b) => b.addEventListener("click", onAmount));

    // Fade-up observer
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".fade-up").forEach((el) => io.observe(el));

    // Trigger hero fade-up immediately (staggered)
    document.querySelectorAll(".hero .fade-up").forEach((el) => {
      requestAnimationFrame(() => el.classList.add("in"));
    });

    // Hero parallax on mouse move (disabled on mobile/touch)
    const isTouch = window.matchMedia("(max-width: 960px)").matches || window.matchMedia("(hover: none)").matches;
    const onMouseMove = (e: MouseEvent) => {
      if (isTouch) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (e.clientX / w - 0.5) * 2; // -1 .. 1
      const y = (e.clientY / h - 0.5) * 2;
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translate3d(${-x * 18}px, ${-y * 14}px, 0) scale(1.04)`;
      }
      if (candidateRef.current) {
        candidateRef.current.style.transform = `translate3d(${x * 10}px, ${y * 6}px, 0)`;
      }
    };
    if (!isTouch) window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      ham?.removeEventListener("click", onHam);
      menu?.removeEventListener("click", closeMenu);
      amounts.forEach((b) => b.removeEventListener("click", onAmount));
      io.disconnect();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* NAV */}
      <header className="nav" id="home">
        <div className="wrap">
          <a
            href="#home"
            className="brand"
            aria-label="Bob Heitkamp for Senate"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img src={logoImg} alt="Bob Heitkamp for Senate" className="brand-logo" />
          </a>
          <nav id="menu" className="menu" aria-label="Primary">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </a>
            <a href="#about">About</a>
            <a href="#issues">Issues</a>
            <a href="#action">Take Action</a>
            <a href="#media">Media</a>
            <a href="#donate" className="donate-btn">
              Donate
            </a>
          </nav>
          <button id="hamburger" className="hamburger" aria-label="Toggle menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" ref={heroBgRef} aria-hidden="true" />
        <div className="hero-candidate" ref={candidateRef}>
          <img src={candidateImg} alt="Bob Heitkamp, candidate for North Dakota State Senate District 25" />
        </div>
        <img src={heroOverlay} alt="" className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <span className="eyebrow fade-up">
            <span className="dash" /> <Star className="star" /> North Dakota · Dist 25 <Star className="star" />{" "}
            <span className="dash" />
          </span>
          <h1 className="fade-up delay-1">
            <span className="name">Bob Heitkamp</span>
            <em>for State Senate</em>
          </h1>
          <span className="tagline fade-up delay-2 in px-0">Proven Experience · Local Leadership · Forward Together</span>
          <p className="lede fade-up delay-3">
            A lifetime of building businesses, helping people, and serving our community. Your neighbor, ready to
            represent District 25 with experienced leadership and a strong voice for local families, farms, and small
            towns.
          </p>
          <div className="cta-row fade-up delay-4">
            <a href="#donate" className="btn btn-red">
              Donate <span className="arrow">→</span>
            </a>
            <a href="#action" className="btn btn-outline">
              Take Action
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <span className="section-eyebrow fade-up">
            <span className="dash" /> About Bob
          </span>
          <h2 className="section-title fade-up delay-1">
            A Leader Shaped by Real <em>Experience</em>, Faith, and Service
          </h2>
          <div className="about-grid">
            <aside className="quote-stack fade-up">
              <div className="gold-bar" aria-hidden="true" />
              <div className="quote-photo">
                <img src={bobQuoteImg} alt="Bob Heitkamp speaking with the community" />
              </div>
              <div className="quote-card">
                <span className="qmark">“</span>
                <blockquote>I love our corner of North Dakota and the people who make it strong.</blockquote>
                <cite>— Your friend, Bob</cite>
              </div>
            </aside>
            <div className="bio fade-up delay-1">
              <h3>Meet Bob</h3>
              <p>
                Bob Heitkamp is a familiar face across the prairies and small towns of North Dakota. A lifelong
                entrepreneur who started his first business at just sixteen years old, Bob understands the grit,
                determination, and long hours it takes to build something from the ground up.
              </p>
              <p>
                After studying at North Dakota State College of Science and Valley City State University, Bob went on to
                build and operate several local businesses in construction, retail, hospitality, and product
                development. He knows firsthand the challenges facing small businesses, the importance of strong
                infrastructure, and what it means to meet payroll, manage costs, and create jobs.
              </p>
              <div className="pull">
                Many people across the state know Bob through his work as Executive Director of Marketplace for Kids,
                where he has spent the last decade helping young people build confidence, leadership skills, and belief
                in their future.
              </div>
              <p>
                Bob is not a career politician; he is a neighbor who wants to make a difference. He is ready to bring
                his business mindset and community heart to Bismarck to ensure District 25 remains a place where
                families and businesses can thrive for generations to come.
              </p>
              <p>Bob is your friend, neighbor and will be your faithful senator.</p>
            </div>
          </div>

        </div>
      </section>

      {/* WHY I'M RUNNING (video placeholder) */}
      <section id="why">
        <div className="container">
          <div className="why-grid">
            <div className="why-text">
              <span className="section-eyebrow fade-up">
                <span className="dash" /> Why I'm Running
              </span>
              <h2 className="section-title fade-up delay-1" style={{ marginBottom: 32 }}>
                For the Extraordinary People of <em>District 25</em>
              </h2>
              <div className="fade-up delay-2">
                <p>
                  I care deeply about what happens here. I've heard from farmers facing rising costs and uncertainty.
                  I've talked with small business owners working every day to keep their doors open and create jobs.
                  I've met families who want their children to have every opportunity to succeed and stay here to build
                  a life.
                </p>
                <p>
                  I'm running to help keep small towns strong, protect local schools, maintain roads, improve
                  infrastructure, and make sure District 25 has a strong voice.
                </p>
                <p>
                  I'll listen carefully, treat people with respect and focus on common-sense solutions that help our
                  communities thrive.
                </p>
                <p className="quote-blue text-white bg-secondary-foreground">
                  For the extraordinary people of District 25, I'm here for you.
                </p>
              </div>
            </div>
            <div className="why-video-wrap">
              <div className="video-frame fade-up delay-1" aria-label="Campaign video — coming soon">
                <span className="play-btn" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="video-cap">Campaign Video — Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIORITIES */}
      <section id="priorities">
        <div className="container">
          <div className="priorities-head">
            <div>
              <span className="section-eyebrow fade-up">
                <span className="dash" /> Priorities
              </span>
              <h2 className="section-title fade-up delay-1">
                Priorities for <em>District 25</em>
              </h2>
            </div>
            <p className="fade-up delay-2">
              Five focused commitments to keep our towns strong, our farms thriving, and our families forward —
              together.
            </p>
          </div>
          <div className="cards">
            {PRIORITIES.map((p, i) => (
              <article key={p.n} className={`card fade-up delay-${(i % 5) + 1}`}>
                <h4>{p.t}</h4>
                <p>{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ISSUES */}
      <section id="issues">
        <div className="container">
          <div className="issues-hero fade-up">
            <img src={bobIssuesImg} alt="Bob Heitkamp at Marketplace for Kids" />
            <div className="issues-hero-overlay" />
            <div className="issues-hero-content">
              <h2 className="section-title issues-hero-title">
                <em>Issues</em>
              </h2>
            </div>
          </div>
          <div className="issues-grid">
            {ISSUES.map((it, i) => (
              <div key={it.t} className={`issue fade-up delay-${(i % 5) + 1}`}>
                <h4>{it.t}</h4>
                {it.p.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="closing-band fade-up">
            <p>
              Bob brings a business mindset, a community heart, and a clear commitment to common-sense leadership that
              moves District 25 forward.
            </p>
          </div>
        </div>
      </section>

      {/* TAKE ACTION */}
      <section id="action">
        <div className="container">
          <span className="section-eyebrow fade-up">
            <span className="dash" /> Take Action
          </span>
          <h2 className="section-title fade-up delay-1">
            Join the <em>Campaign</em>
          </h2>
          <div className="action-cards">
            {ACTIONS.map((a, i) => (
              <article key={a.t} className={`action-card fade-up delay-${(i % 5) + 1}`}>
                <span className="icon">{a.icon}</span>
                <h5>{a.t}</h5>
                <p>{a.d}</p>
              </article>
            ))}
          </div>

          <form className="action-form fade-up" onSubmit={(e) => e.preventDefault()}>
            <h4>Get Involved</h4>
            <p className="sub">Tell us how you'd like to help and we'll be in touch.</p>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="n">Name</label>
                <input id="n" type="text" placeholder="Your full name" />
              </div>
              <div className="field">
                <label htmlFor="e">Email</label>
                <input id="e" type="email" placeholder="you@example.com" />
              </div>
              <div className="field">
                <label htmlFor="p">Phone</label>
                <input id="p" type="tel" placeholder="(701) 555-0100" />
              </div>
              <div className="field">
                <label htmlFor="z">ZIP Code</label>
                <input id="z" type="text" placeholder="58000" />
              </div>
            </div>
            <div className="checks">
              {ACTIONS.map((a) => (
                <label key={a.t} className="check">
                  <input type="checkbox" />
                  <span>{a.t}</span>
                </label>
              ))}
            </div>
            <div className="submit-row">
              <button type="submit" className="btn btn-red">
                Submit <span className="arrow">→</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* MEDIA */}
      <section id="media">
        <div className="container">
          <span className="section-eyebrow fade-up">
            <span className="dash" /> Media
          </span>
          <h2 className="section-title fade-up delay-1">
            Press, Photos &amp; <em>Resources</em>
          </h2>
          <div className="media-grid">
            {MEDIA.map((m, i) => (
              <article key={m.t} className={`media-card fade-up delay-${(i % 5) + 1}`}>
                <div className="ph">{m.note}</div>
                <h5>{m.t}</h5>
                <p>{m.d}</p>
                <a className="more" href="#">
                  View <span>→</span>
                </a>
              </article>
            ))}
          </div>

          <div className="social-row fade-up">
            <a href="#" aria-label="Facebook">
              {SOCIAL_ICONS.facebook}
            </a>
            <a href="#" aria-label="Instagram">
              {SOCIAL_ICONS.instagram}
            </a>
            <a href="#" aria-label="YouTube">
              {SOCIAL_ICONS.youtube}
            </a>
            <a href="#" aria-label="TikTok">
              {SOCIAL_ICONS.tiktok}
            </a>
          </div>
        </div>
      </section>

      {/* DONATE */}
      <section id="donate">
        <div className="star-strip top" aria-hidden="true">
          {Array.from({ length: 22 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <div className="star-strip bot" aria-hidden="true">
          {Array.from({ length: 22 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
        <div className="container fade-up">
          <h2>
            Donate to <em>Bob</em>
          </h2>
          <p className="blurb">
            Your contribution helps reach voters, grow the campaign, and share Bob's message across District 25.
          </p>
          <div className="amounts">
            {["$10", "$25", "$50", "$100", "$200"].map((a) => (
              <button key={a} className={`amount ${a === "$50" ? "active" : ""}`}>
                {a}
              </button>
            ))}
          </div>
          <div>
            <button className="donate-cta">
              Donate Now <span className="star">★</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="foot-grid">
          <div className="foot-brand">
            <img src={logoImg} alt="Bob Heitkamp for Senate" className="foot-logo" />
            <h4>Bob Heitkamp</h4>
            <p>Proven Experience · Local Leadership · Forward Together</p>
          </div>
          <div className="foot-col">
            <h5>Campaign</h5>
            <ul>
              <li>
                <a href="#about">About Bob</a>
              </li>
              <li>
                <a href="#issues">Issues</a>
              </li>
              <li>
                <a href="#priorities">Priorities</a>
              </li>
              <li>
                <a href="#action">Take Action</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Resources</h5>
            <ul>
              <li>
                <a href="#media">Press Releases</a>
              </li>
              <li>
                <a href="#media">Images & Logos</a>
              </li>
              <li>
                <a href="#media">Bio</a>
              </li>
              <li>
                <a href="#media">Platform</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Follow</h5>
            <ul>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">YouTube</a>
              </li>
              <li>
                <a href="#">TikTok</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>Paid for by Bob Heitkamp for North Dakota Senate District 25.</span>
          <span>© {new Date().getFullYear()} Bob Heitkamp for Senate</span>
        </div>
      </footer>
    </>
  );
};

export default Index;
