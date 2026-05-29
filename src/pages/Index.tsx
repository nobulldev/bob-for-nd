import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.png";
import heroOverlay from "@/assets/hero-overlay.png";
import candidateImg from "@/assets/candidate.png";
import logoImg from "@/assets/logo.png";
import bobQuoteImg from "@/assets/bob-quote.jpg";
import bobIssuesImg from "@/assets/bob-issues.png";
import mediaPressImg from "@/assets/media-press.png";
import mediaImagesImg from "@/assets/media-images.png";
import mediaLogosImg from "@/assets/media-logos.png";
import mediaBioImg from "@/assets/section-bio.png";
import mediaPlatformImg from "@/assets/section-platform.png";
import videoThumbImg from "@/assets/section-video.png";
import timeline01Img from "@/assets/timeline-01-cabinets.png";
import timeline02Img from "@/assets/timeline-02-blazer.png";
import timeline03Img from "@/assets/timeline-03-midwest.png";
import timeline04Img from "@/assets/timeline-04-icecream.png";
import timeline05Img from "@/assets/timeline-05-poets.png";
import timeline06Img from "@/assets/timeline-06-kids.png";
import nobullImg from "@/assets/nobull.png";

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
  padding:40px 36px 18vh;
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
.btn-gold{background:var(--gold);color:var(--navy);border-color:var(--gold)}
.btn-gold:hover{background:#e8c030;border-color:#e8c030}
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
  font-family:'Inter',system-ui,sans-serif;font-style:italic;
  font-size:24px;line-height:1.4;color:var(--cream);
}
.quote-card cite{
  display:block;margin-top:22px;font-style:normal;
  font-family:'Oswald',sans-serif;text-transform:uppercase;
  font-size:12px;letter-spacing:.22em;color:var(--gold);
}
/* Reusable Bob quote (blue plate + yellow right line) */
.quote-blue{
  background:var(--navy);color:#ffffff;
  border-right:6px solid var(--gold);
  padding:28px 30px;margin-top:28px;
  font-family:'Playfair Display',serif;font-style:italic;font-weight:300;
  font-size:22px;line-height:1.35;
  box-shadow:0 20px 40px -24px rgba(10,34,64,.4);
}
.quote-blue.text-white{color:#ffffff !important}
.bio h3{
  font-family:'Playfair Display',serif;font-weight:800;color:var(--navy);
  font-size:36px;margin-bottom:22px;
}
.bio p{margin-bottom:20px;color:#3a3a3a;font-size:17px;line-height:1.75}
.bio p:first-of-type::first-letter{
  font-family:'Playfair Display',serif;font-weight:900;
  color:var(--red);font-size:64px;line-height:.85;
  float:left;padding: 0px 12px 0 0;
}
.bio .pull{
  border-left:4px solid var(--gold);
  padding:6px 0 6px 22px;margin:28px 0;
  font-family:'Inter',system-ui,sans-serif;font-style:italic;
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
.action-card{cursor:pointer}
.action-card:hover{background:rgba(255,255,255,.07);border-color:var(--gold);transform:translateY(-4px)}
.action-card .icon{
  width:48px;height:48px;background:var(--red);
  display:flex;align-items:center;justify-content:center;color:var(--cream);
}
.action-card .icon svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:2}
.action-card h5{
  font-family:'Inter',system-ui,sans-serif;font-weight:800;font-size:22px;color:var(--cream);
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
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  align-items:center;
}
.chip{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:10px 18px;
  background:#fff;
  border:1.5px solid rgba(10,34,64,.2);
  border-radius:999px;
  font-family:'Inter',sans-serif;
  font-size:14px;
  font-weight:500;
  line-height:1;
  color:var(--ink);
  cursor:pointer;
  transition:background .2s,border-color .2s,color .2s,box-shadow .2s,transform .15s;
  white-space:nowrap;
  user-select:none;
}
.chip:hover{border-color:var(--navy);color:var(--navy)}
.chip[aria-pressed="true"]{
  background:var(--red);
  border-color:var(--red);
  color:#fff;
  box-shadow:0 4px 12px rgba(191,30,46,.25);
}
.chip[aria-pressed="true"]:hover{color:#fff}
.chip .chip-check{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width:14px;
  height:14px;
  border-radius:50%;
  border:1.5px solid currentColor;
  font-size:9px;
  line-height:1;
  opacity:.5;
}
.chip[aria-pressed="true"] .chip-check{
  background:#fff;
  color:var(--red);
  border-color:#fff;
  opacity:1;
}
.action-form .submit-row{margin-top:28px;display:flex;justify-content:flex-end}

/* ---------- Media ---------- */
.media-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:54px}
.media-card{
  background:var(--cream-2);border:1px solid rgba(10,34,64,.1);
  padding:26px;display:flex;flex-direction:column;gap:18px;
  transition:transform .2s, box-shadow .2s, border-color .2s;
}
.media-card--compact:hover{transform:none;box-shadow:none;border-color:rgba(10,34,64,.1)}
.media-card .ph{
  aspect-ratio:1/1;background:var(--placeholder);
  display:flex;align-items:center;justify-content:center;
  color:var(--placeholder-ink);font-family:'Oswald',sans-serif;
  text-transform:uppercase;font-size:11px;letter-spacing:.22em;
  overflow:hidden;
}
.media-card .ph img{width:100%;height:100%;object-fit:cover;display:block}
.media-card h5{
  font-family:'Playfair Display',serif;font-weight:800;color:var(--navy);font-size:22px;
}
.media-card p{color:var(--muted);font-size:14.5px}
.media-card .more{
  font-family:'Oswald',sans-serif;text-transform:uppercase;font-size:12px;letter-spacing:.22em;
  color:var(--red);display:inline-flex;align-items:center;gap:8px;
}
.media-card--compact{gap:14px;padding-bottom:22px;cursor:pointer}
.media-card--compact h5{text-align:center}
.media-cta{margin-top:48px;display:flex;justify-content:center}

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

/* ---------- Footer ---------- */
footer{background:var(--navy);color:var(--cream);padding:72px 28px 28px}

/* ---------- NoBull credit ---------- */
.nobull-credit{
  background:var(--navy);
  padding:24px 28px;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:10px;
}
.nobull-credit img{height:auto;width:146.82px;display:block}
.nobull-credit p{
  font-family:'Inter',system-ui,sans-serif;
  font-weight:400;
  font-size:14.5px;
  line-height:23.93px;
  color:rgba(245,239,228,.78);
  text-align:center;
  margin:0;
}
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
  .hero-content > .cta-row{order:7;padding:0 10px;margin:24px 10px 32px;display:flex;position:relative;z-index:10}
  .hero-overlay{position:absolute;left:0;right:0;bottom:0;width:100%;max-width:100%;transform:none;margin:0;display:block;z-index:2;pointer-events:none}
  .hero{padding-bottom:18vw}
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
  .checks{gap:8px}
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
  .checks{gap:8px}
  .quote-card blockquote{font-size:21px}
  .closing-band p{font-size:20px}
  #donate{padding:70px 14px}
  .amount{padding:12px 18px;font-size:14px}
}
/* ---------- Business History ---------- */
#history{background:#f7f1e6;padding:90px 0 !important;overflow:hidden;font-family:Arial,sans-serif}
.history-layout{
  display:flex;max-width:1600px;margin:0 auto;min-height:720px;
  border:1px solid rgba(3,31,81,.12);background:#f3ebdc;
  box-shadow:0 30px 70px rgba(0,0,0,.08);
}
.history-side{
  width:390px;min-width:390px;padding:70px 44px;
  background:#f3ebdc;border-right:1px solid rgba(3,31,81,.12);
  display:flex;flex-direction:column;box-sizing:border-box;
}
.history-side h2{
  font-family:'Playfair Display',Georgia,serif;font-size:62px;line-height:.95;
  margin:0 0 34px;color:var(--navy);font-weight:900;
}
.history-side>p{font-size:22px;line-height:1.6;margin:0;color:var(--muted)}
.history-side-arrows{display:flex;gap:14px;margin-top:34px}
.history-main{position:relative;flex:1 1 0;min-width:0;background:#f3ebdc}
.history-scroll{height:100%;overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth}
.history-scroll::-webkit-scrollbar{height:8px}
.history-scroll::-webkit-scrollbar-track{background:rgba(3,31,81,.08)}
.history-scroll::-webkit-scrollbar-thumb{background:var(--navy)}
.history-track{display:flex;height:100%;min-width:max-content}
.history-card{
  width:360px;padding:70px 36px 38px;border-right:1px solid rgba(3,31,81,.12);
  position:relative;background:#f3ebdc;
  transition:background .35s,color .35s;
  box-sizing:border-box;display:flex;flex-direction:column;
}
.history-card::before{
  content:"";position:absolute;top:0;left:0;right:0;height:7px;
  background:transparent;transition:background .35s;
}
.history-card:hover{background:#c44736;color:#fff}
.history-card:hover::before{background:#f2c433}
.history-card:hover h3,.history-card:hover>p,
.history-card:hover .history-duration,.history-card:hover .history-year{color:#fff}
.history-year{
  font-size:46px;font-weight:900;color:var(--navy);
  margin-bottom:38px;line-height:1;transition:color .35s;
}
.history-card h3{
  font-family:'Playfair Display',Georgia,serif;font-size:36px;line-height:1;
  margin:0 0 20px;color:var(--navy);transition:color .35s;
}
.history-duration{
  font-size:21px;font-weight:700;margin-bottom:20px;
  color:var(--red);transition:color .35s;
}
.history-card>p{
  font-size:18px;line-height:1.55;color:var(--muted);
  margin:0 0 34px;transition:color .35s;
}
.history-image{
  margin-top:auto;width:100%;aspect-ratio:1/1;
  background:rgba(3,31,81,.08);box-sizing:border-box;overflow:hidden;
}
.history-image img{width:100%;height:100%;display:block;object-fit:cover}
.history-arrow{
  width:54px;height:54px;border-radius:50%;
  border:1px solid rgba(3,31,81,.2);background:#f7f1e6;
  color:var(--navy);cursor:pointer;
  box-shadow:0 12px 28px rgba(0,0,0,.12);
  transition:background .25s,color .25s,border-color .25s;
  display:flex;align-items:center;justify-content:center;padding:0;
}
.history-arrow span{display:block;font-size:38px;line-height:1;transform:translateY(-3px)}
.history-arrow:hover{background:var(--navy);color:#fff;border-color:var(--navy)}
@media(max-width:1200px){
  .history-layout{flex-direction:column}
  .history-side{width:100%;min-width:100%;padding:50px 30px;border-right:none;border-bottom:1px solid rgba(3,31,81,.12)}
  .history-side h2{font-size:52px;max-width:900px}
  .history-side>p{max-width:900px}
  .history-main{min-height:640px}
}
@media(max-width:640px){
  #history{padding:50px 0 !important}
  .history-side{padding:35px 24px}
  .history-side h2{font-size:42px;margin-bottom:24px}
  .history-side>p{font-size:18px}
  .history-side-arrows{margin-top:28px}
  .history-main{min-height:720px}
  .history-card{width:300px;padding:48px 26px 28px}
  .history-year{font-size:36px;margin-bottom:30px}
  .history-card h3{font-size:30px}
  .history-duration{font-size:19px}
  .history-card>p{font-size:16px;margin-bottom:28px}
  .history-arrow{width:44px;height:44px}
  .history-arrow span{font-size:32px}
}

/* Wider content + slightly larger text on mobile */
@media (max-width:960px){
  body{font-size:18px}
  section{padding:72px 12px !important}
  .nav .wrap{padding:12px 12px}
  .hero-content > .eyebrow,
  .hero-content > h1,
  .hero-content > .tagline{padding-left:12px;padding-right:12px}
  .hero-content > .lede{padding:0 12px}
  .hero-content > .cta-row{padding:0 6px;margin:24px 6px 32px}
  .hero-candidate{width:calc(100% - 24px);margin:18px 12px 0}
  .closing-band{padding:34px 18px}
  .action-form{padding:32px 16px}
  .foot-grid{padding:0 12px}
  .foot-bottom{padding-left:12px;padding-right:12px}
  .bio p{font-size:18px}
  .why-text p{font-size:18px}
  #donate .blurb{font-size:18px}
  .quote-blue{font-size:23px;padding:28px 24px}
  .menu a{font-size:14px}
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
};

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61576634976767",
  instagram: "https://www.instagram.com/votebob26/",
  youtube: "https://www.youtube.com/channel/UCbAtqwDwr7iK8L3yU3Nst0Q",
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
    hideFromForm: true,
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
      <svg viewBox="0 0 24 24" style={{fill:'none',stroke:'none'}}>
        <mask id="vol-mask" fill="white">
          <path d="M16.0377 7.3291C16.0377 6.26824 15.6163 5.25082 14.8661 4.50067C14.116 3.75053 13.0986 3.3291 12.0377 3.3291C10.9768 3.3291 9.95941 3.75053 9.20926 4.50067C8.45912 5.25082 8.03769 6.26824 8.03769 7.3291C8.03769 8.38997 8.45912 9.40738 9.20926 10.1575C9.95941 10.9077 10.9768 11.3291 12.0377 11.3291C13.0986 11.3291 14.116 10.9077 14.8661 10.1575C15.6163 9.40738 16.0377 8.38997 16.0377 7.3291ZM3 21.0004C3 18.6134 3.94821 16.3242 5.63604 14.6364C7.32387 12.9486 9.61305 12.0004 12 12.0004C14.3869 12.0004 16.6761 12.9486 18.364 14.6364C20.0518 16.3242 21 18.6134 21 21.0004"/>
        </mask>
        <path d="M16.0377 7.3291H18.0377H16.0377ZM12.0377 3.3291V1.3291V3.3291ZM8.03769 7.3291H6.03769H8.03769ZM12.0377 11.3291V13.3291V11.3291ZM16.0377 7.3291H18.0377C18.0377 5.7378 17.4056 4.21168 16.2803 3.08646L14.8661 4.50067L13.4519 5.91489C13.827 6.28996 14.0377 6.79867 14.0377 7.3291H16.0377ZM14.8661 4.50067L16.2803 3.08646C15.1551 1.96124 13.629 1.3291 12.0377 1.3291V3.3291V5.3291C12.5681 5.3291 13.0768 5.53982 13.4519 5.91489L14.8661 4.50067ZM12.0377 3.3291V1.3291C10.4464 1.3291 8.92027 1.96124 7.79505 3.08646L9.20926 4.50067L10.6235 5.91489C10.9986 5.53982 11.5073 5.3291 12.0377 5.3291V3.3291ZM9.20926 4.50067L7.79505 3.08646C6.66983 4.21168 6.03769 5.7378 6.03769 7.3291H8.03769H10.0377C10.0377 6.79867 10.2484 6.28996 10.6235 5.91489L9.20926 4.50067ZM8.03769 7.3291H6.03769C6.03769 8.9204 6.66983 10.4465 7.79505 11.5717L9.20926 10.1575L10.6235 8.74332C10.2484 8.36824 10.0377 7.85953 10.0377 7.3291H8.03769ZM9.20926 10.1575L7.79505 11.5717C8.92027 12.697 10.4464 13.3291 12.0377 13.3291V11.3291V9.3291C11.5073 9.3291 10.9986 9.11839 10.6235 8.74332L9.20926 10.1575ZM12.0377 11.3291V13.3291C13.629 13.3291 15.1551 12.697 16.2803 11.5717L14.8661 10.1575L13.4519 8.74332C13.0768 9.11839 12.5681 9.3291 12.0377 9.3291V11.3291ZM14.8661 10.1575L16.2803 11.5717C17.4056 10.4465 18.0377 8.9204 18.0377 7.3291H16.0377H14.0377C14.0377 7.85953 13.827 8.36824 13.4519 8.74332L14.8661 10.1575ZM3 21.0004H5C5 19.1439 5.7375 17.3634 7.05025 16.0506L5.63604 14.6364L4.22183 13.2222C2.15893 15.2851 1 18.083 1 21.0004H3ZM5.63604 14.6364L7.05025 16.0506C8.363 14.7379 10.1435 14.0004 12 14.0004V12.0004V10.0004C9.08263 10.0004 6.28474 11.1593 4.22183 13.2222L5.63604 14.6364ZM12 12.0004V14.0004C13.8565 14.0004 15.637 14.7379 16.9497 16.0506L18.364 14.6364L19.7782 13.2222C17.7153 11.1593 14.9174 10.0004 12 10.0004V12.0004ZM18.364 14.6364L16.9497 16.0506C18.2625 17.3634 19 19.1439 19 21.0004H21H23C23 18.083 21.8411 15.2851 19.7782 13.2222L18.364 14.6364Z" style={{fill:'white'}} mask="url(#vol-mask)"/>
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

const MEDIA: { t: string; d: string; note: string; img?: string; href: string; external?: boolean }[] = [
  {
    t: "Press Releases",
    d: "Official announcements and statements from the campaign.",
    note: "Press release thumbnail",
    img: mediaPressImg,
    href: "https://votebob26.com/assets/presskit/release.pdf",
    external: true,
  },
  { t: "Images", d: "Approved photos for media use and supporters.", note: "Image preview", img: mediaImagesImg, href: "/press" },
  { t: "Videos", d: "Speeches, ads, and trail moments from across the district.", note: "Video thumbnail", img: videoThumbImg, href: "https://www.youtube.com/channel/UCbAtqwDwr7iK8L3yU3Nst0Q", external: true },
  { t: "Logos", d: "Campaign logos and brand assets in multiple formats.", note: "Logo preview", img: mediaLogosImg, href: "/press" },
  { t: "Bio", d: "Bob's full biography for press and event organizers.", note: "Document preview", img: mediaBioImg, href: "https://votebob26.com/assets/presskit/bio.pdf", external: true },
  { t: "Platform", d: "The full platform document outlining priorities for District 25.", note: "Document preview", img: mediaPlatformImg, href: "https://votebob26.com/assets/presskit/platform.pdf", external: true },
];

const HISTORY = [
  { years: "1982–2022", dur: "40 years", t: "Bob Heitkamp Cabinets & Construction", d: "Construction, cabinetry, and workforce leadership", img: timeline01Img },
  { years: "1994–2017", dur: "23 years", t: "Blazer Express", d: "Gas station/convenience store", img: timeline02Img },
  { years: "2010–2016", dur: "6 years", t: "Midwest Applied Technologies", d: "Technology and applied business operations", img: timeline03Img },
  { years: "2013–2023", dur: "10 years", t: "Beyond Ice Cream", d: "Consumer retail and food business", img: timeline04Img },
  { years: "2015–2017", dur: "2 years", t: "Poet's Warehouse Liquors", d: "Retail and liquor operations", img: timeline05Img },
  { years: "2016–2026", dur: "10 years", t: "Executive Director — Marketplace for Kids", d: "Statewide education and youth leadership organization", img: timeline06Img },
];

const WEB3FORMS_KEY = "0a519a1e-3432-4f6d-b41c-687968737c88";

const Index = () => {
  const heroBgRef = useRef<HTMLDivElement>(null);
  const candidateRef = useRef<HTMLDivElement>(null);
  const historyScrollRef = useRef<HTMLDivElement>(null);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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
          <p className="lede fade-up delay-3 font-semibold">
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
            A Leader Shaped by Real <em>Experience</em>
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

      {/* BUSINESS HISTORY */}
      <section id="history">
        <div className="history-layout">
          <div className="history-side">
            <h2>How You Know Me</h2>
            <p>I spent my entire life building businesses, creating jobs, and helping communities across North Dakota.</p>
            <div className="history-side-arrows">
              <button
                className="history-arrow"
                aria-label="Scroll left"
                onClick={() => { if (historyScrollRef.current) historyScrollRef.current.scrollLeft -= 380; }}
              >
                <span>‹</span>
              </button>
              <button
                className="history-arrow"
                aria-label="Scroll right"
                onClick={() => { if (historyScrollRef.current) historyScrollRef.current.scrollLeft += 380; }}
              >
                <span>›</span>
              </button>
            </div>
          </div>
          <div className="history-main">
            <div className="history-scroll" ref={historyScrollRef}>
              <div className="history-track">
                {HISTORY.map((h) => (
                  <div key={h.t} className="history-card">
                    <div className="history-year">{h.years}</div>
                    <h3>{h.t}</h3>
                    <div className="history-duration">{h.dur}</div>
                    <p>{h.d}</p>
                    <div className="history-image">
                      <img src={h.img} alt={h.t} loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
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
                <p className="quote-blue bg-secondary-foreground text-white">
                  I'm running to listen, work hard, and protect the future of our communities.
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
          <a
            href="https://secure.actblue.com/donate/bob-heitkamp"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
            style={{ marginTop: "32px", display: "inline-block" }}
          >
            Donate Now →
          </a>
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
              <article
                key={a.t}
                className={`action-card fade-up delay-${(i % 5) + 1}`}
                onClick={() => {
                  if (a.hideFromForm) {
                    window.open("https://secure.actblue.com/donate/bob-heitkamp", "_blank", "noopener,noreferrer");
                  } else {
                    setSelectedActions((prev) => prev.includes(a.t) ? prev : [...prev, a.t]);
                    document.querySelector(".action-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                <span className="icon">{a.icon}</span>
                <h5>{a.t}</h5>
                <p>{a.d}</p>
              </article>
            ))}
          </div>

          <form
            className="action-form fade-up"
            onSubmit={async (e) => {
              e.preventDefault();
              if (selectedActions.length === 0) {
                alert("Please select at least one way you'd like to help.");
                return;
              }
              const form = e.currentTarget;
              const name = (form.elements.namedItem("n") as HTMLInputElement).value.trim();
              const email = (form.elements.namedItem("e") as HTMLInputElement).value.trim();
              const phone = (form.elements.namedItem("p") as HTMLInputElement).value.trim();
              const zip = (form.elements.namedItem("z") as HTMLInputElement).value.trim();
              setFormStatus("sending");
              try {
                const res = await fetch("https://api.web3forms.com/submit", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", Accept: "application/json" },
                  body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    subject: `Get Involved — ${name}`,
                    from_name: name,
                    name,
                    email,
                    phone,
                    zip_code: zip,
                    interested_in: selectedActions.join(", "),
                  }),
                });
                const data = await res.json();
                if (data.success) {
                  setFormStatus("success");
                  form.reset();
                  setSelectedActions([]);
                } else {
                  setFormStatus("error");
                }
              } catch {
                setFormStatus("error");
              }
            }}
          >
            <h4>Get Involved</h4>
            <p className="sub">Tell us how you'd like to help and we'll be in touch.</p>

            {formStatus === "success" ? (
              <div style={{ padding: "32px 0", textAlign: "center" }}>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, color: "var(--navy)", fontWeight: 800, marginBottom: 10 }}>
                  Thank you!
                </p>
                <p style={{ color: "var(--muted)", fontSize: 16 }}>
                  We received your message and will be in touch soon.
                </p>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ marginTop: 20, borderColor: "var(--navy)", color: "var(--navy)" }}
                  onClick={() => setFormStatus("idle")}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <>
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="n">Name *</label>
                    <input id="n" name="n" type="text" placeholder="Your full name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="e">Email *</label>
                    <input id="e" name="e" type="email" placeholder="you@example.com" required />
                  </div>
                  <div className="field">
                    <label htmlFor="p">Phone *</label>
                    <input id="p" name="p" type="tel" placeholder="(701) 555-0100" required />
                  </div>
                  <div className="field">
                    <label htmlFor="z">ZIP Code *</label>
                    <input id="z" name="z" type="text" placeholder="58000" required pattern="\d{5}(-\d{4})?" />
                  </div>
                </div>
                <div className="checks" role="group" aria-label="How would you like to help? (select at least one)">
                  {ACTIONS.filter((a) => !a.hideFromForm).map((a) => {
                    const active = selectedActions.includes(a.t);
                    return (
                      <button
                        type="button"
                        key={a.t}
                        className="chip"
                        aria-pressed={active}
                        onClick={() =>
                          setSelectedActions((prev) =>
                            prev.includes(a.t) ? prev.filter((x) => x !== a.t) : [...prev, a.t],
                          )
                        }
                      >
                        <span className="chip-check" aria-hidden="true">{active ? "✓" : ""}</span>
                        <span>{a.t}</span>
                      </button>
                    );
                  })}
                </div>
                {formStatus === "error" && (
                  <p style={{ color: "var(--red)", marginTop: 16, fontSize: 14 }}>
                    Something went wrong. Please try again or email us directly at votebob26@gmail.com.
                  </p>
                )}
                <div className="submit-row">
                  <button type="submit" className="btn btn-red" disabled={formStatus === "sending"}>
                    {formStatus === "sending" ? "Sending…" : "Submit"} <span className="arrow">→</span>
                  </button>
                </div>
              </>
            )}
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
              m.external ? (
                <a key={m.t} href={m.href} target="_blank" rel="noopener noreferrer" className={`media-card media-card--compact fade-up delay-${(i % 5) + 1}`}>
                  <div className="ph">
                    {m.img ? (
                      <img src={m.img} alt={m.t} loading="lazy" />
                    ) : (
                      m.note
                    )}
                  </div>
                  <h5>{m.t}</h5>
                </a>
              ) : (
                <Link key={m.t} to={m.href} className={`media-card media-card--compact fade-up delay-${(i % 5) + 1}`}>
                  <div className="ph">
                    {m.img ? (
                      <img src={m.img} alt={m.t} loading="lazy" />
                    ) : (
                      m.note
                    )}
                  </div>
                  <h5>{m.t}</h5>
                </Link>
              )
            ))}
          </div>

          <div className="media-cta fade-up">
            <Link to="/press" className="btn btn-red">
              View All <span className="arrow">→</span>
            </Link>
          </div>

          <div className="social-row fade-up">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              {SOCIAL_ICONS.facebook}
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              {SOCIAL_ICONS.instagram}
            </a>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              {SOCIAL_ICONS.youtube}
            </a>
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
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>Paid for by Bob Heitkamp for North Dakota Senate District 25. <br />Some campaign media may include AI-assisted or digitally enhanced content. <br />Julie Prochnow - Treasurer.</span>
          <span>© {new Date().getFullYear()} Bob Heitkamp for Senate</span>
        </div>
      </footer>

      {/* NOBULL CREDIT */}
      <a href="https://nobull-strategies.com/" target="_blank" rel="noopener noreferrer" className="nobull-credit">
        <img src={nobullImg} alt="NoBull Strategies" />
        <p>Created by NoBull Strategies<br />nobull-strategies.com</p>
      </a>
    </>
  );
};

export default Index;
