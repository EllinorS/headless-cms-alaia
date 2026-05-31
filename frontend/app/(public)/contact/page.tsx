import type { Metadata } from 'next';
import Hero from '@/components/web/blocks/Hero';
import { ContactInfo } from './_sections/ContactInfo';
import { ContactForm } from '@/components/web/blocks/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Get in touch with ALAIA Surf Coach in Raglan, New Zealand. Questions about surf lessons, bookings or surf trips — we'd love to hear from you.",
  openGraph: {
    title: 'Contact ALAIA Surf Coach',
    description: 'Get in touch with us in Raglan, New Zealand.',
    images: [{ url: '/assets/surfboards-under-flax.webp', width: 1200, height: 630, alt: 'Surf on the west coast of New Zealand' }],
  },
};
export default function ContactPage() {
  return (
    <>
      <Hero
        title="Contact Us"
        subtitle="Got a question? We'd love to hear from you."
        backgroundImage="https://res.cloudinary.com/dz8bupnto/image/upload/alaia-surf/eodicbzxomcacqkqfkzp.webp"
        size="medium"
      />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}