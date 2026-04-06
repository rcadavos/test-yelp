export default function Home() {
  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
      <header className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-sf-secondary">
          Local dining, simplified
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-sf-ink sm:text-5xl sm:leading-tight">
          Discover restaurants worth
          <span className="text-sf-primary"> showing up for</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-sf-muted">
          Type a city, scan trusted ratings and addresses, and walk away with
          coordinates ready for maps—one calm place to plan where you eat next.
        </p>
      </header>

      <section
        className="mt-14 rounded-2xl border border-sf-border bg-sf-card/80 p-8 shadow-[0_4px_24px_rgba(0,103,77,0.07)] backdrop-blur-sm sm:p-10"
        aria-labelledby="purpose-heading"
      >
        <h2
          id="purpose-heading"
          className="text-center text-2xl font-semibold text-sf-ink"
        >
          What this page is for
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-sf-muted">
          This site exists to help you <strong className="font-semibold text-sf-ink">explore dining options by city</strong>{" "}
          without juggling tabs and guesswork. It is built for anyone who wants
          a straight answer: what is open nearby, how people rate it, where it
          sits on the map, and how to get there—presented as a clear, scannable
          list instead of noise.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-sf-muted">
          Whether you are planning a night out, scouting lunch spots for a trip,
          or comparing a few names before you book, the goal is the same:{" "}
          <strong className="font-semibold text-sf-ink">fewer dead ends, faster decisions</strong>.
        </p>
      </section>

      <section
        className="mt-12"
        aria-labelledby="highlights-heading"
      >
        <h2
          id="highlights-heading"
          className="text-center text-xl font-semibold text-sf-ink"
        >
          What you will see here soon
        </h2>
        <ul className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
          {[
            {
              title: "City-first search",
              body: "Enter where you are headed and get results scoped to that area.",
            },
            {
              title: "Ratings at a glance",
              body: "See how diners feel before you commit to a reservation or drive.",
            },
            {
              title: "Addresses you can trust",
              body: "Copy-ready street lines so rideshares and GPS stay accurate.",
            },
            {
              title: "Map-ready coordinates",
              body: "Latitude and longitude listed for each spot when you need precision.",
            },
          ].map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-sf-border/90 bg-gradient-to-br from-sf-card to-sf-mint-soft/40 p-5 text-left shadow-sm"
            >
              <h3 className="font-semibold text-sf-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-sf-muted">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="mt-14 rounded-2xl border-2 border-dashed border-sf-border bg-sf-mint-soft/50 px-6 py-10 text-center sm:px-10"
        aria-labelledby="cta-heading"
      >
        <h2 id="cta-heading" className="text-lg font-semibold text-sf-ink">
          Search is almost ready
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-sf-muted">
          The city search experience is still in progress. When it launches,
          you will start from this same page—bookmark it if you would like to
          return.
        </p>
        <p
          className="mt-6 inline-flex items-center justify-center rounded-full bg-sf-primary/10 px-5 py-2.5 text-sm font-medium text-sf-primary"
          role="status"
          aria-live="polite"
        >
          Coming next: type a city and browse the list
        </p>
      </section>
    </div>
  );
}
