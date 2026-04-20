import { useEffect } from "react";

const Donate = () => {
  useEffect(() => {
    const amounts = document.querySelectorAll(".amount");
    const onAmount = (e: Event) => {
      amounts.forEach((b) => b.classList.remove("active"));
      (e.currentTarget as HTMLElement).classList.add("active");
    };
    amounts.forEach((b) => b.addEventListener("click", onAmount));
    return () => amounts.forEach((b) => b.removeEventListener("click", onAmount));
  }, []);

  return (
    <section className="donate-band">
      <div className="star-strip top" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, i) => (<span key={i}>★</span>))}
      </div>
      <div className="star-strip bot" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, i) => (<span key={i}>★</span>))}
      </div>
      <div className="container fade-up">
        <h2>
          Donate to <em>Bob</em>
        </h2>
        <p className="blurb">
          Every contribution helps reach voters, grow the campaign, and share Bob's message across District 25.
          Donations are processed securely through Good Change.
        </p>
        <div className="amounts">
          {["$25", "$50", "$100", "$250", "$500", "Other"].map((a) => (
            <button key={a} className={`amount ${a === "$100" ? "active" : ""}`}>{a}</button>
          ))}
        </div>
        <div>
          <a href="https://goodchange.org" target="_blank" rel="noreferrer" className="donate-cta">
            Donate Now <span className="star">★</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Donate;
