import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import usePageMeta from '../hooks/usePageMeta';
import aboutVision from '../assets/about-vision.svg';
import { company, industries, values } from '../data/siteContent';

function AboutPage() {
  usePageMeta('About Us');

  return (
    <div className="page-frame space-y-20">
      <PageHero
        eyebrow="About Us"
        title="A lean partner for multilingual work."
        description={`${company.name} helps teams launch clearly across languages with focused delivery and reliable review.`}
        aside={
          <div className="space-y-4">
            <img
              src={aboutVision}
              alt="Illustration representing Shan Globalization's global vision"
              className="h-56 w-full rounded-[22px] border border-white/10 object-cover shadow-luxe"
            />
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Approach</p>
            <p className="text-base leading-7 text-slate-200">
              Clear scope, calm execution, and steady quality control.
            </p>
          </div>
        }
      />

      <section className="grid gap-8 lg:grid-cols-[0.95fr,1.05fr]">
        <div className="glass-panel overflow-hidden p-0">
          <div className="px-8 pt-8">
            <p className="text-sm uppercase tracking-[0.28em] text-forest-300">Overview</p>
            <p className="mt-4 font-display text-4xl text-white">
              Built for businesses that need language support without extra layers.
            </p>
          </div>
          <div className="p-5">
            <img
              src={aboutVision}
              alt="Global growth and positioning illustration"
              className="h-[240px] w-full rounded-[24px] border border-white/10 object-cover"
            />
          </div>
        </div>

        <div className="glass-panel space-y-4 p-8">
          <p className="text-sm leading-7 text-slate-300 sm:text-base">
            Shan Globalization supports launches, recurring content, and multilingual operations
            with a smaller, more direct delivery model.
          </p>
          <p className="text-sm leading-7 text-slate-300 sm:text-base">
            The focus stays on clarity, consistency, and dependable output.
          </p>
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow="Core Principles"
          title="What guides the work."
          description="A short set of principles behind every engagement."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="glass-panel p-7">
              <p className="text-2xl font-semibold text-white">{value.title}</p>
              <p className="mt-4 text-sm leading-7 text-slate-400">{value.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr,1fr]">
        <article className="cta-band">
          <div className="relative z-10">
            <p className="text-sm uppercase tracking-[0.28em] text-forest-300">How we work</p>
            <p className="mt-4 max-w-xl font-display text-4xl">Brief clearly. Deliver cleanly.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {['Scope', 'Review', 'Release'].map((item) => (
                <div key={item} className="rounded-[22px] border border-white/20 bg-white/[0.08] p-4 text-sm backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="spotlight-border p-[1px]">
          <div className="rounded-[27px] bg-white/[0.03] p-8 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.28em] text-ocean-300">Markets</p>
            <p className="mt-4 text-3xl font-semibold text-white">
              Support across industries and multilingual customer journeys.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-200 backdrop-blur"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

export default AboutPage;
