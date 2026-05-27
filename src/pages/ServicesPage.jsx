import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import usePageMeta from '../hooks/usePageMeta';
import servicesFlow from '../assets/services-flow.svg';
import { processSteps, serviceFamilies } from '../data/siteContent';

function ServicesPage() {
  usePageMeta('Services');

  return (
    <div className="page-frame space-y-20">
      <PageHero
        eyebrow="Services"
        title="Focused services for multilingual delivery."
        description="Translation, localization, QA, AI data support, and managed language operations."
        aside={
          <div className="space-y-4">
            <img
              src={servicesFlow}
              alt="Illustration showing service workflow"
              className="h-56 w-full rounded-[22px] border border-white/10 object-cover shadow-luxe"
            />
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Service focus</p>
            <p className="text-base leading-7 text-slate-200">
              Clear delivery, visible timelines, and reliable review.
            </p>
          </div>
        }
      />

      <section className="space-y-10">
        <SectionHeading
          eyebrow="Service Families"
          title="A compact service structure."
          description="Each service line is designed to stay simple, visible, and easy to scope."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {serviceFamilies.map((service) => (
            <article key={service.title} className="spotlight-border p-[1px]">
              <div className="h-full rounded-[27px] bg-white/[0.03] p-7 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.24em] text-ocean-300">
                  {service.title}
                </p>
                <p className="mt-4 text-2xl font-semibold text-white">{service.lead}</p>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-400">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-gradient-to-r from-forest-300 to-sky-300" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <SectionHeading
          eyebrow="Process"
          title="A simple three-step delivery flow."
          description="Enough structure to stay reliable, without unnecessary complexity."
          align="center"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {processSteps.map((item) => (
            <article key={item.step} className="glass-panel p-7">
              <p className="font-display text-5xl text-forest-300">{item.step}</p>
              <p className="mt-5 text-2xl font-semibold text-white">{item.title}</p>
              <p className="mt-4 text-sm leading-7 text-slate-400">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
