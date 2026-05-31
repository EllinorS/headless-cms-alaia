import Hero from '@/components/web/blocks/Hero';
import { PLACEHOLDER_IMG } from '@/lib/utils';

// Expects v (text) and img (image URL) from readContent to fetch content from the DB
type Props = {
  v: (key: string, fallback?: string) => string;
  img: (key: string, fallback?: string) => string;
};

export default function HeroSection({ v, img }: Props) {
  return (
    <Hero
      title={v('home_hero_title', 'Your next adventure starts here')}
      subtitle={v('home_hero_subtitle', 'Experience the best surf coaching in New Zealand')}
      backgroundImage={img('home_hero_image', PLACEHOLDER_IMG)}
      primaryButton={{
        text: v('home_hero_cta_lesson', 'Book a lesson'),
        href: '/book-surf-lesson',
        show: true,
      }}
      secondaryButton={{
        text: v('home_hero_cta_trip', 'My surf trip'),
        href: '/surf-trip-request',
        show: true,
      }}
    />
  );
}
