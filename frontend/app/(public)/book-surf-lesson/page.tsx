import type { Metadata } from 'next';
import Hero from '@/components/web/blocks/Hero';
import { ContactForm } from '@/components/web/blocks/ContactForm';
import { BusAccent } from '@/components/web/blocks/BusAccent';
import { WeekCalendar, type CalendarSession } from './_components/WeekCalendar';
import { getPageContent, readContent } from '@/lib/get-page-content';
import type { Session } from '@/lib/types';
import { PLACEHOLDER_IMG } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Book a Surf Lesson in Raglan | ALAIA Surf Coach',
  description: 'See upcoming surf lesson dates in Raglan and get in touch to book your session.',
};

// Fetches sessions from the backend — returns empty array on failure
async function getSessions(): Promise<CalendarSession[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sessions/public`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    // Backend wraps the array in { data: ... } — unwrap it (this fetch bypasses api-client).
    const body = await res.json();
    const sessions: Session[] = body?.data ?? body;
    // Rename fields from backend format (Session) to calendar format (CalendarSession)
    return sessions.map((s) => ({
      dateStr: s.date,
      time: s.time,
      type: s.type,
      duration: s.duration,
      price: s.price,
    }));
  } catch {
    // Network error or timeout — return empty array instead of crashing the page
    return [];
  }
}

export default async function BookSurfLessonPage() {
  const c = await getPageContent('book-surf-lesson');
  const { v, img } = readContent(c);
  const sessions = await getSessions();

  return (
    <main className="min-h-screen">
      <Hero
        title={v('book_hero_title', 'Book a Surf Lesson')}
        subtitle={v('book_hero_subtitle', 'Raglan, New Zealand')}
        backgroundImage={img('book_hero_image', PLACEHOLDER_IMG)}
        size="medium"
      />

      {/* Weekly session calendar */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold mb-8">{v('book_schedule_title', 'Upcoming Lessons')}</h2>
          <WeekCalendar
            sessions={sessions}
            emptyMessage="No sessions scheduled right now — get in touch to arrange a lesson."
          />
        </div>
      </section>

      {/* id="contact-form" allows session cards to scroll directly to this section via href="#contact-form" */}
      <section id="contact-form" className="relative overflow-hidden bg-muted/40 border-t py-20 px-4">
        <BusAccent color="green" side="left" width={300} className="opacity-[0.07]" />
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">{v('book_contact_title', 'Book or Ask a Question')}</h2>
            <p className="text-muted-foreground">
              {v('book_contact_desc', "Ready to get in the water? Send us a message and we'll confirm your session.")}
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
