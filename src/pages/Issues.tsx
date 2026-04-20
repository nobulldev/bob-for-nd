import { Link } from "react-router-dom";

const PRIORITIES = [
  { n: "01", t: "Strong Communities", d: "Support the local institutions and volunteers that keep our towns strong." },
  { n: "02", t: "Agriculture and Rural Prosperity", d: "Stand with farmers and strengthen rural economies." },
  { n: "03", t: "Business Growth", d: "Support local employers and expand opportunity." },
  { n: "04", t: "Infrastructure and Essential Services", d: "Improve roads, strengthen infrastructure, and expand reliable internet access." },
  { n: "05", t: "Opportunity for the Next Generation", d: "Help young people build their future right here at home." },
];

const ISSUES = [
  {
    t: "Community Leadership. Responsible Government.",
    p: [
      "Families, farmers, homeowners, and local businesses all feel the pressure when costs keep rising. Bob will support efforts that ease the strain on working families and retirees without shifting that burden onto local businesses or weakening the services communities depend on. Government should respect taxpayers, spend carefully, and focus on the basics people count on every day.",
      "Bob believes leadership begins with listening carefully, and treating people with respect. He is running to represent District 25 faithfully, work with others, and keep his focus on solving problems.",
    ],
  },
  {
    t: "Agriculture and Rural Communities",
    p: [
      "Bob will stand up for family farmers and ranchers, support agriculture, protect the infrastructure needed to move products to market, and make sure rural voices are heard in Bismarck. He knows rural communities need steady advocacy and practical results.",
    ],
  },
  {
    t: "Business, Manufacturing, and Local Jobs",
    p: [
      "Bob has spent his life in business, so he understands what it means to meet payroll, manage costs, serve customers, and keep going when margins are tight.",
      "He will support policies that help small businesses grow, reduce unnecessary burdens, strengthen the local workforce, and support the manufacturers and agricultural employers that keep this region moving.",
    ],
  },
  {
    t: "Infrastructure and Essential Services",
    p: [
      "Bob believes District 25 deserves fair investment and long-term planning for the services communities depend on every day. He supports safe, well-maintained roads and bridges, dependable utilities, expanded broadband, rural health care, emergency response, and other essential services that keep farms, families, seniors, workers, schools, and local businesses connected and secure.",
      "Strong communities need reliable physical and digital infrastructure, access to care, and the basic services that help people live, work, and thrive close to home.",
    ],
  },
  {
    t: "Schools, Opportunity and the Next Generation",
    p: [
      "Bob believes District 25 grows when young people can see a future here, when employers can find workers, and when families can afford to build a life and stay.",
      "He supports strong schools, workforce development, job training, housing growth, child care support, and practical policies that help communities recruit and retain the people they need.",
      "His years leading Marketplace for Kids reflect a deep belief in the next generation and the importance of creating real pathways into farming, the trades, business ownership, manufacturing, health care, education, and community leadership. District 25's future depends on giving people real reasons to build that future here.",
    ],
  },
];

const PHOTO_LABELS = [
  "Bob with residents",
  "Community events",
  "Schools",
  "Local gatherings",
  "Marketplace for Kids",
  "Small business",
];

const Issues = () => {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-eyebrow fade-up">
            <span className="dash" /> Issues
          </span>
          <h1 className="fade-up delay-1">
            Priorities for <em>District 25</em>
          </h1>
          <p className="lede fade-up delay-2">
            Five focused commitments for the people, farms, and small towns of southeastern North Dakota.
          </p>
        </div>
      </section>

      {/* Priorities cards */}
      <section style={{ background: "var(--cream)" }}>
        <div className="container">
          <div className="cards">
            {PRIORITIES.map((p, i) => (
              <article key={p.n} className={`card fade-up delay-${(i % 5) + 1}`}>
                <span className="num">{p.n}</span>
                <h4>{p.t}</h4>
                <p>{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Working For You + detailed issues */}
      <section style={{ background: "var(--cream-3)" }}>
        <div className="container">
          <span className="section-eyebrow fade-up">
            <span className="dash" /> Working For You
          </span>
          <h2 className="section-title fade-up delay-1">
            Protecting What Makes <em>Home</em> Worth Calling Home
          </h2>
          <p className="fade-up delay-2" style={{ marginTop: 22, maxWidth: 880, color: "#3a3a3a", fontSize: 17 }}>
            Bob's priorities begin with protecting what makes southeastern North Dakota worth calling home: strong
            farms, excellent schools, dependable roads and infrastructure, healthy local businesses, safe communities,
            and real opportunity for the next generation.
          </p>

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

      {/* Community Leadership */}
      <section style={{ background: "var(--cream-2)" }}>
        <div className="container">
          <span className="section-eyebrow fade-up">
            <span className="dash" /> Community Leadership
          </span>
          <h2 className="section-title fade-up delay-1">
            Common Sense <em>Ahead of Politics</em>
          </h2>
          <p className="fade-up delay-2" style={{ marginTop: 22, maxWidth: 880, color: "#3a3a3a", fontSize: 17 }}>
            Bob will work with anyone, stand up for District 25, and put common sense ahead of politics.
          </p>

          <div className="photo-grid fade-up delay-2">
            {PHOTO_LABELS.map((l) => (
              <div key={l} className="ph">{l}</div>
            ))}
          </div>

          <div className="cta-trio fade-up">
            <a href="https://goodchange.org" target="_blank" rel="noreferrer" className="btn btn-red">
              Donate <span className="arrow">→</span>
            </a>
            <Link to="/take-action" className="btn btn-navy">
              Request a Yard Sign
            </Link>
            <Link to="/take-action" className="btn btn-navy">
              Invite Bob to an Event
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Issues;
