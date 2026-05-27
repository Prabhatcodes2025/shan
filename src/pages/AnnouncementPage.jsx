import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import { useManagedContent } from '../context/ManagedContentContext';
import usePageMeta from '../hooks/usePageMeta';
import announcementDesk from '../assets/announcement-desk.svg';

function AnnouncementPage() {
  const { managedContent } = useManagedContent();

  usePageMeta('Announcement');

  return (
    <div className="page-frame space-y-20">
      <PageHero
        eyebrow="Announcement"
        title="Latest updates."
        description="Service news, milestones, and company announcements."
        aside={
          <div className="space-y-4">
            <img
              src={announcementDesk}
              alt="Illustration representing company updates and announcements"
              className="h-56 w-full rounded-[22px] border border-white/10 object-cover shadow-luxe"
            />
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Updates</p>
            <p className="text-base leading-7 text-slate-200">
              Short notes on launches, operations, and company news.
            </p>
          </div>
        }
      />

      <section className="space-y-10">
        <SectionHeading
          eyebrow="Latest"
          title="Recent announcements."
          description="A simple running feed of business updates."
        />

        <div className="grid gap-6">
          {managedContent.announcements.length ? (
            managedContent.announcements.map((item, index) => (
              <article key={`${item.title}-${index}`} className="glass-panel p-7">
                <div className="grid gap-6 lg:grid-cols-[140px,1fr]">
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.26em] text-slate-400">
                      {item.category}
                    </p>
                    <p className="mt-3 font-display text-3xl text-white">{item.date}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-white">{item.title}</p>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
                      {item.summary}
                    </p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <article className="glass-panel p-7">
              <p className="text-xl font-semibold text-white">No announcements published yet.</p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                Add updates from the admin portal to publish them here.
              </p>
            </article>
          )}
        </div>
      </section>
    </div>
  );
}

export default AnnouncementPage;
