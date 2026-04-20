import { useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import logoImg from "@/assets/logo.png";
import { SITE_STYLES } from "./styles";

const FOOTER_TAGLINE = "Vote Bob. Proven Experience. Local Leadership. Forward Together.";

const SiteLayout = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  useEffect(() => {
    // Nav scroll shadow
    const nav = document.querySelector(".nav");
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 8) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Hamburger
    const ham = document.getElementById("hamburger");
    const menu = document.getElementById("menu");
    const onHam = () => menu?.classList.toggle("open");
    ham?.addEventListener("click", onHam);
    const closeMenu = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "A") menu?.classList.remove("open");
    };
    menu?.addEventListener("click", closeMenu);

    // Fade-up observer (re-applied every route)
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

    return () => {
      window.removeEventListener("scroll", onScroll);
      ham?.removeEventListener("click", onHam);
      menu?.removeEventListener("click", closeMenu);
      io.disconnect();
    };
  }, [location.pathname]);

  const navItem = ({ isActive }: { isActive: boolean }) => (isActive ? "active" : "");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SITE_STYLES }} />

      <header className="nav">
        <div className="wrap">
          <Link to="/" className="brand" aria-label="Bob Heitkamp for Senate">
            <img src={logoImg} alt="Bob Heitkamp for Senate" className="brand-logo" />
          </Link>
          <nav id="menu" className="menu" aria-label="Primary">
            <NavLink to="/" end className={navItem}>Home</NavLink>
            <NavLink to="/about" className={navItem}>About</NavLink>
            <NavLink to="/issues" className={navItem}>Issues</NavLink>
            <NavLink to="/take-action" className={navItem}>Take Action</NavLink>
            <NavLink to="/media" className={navItem}>Media</NavLink>
            <NavLink to="/donate" className="donate-btn">Donate</NavLink>
          </nav>
          <button id="hamburger" className="hamburger" aria-label="Toggle menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src={logoImg} alt="Bob Heitkamp for Senate" className="foot-logo" />
            <h4>Vote Bob.</h4>
            <p>Proven Experience · Local Leadership · Forward Together</p>
          </div>
          <div className="foot-col">
            <h5>Campaign</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/issues">Issues</Link></li>
              <li><Link to="/take-action">Take Action</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Resources</h5>
            <ul>
              <li><Link to="/media">Press Releases</Link></li>
              <li><Link to="/media">Images & Logos</Link></li>
              <li><Link to="/media">Bio</Link></li>
              <li><Link to="/media">Platform</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Follow</h5>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">TikTok</a></li>
              <li><a href="#">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>{FOOTER_TAGLINE}</span>
          <span>Paid for by Bob Heitkamp for North Dakota Senate District 25.</span>
        </div>
      </footer>
    </>
  );
};

export default SiteLayout;
