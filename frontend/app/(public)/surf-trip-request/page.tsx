import type { Metadata } from 'next';
import { getPageContent, readContent } from '@/lib/get-page-content';
import { FormSchema, type Form } from '@/lib/types';
import { SurfTripForm } from './_components/SurfTripForm';
import Hero from '@/components/web/blocks/Hero';

export const metadata: Metadata = {
  title: 'Plan Your Surf Trip in New Zealand | ALAIA Surf Coach',
  description:
    "Tell us about your level and what you're looking for — we'll design a custom surf trip just for you.",
};

async function getForm(): Promise<Form | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forms/1`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const raw = await res.json();
    const result = FormSchema.safeParse(raw?.data ?? raw);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export default async function SurfTripRequestPage() {
  const c = await getPageContent('surf-trip');
  const { v, img } = readContent(c);
  const form = await getForm();

  return (
      <>
      <Hero
        title={v('surf_trip_hero_title', 'Plan your custom surf trip')}
        subtitle={v('surf_trip_hero_subtitle', 'Answer a few questions about your experience.')}
        backgroundImage={img('snz_hero_image', '/assets/surfers-paddling.webp')}
        size="medium"
      />
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-muted-foreground mb-12">
          We&apos;ll use your answers to design the perfect New Zealand surf adventure for you.
        </p>

        {form ? (
          <SurfTripForm fields={form.fields} />
        ) : (
          <p className="text-muted-foreground">Form unavailable. Please try again later.</p>
        )}
      </div>
    </div>
    </>
  );
}
