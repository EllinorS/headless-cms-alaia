import type { Metadata } from 'next';
import HeroSection from './_sections/HeroSection';
import CoachSection from './_sections/CoachSection';
import UspSection from './_sections/UspSection';
import CarouselSection from './_sections/CarouselSection';
import ReviewsSection from './_sections/ReviewSection';
import SimpleImage from '@/components/web/blocks/SimpleImage';
import { NzAccent } from '@/components/web/blocks/NzAccent';
import { PLACEHOLDER_IMG } from '@/lib/utils';
import { getPageContent, readContent } from '@/lib/get-page-content';

export const metadata: Metadata = {
  title: 'Surf Lessons & Road Trips in Raglan, New Zealand',
  description: 'ALAIA Surf Coach — professional surf lessons, group sessions, packages and custom surf road trips in Raglan, New Zealand. All levels welcome.',
  openGraph: {
    title: 'ALAIA Surf Coach | Raglan, New Zealand',
    description: 'Surf lessons, coaching and custom road trips in Raglan, NZ.',
    images: [{ url: '/assets/surfer-ocean-new-zealand.webp', width: 1200, height: 630, alt: 'Surfer in Raglan NZ' }],
  },
};

export default async function HomePage() {
  // Load all text/image content for this page from the DB
  const content = await getPageContent('home');
  // v() reads text values, img() reads image URLs (and prefixes the backend URL if needed)
  const { v, img } = readContent(content);

  return (
    <>
      <HeroSection v={v} img={img} />
      <CoachSection v={v} img={img} />
      <UspSection v={v} />

      {/* Decorative NZ map accents layered behind the full-width image below */}
      {/* relative + z-10 so the accents can bleed into adjacent sections */}
      <div className="relative z-10">
        <NzAccent variant="full" color="green" side="left" width={600} className="top-1/2 -translate-y-1/2 -translate-x-1/3 opacity-80 w-80 md:w-96 lg:w-162.5 z-10" />
        <NzAccent variant="line" color="yellow" side="left" width={600} className="top-[calc(50%+12px)] -translate-y-1/2 -translate-x-1/4 opacity-100 w-80 md:w-96 lg:w-162.5 z-10" />
        {/* Full-width decorative image between USP and Carousel sections */}
        <section className="py-16 container mx-auto px-6">
          <SimpleImage
            src={img('home_simple_image', PLACEHOLDER_IMG)}
            alt="Aerial view of surfers"
            aspectRatio="wide"
          />
        </section>
      </div>
      <CarouselSection v={v} img={img} />
      {/* Reviews are only rendered if at least one review has content — see ReviewsSection */}
      <ReviewsSection v={v} />
    </>
  );
}
