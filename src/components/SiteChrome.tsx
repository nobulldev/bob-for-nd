import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logoImg from "@/assets/logo.png";
import nobullImg from "@/assets/nobull.svg";
import "./SiteChrome.css";

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61576634976767",
  instagram: "https://www.instagram.com/vote4bob26/",
  youtube: "https://www.youtube.com/channel/UCbAtqwDwr7iK8L3yU3Nst0Q",
};

export const SiteHeader = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const onHomePage = location.pathname === "/";
  const sectionHref = (section: string) => `${onHomePage ? "" : "/"}#${section}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname, location.hash]);

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onHomePage) return;
    event.preventDefault();
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`} id={onHomePage ? "home" : undefined}>
      <div className="wrap">
        <a href={onHomePage ? "#home" : "/"} className="brand" aria-label="Bob Heitkamp for Senate" onClick={handleHomeClick}>
          <img src={logoImg} alt="Bob Heitkamp for Senate" className="brand-logo" />
        </a>
        <nav id="menu" className={`menu${menuOpen ? " open" : ""}`} aria-label="Primary">
          <a href={onHomePage ? "#home" : "/"} onClick={handleHomeClick}>Home</a>
          <a href={sectionHref("about")} onClick={() => setMenuOpen(false)}>About</a>
          <a href={sectionHref("issues")} onClick={() => setMenuOpen(false)}>Issues</a>
          <a href={sectionHref("action")} onClick={() => setMenuOpen(false)}>Take Action</a>
          <a href={sectionHref("media")} onClick={() => setMenuOpen(false)}>Media</a>
          <a
            href="https://secure.actblue.com/donate/bob-heitkamp"
            target="_blank"
            rel="noopener noreferrer"
            className="donate-btn"
            onClick={() => setMenuOpen(false)}
          >
            Donate
          </a>
        </nav>
        <button
          type="button"
          id="hamburger"
          className="hamburger"
          aria-label="Toggle menu"
          aria-controls="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export const SiteFooter = () => (
  <>
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
            <li><a href="/#about">About Bob</a></li>
            <li><a href="/#issues">Issues</a></li>
            <li><a href="/#action">Take Action</a></li>
          </ul>
        </div>
        <div className="foot-col">
          <h5>Resources</h5>
          <ul>
            <li><a href="/#media">Press Releases</a></li>
            <li><a href="/#media">Images &amp; Logos</a></li>
            <li><a href="/#media">Bio</a></li>
            <li><a href="/#media">Platform</a></li>
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
        <span>Paid for by Bob Heitkamp for North Dakota Senate District 25.<br />Some campaign media may include AI-assisted or digitally enhanced content.<br />Julie Prochnow - Treasurer.</span>
        <span>© {new Date().getFullYear()} Bob Heitkamp for Senate</span>
      </div>
    </footer>
    <a href="https://nobull-strategies.com/" target="_blank" rel="noopener noreferrer" className="nobull-credit">
      <img src={nobullImg} alt="NoBull Strategies" />
      <p>Created by NoBull Strategies<br />nobull-strategies.com</p>
    </a>
  </>
);
