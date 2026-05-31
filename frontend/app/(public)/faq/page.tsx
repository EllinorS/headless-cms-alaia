import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getPageContent, readContent } from '@/lib/get-page-content';
import { FaqCategory } from '@/lib/types';
import { FaqAccordion } from '@/components/web/blocks/FaqAccordion';

export const metadata: Metadata = {
  title: 'FAQ — Surf Lessons in Raglan | ALAIA Surf Coach',
  description:
    'Everything you need to know before booking a surf lesson in Raglan, New Zealand. Questions about levels, what to bring, packages, cancellation, and more.',
  openGraph: {
    title: 'FAQ | ALAIA Surf Coach Raglan',
    description: 'Your questions answered — before your first session in Raglan, NZ.',
    images: [
      {
        url: '/assets/surfboards-under-flax.webp',
        width: 1200,
        height: 630,
        alt: 'Surfboards in Raglan',
      },
    ],
  },
};

export default async function FaqPage() {
  const content = await getPageContent('FAQ');
  const { v } = readContent(content);

  const categories: FaqCategory[] = [1, 2, 3, 4].map((n) => ({
    title: v(`faq_cat${n}_title`),
    items: [1, 2, 3, 4, 5]
      .map((m) => ({ q: v(`faq_cat${n}_item${m}_q`), a: v(`faq_cat${n}_item${m}_a`) }))
      .filter((item) => item.q),
  }));
  return (
    <>
      <div className="relative h-56 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/surfboards-under-flax.webp')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full items-end px-6 pb-10">
          <div className="container mx-auto max-w-3xl text-white">
            <h1 className="heading-lg mb-2">Frequently Asked Questions</h1>
            <p className="opacity-80">Everything you need to know before hitting the water</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-6 py-16">
        <FaqAccordion categories={categories} />
      </div>

      <div className="mt-16 bg-muted/40 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold mb-2">Still have a question?</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Send us a message and we&apos;ll get back to you within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Contact us</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/book-surf-lesson">Book a lesson</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
