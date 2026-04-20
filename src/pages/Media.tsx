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

const MEDIA = [
  { t: "Press Releases", d: "Download official announcements and statements from the campaign.", note: "Press release" },
  { t: "Images", d: "Approved photos for media use and supporters.", note: "Image preview" },
  { t: "Videos", d: "Speeches, ads, and trail moments from across the district.", note: "Video thumbnail" },
  { t: "Logos", d: "Campaign logos and brand assets in multiple formats.", note: "Logo preview" },
  { t: "Bio", d: "Bob's full biography for press and event organizers.", note: "Document preview" },
  { t: "Platform", d: "The full platform document outlining priorities for District 25.", note: "Document preview" },
];

const Media = () => {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="section-eyebrow fade-up">
            <span className="dash" /> Media
          </span>
          <h1 className="fade-up delay-1">
            See Us On Our <em>Social Channels</em>
          </h1>
          <p className="lede fade-up delay-2">
            Facebook, Instagram, TikTok, YouTube — follow along, share, and stay connected with the campaign across
            District 25.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--cream-2)" }}>
        <div className="container">
          <span className="section-eyebrow fade-up">
            <span className="dash" /> Resources
          </span>
          <h2 className="section-title fade-up delay-1">
            Download Press Releases &amp; <em>Resources</em>
          </h2>

          <div className="media-grid">
            {MEDIA.map((m, i) => (
              <article key={m.t} className={`media-card fade-up delay-${(i % 5) + 1}`}>
                <div className="ph">{m.note}</div>
                <h5>{m.t}</h5>
                <p>{m.d}</p>
                <a className="more" href="#">View <span>→</span></a>
              </article>
            ))}
          </div>

          <div className="social-row fade-up">
            <a href="#" aria-label="Facebook">{SOCIAL_ICONS.facebook}</a>
            <a href="#" aria-label="Instagram">{SOCIAL_ICONS.instagram}</a>
            <a href="#" aria-label="TikTok">{SOCIAL_ICONS.tiktok}</a>
            <a href="#" aria-label="YouTube">{SOCIAL_ICONS.youtube}</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Media;
