import { Link } from "react-router-dom";
import bobQuoteImg from "@/assets/bob-quote.jpg";

const About = () => {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-eyebrow fade-up">
            <span className="dash" /> About
          </span>
          <h1 className="fade-up delay-1">
            Meet <em>Bob</em>
          </h1>
          <p className="lede fade-up delay-2">
            A neighbor, an entrepreneur, and a community leader running to represent North Dakota Senate District 25.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--cream-2)" }}>
        <div className="container">
          <div className="about-grid">
            <aside className="quote-stack fade-up">
              <div className="gold-bar" aria-hidden="true" />
              <div className="quote-photo">
                <img src={bobQuoteImg} alt="Bob Heitkamp" />
              </div>
              <div className="quote-card">
                <span className="qmark">“</span>
                <blockquote>
                  Bob is your friend, neighbor and will be your faithful senator.
                </blockquote>
                <cite>— For District 25</cite>
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

              <div className="cta-row" style={{ marginTop: 32 }}>
                <Link to="/issues" className="btn btn-navy">Read the Issues <span className="arrow">→</span></Link>
                <Link to="/take-action" className="btn btn-navy">Take Action</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
