import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getPageContent, readContent } from '@/lib/get-page-content';

export default async function Footer() { 
  const c = await getPageContent('global');
  const { img, v } = readContent(c);

  const instagramUrl = v('global_instagram_url');
  const facebookUrl = v('global_facebook_url');

  return (
    <footer className="relative overflow-x-clip bg-blue-grey text-secondary-foreground">
      {/* Full-width image with gradient overlay */}
      <div className="relative h-[70vh] md:h-[80vh] min-h-125 w-full -mt-30 pointer-events-none">
        <Image
          src={img('global_footer_image', '/assets/new-zealand-surf-spot.webp')}
          alt="Surf Background"
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-black/0 via-transparent to-blue-grey" />

        {/* CTA overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <h4 className="text-secondary-foreground font-bold uppercase tracking-widest text-xs md:text-sm mb-4">
            Catch the next wave
          </h4>
          <h3 className="text-secondary-foreground text-3xl md:text-6xl font-bold mb-8 max-w-2xl leading-tight">
            Connect with us & start your journey
          </h3>
          <Button asChild size="lg" className="pointer-events-auto">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>

      {/* Footer links */}
      <div className="relative bg-blue-gray text-secondary-foreground z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-16">
            {/* Navigation columns */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-left">
              <div>
                <h4 className="font-bold mb-6 text-base tracking-wider uppercase italic">
                  Experiences
                </h4>
                <ul className="space-y-3 text-sm opacity-80">
                  <li>
                    <Link
                      href="/surf-in-new-zealand"
                      className="hover:opacity-100 transition-opacity"
                    >
                      Surf in New Zealand
                    </Link>
                  </li>
                  <li>
                    <Link href="/book-surf-lesson" className="hover:opacity-100 transition-opacity">
                      Book a Lesson
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/surf-trip-request"
                      className="hover:opacity-100 transition-opacity"
                    >
                      Custom Surf Trips
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-base tracking-wider uppercase italic">
                  Discover
                </h4>
                <ul className="space-y-3 text-sm opacity-80">
                  <li>
                    <Link href="/about" className="hover:opacity-100 transition-opacity">
                      About Coach
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:opacity-100 transition-opacity">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:opacity-100 transition-opacity">
                      Get in Touch
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Logo & socials */}
            <div className="md:col-span-5 flex flex-col items-center md:items-end">
              <Link href="/" className="mb-8">
                <Image
                  src="/assets/alaia-surf-coach-logo-green.svg"
                  alt="Alaia Surf Coach"
                  width={160}
                  height={40}
                  className="brightness-0 invert opacity-90 transition-transform hover:scale-105"
                />
              </Link>
              {(instagramUrl || facebookUrl) && (
                <div className="flex items-center gap-4 mb-8">
                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-80 hover:opacity-100 transition-opacity text-sm"
                    >
                      Instagram
                    </a>
                  )}
                  {facebookUrl && (
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-80 hover:opacity-100 transition-opacity text-sm"
                    >
                      Facebook
                    </a>
                  )}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button asChild variant="accent-outline">
                  <Link href="/book-surf-lesson">Book Lesson</Link>
                </Button>
                <Button asChild variant="white">
                  <Link href="/surf-trip-request">My surf trip</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] opacity-80">
            <p>© {new Date().getFullYear()} Alaia Surf Coach</p>
            <Link href="/terms" className="hover:opacity-100 transition-opacity">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:opacity-100 transition-opacity">
              Privacy Policy
            </Link>
            <p>
              Crafted with 🌊 by{' '}
              <a
                href="https://www.linkedin.com/in/ellinorschwetterle/"
                className="hover:opacity-100 underline underline-offset-4"
              >
                Elli
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
