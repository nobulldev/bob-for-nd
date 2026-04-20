const ACTIONS = [
  {
    t: "Donate",
    d: "Every contribution helps reach voters, grow the campaign, and share Bob's message across District 25.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" /></svg>
    ),
  },
  {
    t: "Volunteer",
    d: "Dedicate any amount of time for an activity of your choice: community events, phone calls, door knocking, sign delivery, or administrative help.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0zM3 21a9 9 0 0 1 18 0" /></svg>
    ),
  },
  {
    t: "Host an Event",
    d: "Invite Bob to meet your neighbors, friends, business, church, organization, or community group.",
    icon: (
      <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="1" /><path d="M16 3v4M8 3v4M3 11h18" /></svg>
    ),
  },
  {
    t: "Request a Yard Sign",
    d: "Show your support and help neighbors learn more about Bob.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M4 4h12l4 5-4 5H4zM4 14v7" /></svg>
    ),
  },
  {
    t: "Stay Updated",
    d: "Receive campaign news, event updates, and important reminders.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M4 6h16v12H4zM4 6l8 7 8-7" /></svg>
    ),
  },
  {
    t: "Have an Idea? Let's Hear It.",
    d: "Great ideas often come from the people who live and work here every day. Share your thoughts, concerns, or ideas for District 25.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12c1 1 1.5 2 1.5 3h5c0-1 .5-2 1.5-3a7 7 0 0 0-4-12z" /></svg>
    ),
  },
];

const TakeAction = () => {
  return (
    <div className="action-page">
      <section className="page-hero">
        <div className="container">
          <span className="section-eyebrow fade-up">
            <span className="dash" /> Take Action
          </span>
          <h1 className="fade-up delay-1">
            Welcome!
          </h1>
          <p className="lede fade-up delay-2">
            Inspired by the people of District 25, Bob Heitkamp is running to help ensure our communities have a senator
            who listens, cares, and remembers who he works for.
          </p>
          <p className="lede fade-up delay-3">
            Whether you have a little time to give, want to stay informed, or simply believe our towns deserve a trusted
            voice in Bismarck, there is a place for you in this campaign.
          </p>
          <p className="lede fade-up delay-4">
            Bob is running to be an advocate for the families, farmers, workers, seniors, and small towns that make
            District 25 home. With your help, we can build a future where people feel heard, respected, and never
            forgotten.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <span className="section-eyebrow fade-up" style={{ color: "var(--gold)" }}>
            <span className="dash" style={{ background: "var(--gold)" }} /> Ways to Help
          </span>
          <h2 className="section-title fade-up delay-1" style={{ color: "var(--cream)" }}>
            Join the <em style={{ color: "var(--gold)" }}>Campaign</em>
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
                  {a.t}
                </label>
              ))}
            </div>
            <div className="submit-row">
              <button type="submit" className="btn btn-red">
                Submit <span className="arrow">→</span>
              </button>
            </div>
          </form>

          <div className="closing-cream fade-up">
            <h4>A Campaign Built on Neighbors Helping Neighbors.</h4>
            <p>
              You don't need to be political to take part. If you care about your town, your family, your future, and
              having someone in office who will stand with you, you belong here.
            </p>
            <p>Thank you for being part of this campaign.</p>
            <p className="sign">
              Your friend,
              <br />Bob
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TakeAction;
