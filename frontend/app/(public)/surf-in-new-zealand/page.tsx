import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/web/blocks/Hero';
import { Button } from '@/components/ui/button';
import { CheckCircle, Users, User, TrendingUp, MapPin, Compass, Waves } from 'lucide-react';
import { BusAccent } from '@/components/web/blocks/BusAccent';
import { getPageContent, readContent } from '@/lib/get-page-content';

export const metadata: Metadata = {
  title: 'Surf in New Zealand | ALAIA Surf Coach',
  description: 'Surf lessons, packages and custom surf trips in New Zealand with ALAIA Surf Coach. Based in Raglan.',
};

// Static icon cards — defined outside the component so they are not recreated on every render
const LESSON_CARDS = [
  { icon: Users, label: 'Group Lessons', sub: 'Max 4 per group' },
  { icon: User, label: 'Private Lessons', sub: 'One on one' },
  { icon: TrendingUp, label: 'Surf Coaching', sub: 'Level up fast' },
  { icon: MapPin, label: 'Raglan, NZ', sub: 'World-class waves' },
];

const TRIP_CARDS = [
  { icon: Compass, label: 'Personalised itinerary', sub: 'Built around your level' },
  { icon: Waves, label: 'NZ-wide surf', sub: 'Raglan to Northland' },
  { icon: TrendingUp, label: 'Expert coaching', sub: 'Every step of the way' },
  { icon: MapPin, label: 'Local knowledge', sub: 'Hidden gems & best breaks' },
];

export default async function SurfInNewZealandPage() {
  // Load CMS content for this page and global shared values (prices)
  const c = await getPageContent('surf-in-new-zealand');
  const cGlobal = await getPageContent('global');
  const { v, img } = readContent(c);
  // Rename v to vg to avoid conflict with the page's v function
  const { v: vg } = readContent(cGlobal);

  // Prices come from the DB as strings — Number() converts them, || sets a fallback if empty
  const priceSingle = Number(vg('global_price_group_adults')) || 60;
  const pricePack3 = Number(vg('global_price_pack_3')) || 160;
  const pricePack5 = Number(vg('global_price_pack_5')) || 250;

  // Build bullet lists — filter(Boolean) removes any empty strings (keys not filled in the DB)
  const lessonBullets = [
    v('snz_lessons_b1'),
    v('snz_lessons_b2'),
    v('snz_lessons_b3'),
    v('snz_lessons_b4'),
  ].filter(Boolean);

  const packageBullets = [
    v('snz_packages_b1'),
    v('snz_packages_b2'),
    v('snz_packages_b3'),
  ].filter(Boolean);

  const tripBullets = [
    v('snz_trips_b1'),
    v('snz_trips_b2'),
    v('snz_trips_b3'),
  ].filter(Boolean);

  // Pricing cards — built here because they depend on the dynamic price values above
  const pricingCards = [
    { sessions: 1, price: priceSingle, per: priceSingle, label: 'Single session', accent: false },
    { sessions: 3, price: pricePack3, per: Math.round(pricePack3 / 3), label: 'Best value', accent: true },
    { sessions: 5, price: pricePack5, per: Math.round(pricePack5 / 5), label: 'Full package', accent: false },
  ];

  return (
    <>
      <Hero
        title={v('snz_hero_title', 'Surf in New Zealand')}
        subtitle={v('snz_hero_subtitle')}
        backgroundImage={img('snz_hero_image', '/assets/surfers-paddling.webp')}
      />

      {/* Surf Lessons */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow text-primary mb-4">{v('snz_lessons_eyebrow', 'Raglan, New Zealand')}</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{v('snz_lessons_title', 'Surf Lessons')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{v('snz_lessons_desc')}</p>
              {/* Only render the list if at least one bullet is filled in the DB */}
              {lessonBullets.length > 0 && (
                <ul className="space-y-2 mb-8">
                  {lessonBullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-ring shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              <Button asChild size="lg">
                <Link href="/book-surf-lesson">Book a lesson →</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {LESSON_CARDS.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-muted rounded-2xl p-5">
                  <Icon className="w-5 h-5 text-primary mb-3" />
                  <p className="font-semibold text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Surf Packages */}
      <section className="relative overflow-hidden bg-muted/40 border-y py-20 px-4">
        {/* Decorative bus illustration behind the content */}
        <BusAccent color="yellow" side="right" width={300} className="opacity-[0.2]" />
        <div className="relative z-10 container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Pricing cards — order-2 on mobile, order-1 on desktop (visual swap) */}
            <div className="order-2 md:order-1 grid grid-cols-3 gap-2 md:gap-4">
              {pricingCards.map(({ sessions, price, per, label, accent }) => (
                <div
                  key={sessions}
                  // accent card (middle) gets a highlighted background
                  className={`rounded-2xl p-3 md:p-5 text-center ${accent ? 'bg-primary text-primary-foreground' : 'bg-background border'}`}
                >
                  <p className={`text-xs font-semibold mb-2 ${accent ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {label}
                  </p>
                  <p className="text-2xl md:text-3xl font-black">${price}</p>
                  <p className={`text-xs mt-1 ${accent ? 'text-white/70' : 'text-muted-foreground'}`}>
                    ${per}/session
                  </p>
                  {/* Adds an 's' for plural: "1 session" vs "3 sessions" */}
                  <p className={`text-xs mt-2 font-medium ${accent ? 'text-white/80' : ''}`}>
                    {sessions} session{sessions > 1 ? 's' : ''}
                  </p>
                </div>
              ))}
            </div>
            <div className="order-1 md:order-2">
              <p className="eyebrow text-primary mb-4">{v('snz_packages_eyebrow', 'Save more, surf more')}</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{v('snz_packages_title', 'Surf Packages')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{v('snz_packages_desc')}</p>
              {packageBullets.length > 0 && (
                <ul className="space-y-2 mb-8">
                  {packageBullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-ring shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              <Button asChild size="lg">
                <Link href="/book-surf-lesson">View packages →</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Surf Trips */}
      <section className="py-20 px-4 bg-secondary text-secondary-foreground">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow text-secondary-foreground/60 mb-4">{v('snz_trips_eyebrow', 'New Zealand, your way')}</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{v('snz_trips_title', 'Custom Surf Trips')}</h2>
              <p className="text-secondary-foreground/70 leading-relaxed mb-6">{v('snz_trips_desc')}</p>
              {tripBullets.length > 0 && (
                <ul className="space-y-2 mb-8">
                  {tripBullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-secondary-foreground">
                      <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              <Button asChild size="lg" variant="white">
                <Link href="/surf-trip-request">Plan my trip →</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {TRIP_CARDS.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-secondary-foreground/10 border border-secondary-foreground/15 rounded-2xl p-5">
                  <Icon className="w-5 h-5 text-gold mb-3" />
                  <p className="font-semibold text-sm">{label}</p>
                  <p className="text-xs text-secondary-foreground/70 mt-1">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}