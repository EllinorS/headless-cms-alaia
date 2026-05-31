import type { Metadata } from 'next';
import Hero from '@/components/web/blocks/Hero';
import ImageTextBlock from '@/components/web/blocks/ImageTextBlock';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Award, Heart, Users, Waves } from 'lucide-react';
import { ValueSection } from './_sections/ValueSection';
import { PLACEHOLDER_IMG } from '@/lib/utils';
import { getPageContent, readContent } from '@/lib/get-page-content';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet your surf coach — certified instructor with over 15 years of surfing experience in Raglan, New Zealand. Passionate about sharing the art of surfing.',
  openGraph: {
    title: 'About ALAIA Surf Coach',
    description: 'Meet your surf coach in Raglan, New Zealand.',
    images: [{ url: '/assets/surf-west-coast-new-zealand.webp', width: 1200, height: 630, alt: 'Surf coach on the west coast of New Zealand' }],
  },
};

export default async function AboutPage() {
  // Load all text/image content for this page from the DB
  const c = await getPageContent('about');
  // v() reads text values, img() reads image URLs (and prefixes the backend URL if needed)
  const { v, img } = readContent(c);

  // Each value card pairs a Lucide icon with its title and description from the DB
  const values = [
    {
      icon: Award,
      title: v('about_value_1_title', 'Safety First'),
      desc: v(
        'about_value_1_desc',
        'Certified instructors, proper equipment, and comprehensive ocean safety training for every student.',
      ),
    },
    {
      icon: Heart,
      title: v('about_value_2_title', 'Personalized'),
      desc: v(
        'about_value_2_desc',
        'Every lesson is tailored to your skill level, physical abilities, and personal goals.',
      ),
    },
    {
      icon: Users,
      title: v('about_value_3_title', 'Small Groups'),
      desc: v(
        'about_value_3_desc',
        'Maximum 4 students per session ensures individual attention and faster progress.',
      ),
    },
    {
      icon: Waves,
      title: v('about_value_4_title', 'Local Expert'),
      desc: v(
        'about_value_4_desc',
        "Deep knowledge of Raglan's breaks, tides, and conditions for the perfect surf session.",
      ),
    },
  ];

  return (
    <>
      {/* Full-screen hero banner with title and background image */}
      <Hero
        title={v('about_hero_title', 'About ALAIA Surf Coach')}
        subtitle={v(
          'about_hero_subtitle',
          "Passionate about sharing the art of surfing in New Zealand's stunning waters",
        )}
        backgroundImage={img('about_hero_image', PLACEHOLDER_IMG)}
      />

      {/* Coach bio with photo on the right */}
      <ImageTextBlock
        title={v('about_coach_title', 'Meet Your Coach')}
        subtitle={v('about_coach_subtitle', 'Expert surfer & certified instructor')}
        content={v(
          'about_coach_content',
          "With over 15 years of surfing experience and 8 years as a professional surf coach, I've dedicated my life to helping people discover the joy of riding waves.",
        )}
        imageSrc={img('about_coach_image', PLACEHOLDER_IMG)}
        imageAlt="Surf coach on the beach"
        imagePosition="left"
        buttonText={v('about_coach_button_text', 'Book a lesson')}
        buttonHref={v('about_coach_button_url', '/book-surf-lesson')}
      />

      {/* Grid of value cards built from the values array above */}
      <ValueSection
        title={v('about_values_title', 'What Makes ALAIA Different')}
        subtitle={v(
          'about_values_subtitle',
          "We believe surfing is more than a sport, it's a lifestyle, a connection to nature, and a journey of personal growth.",
        )}
        values={values}
      />

      {/* Three paragraphs of mission statement text */}
      <ImageTextBlock
        sectionClassName="bg-muted/40 px-4"
        eyebrow="Our Mission"
        title={v('about_mission_title', 'Sharing the Stoke, One Wave at a Time')}
        content={v('about_mission_p1')}
        imageSrc={img('about_mission_image', '/assets/surfboards-under-flax.webp')}
        imageAlt="Our mission"
        imagePosition="right"
      />

      {/* Bottom CTA banner with two action buttons */}
      <section className="py-16 px-4 bg-secondary text-secondary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {v('about_cta_title', 'Ready to Start Your Surf Journey?')}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {v(
              'about_cta_subtitle',
              'Book your first lesson today or plan an unforgettable surf trip across New Zealand',
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="white" asChild>
              <Link href="/book-surf-lesson">Book a Lesson</Link>
            </Button>
            <Button size="lg" variant="glass" asChild>
              <Link href="/surf-trip-request">Plan a Surf Trip</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
