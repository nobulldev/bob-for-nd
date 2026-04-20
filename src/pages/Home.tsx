import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.png";
import heroOverlay from "@/assets/hero-overlay.png";
import candidateImg from "@/assets/candidate.png";

const Star = ({ className = "" }: { className?: string }) => (
  <span className={className} aria-hidden="true">★</span>
);

const BULLETS = [
  "Lifelong North Dakotan with deep roots",
  "Practical problem solver who gets results",
  "Understands job issues and rising costs",
  "Started his first business at sixteen",
  "Experience across multiple local industries",
  "Helped young people grow leadership skills",
  "Accessible neighbor who will listen and serve",
];

const Home = () => {
  const heroBgRef = useRef<HTMLDivElement>(null);
  const candidateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.querySelectorAll(".hero .fade-up").forEach((el) => {
      requestAnimationFrame(() => el.classList.add("in"));
    });
    const onMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (e.clientX / w - 0.5) * 2;
      const y = (e.clientY / h - 0.5) * 2;
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translate3d(${-x * 18}px, ${-y * 14}px, 0) scale(1.04)`;
      }
      if (candidateRef.current) {
        candidateRef.current.style.transform = `translate3d(${x * 10}px, ${y * 6}px, 0)`;
      }
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" ref={heroBgRef} aria-hidden="true" />
        <div className="hero-candidate" ref={candidateRef}>
          <img src={candidateImg} alt="Bob Heitkamp, candidate for North Dakota State Senate District 25" />
        </div>
        <img src={heroOverlay} alt="" className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <span className="eyebrow fade-up">
            <span className="dash" /> <Star className="star" /> North Dakota · District 25 <Star className="star" />{" "}
            <span className="dash" />
          </span>
          <h1 className="fade-up delay-1">
            <span className="name">Bob Heitkamp</span>
            <em>for North Dakota Senate District 25</em>
          </h1>
          <span className="tagline fade-up delay-2">Proven Experience · Local Leadership · Forward Together</span>
          <p className="lede fade-up delay-3">
            A lifetime of building businesses, helping people, and serving our community. Your neighbor, ready to
            represent District 25 with experienced leadership and a strong voice for local families, farms, and small
            towns.
          </p>
          <div className="cta-row fade-up delay-4">
            <a href="https://goodchange.org" target="_blank" rel="noreferrer" className="btn btn-red">
              Donate <span className="arrow">→</span>
            </a>
            <Link to="/take-action" className="btn btn-outline">
              Take Action
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT BLOCK */}
      <section style={{ background: "var(--cream-2)" }}>
        <div className="container">
          <span className="section-eyebrow fade-up">
            <span className="dash" /> About Bob
          </span>
          <h2 className="section-title fade-up delay-1">
            A Leader Shaped by Real <em>Experience</em>, Faith, and Service
          </h2>
          <ul className="bullets fade-up delay-2">
            {BULLETS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY I'M RUNNING (video placeholder, no playback yet) */}
      <section style={{ background: "var(--cream)" }}>
        <div className="container">
          <span className="section-eyebrow fade-up">
            <span className="dash" /> Why I'm Running
          </span>
          <h2 className="section-title fade-up delay-1">
            For the Extraordinary People of <em>District 25</em>
          </h2>
          <div className="why-grid">
            <div className="why-text fade-up">
              <p>I love our corner of North Dakota and the people who make it strong.</p>
              <p>
                I care deeply about what happens here. I've heard from farmers facing rising costs and uncertainty. I've
                talked with small business owners working every day to keep their doors open and create jobs. I've met
                families who want their children to have every opportunity to succeed and stay here to build a life.
              </p>
              <p>
                I'm running to help keep small towns strong, protect local schools, maintain roads, improve
                infrastructure, and make sure District 25 has a strong voice.
              </p>
              <p>
                I'll listen carefully, treat people with respect and focus on common-sense solutions that help our
                communities thrive.
              </p>
              <p className="signoff">
                For the extraordinary people of District 25, I'm here for you.
                <br />Your friend, Bob
              </p>
            </div>
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
      </section>
    </>
  );
};

export default Home;
