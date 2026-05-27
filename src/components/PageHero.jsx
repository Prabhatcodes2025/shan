function PageHero({ eyebrow, title, description, aside }) {
  return (
    <section className="page-hero animate-rise">
      <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        <div className="space-y-5 lg:pr-6">
          <span className="eyebrow">{eyebrow}</span>
          <div className="space-y-4">
            <h1 className="max-w-[13ch] font-display text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">
              {title}
            </h1>
            <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
          </div>
        </div>

        {aside && <div className="glass-panel p-5 sm:p-6">{aside}</div>}
      </div>
    </section>
  );
}

export default PageHero;
