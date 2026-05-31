'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { CarouselSlide } from '@/lib/types';

export default function CarouselBlock({ slides }: { slides: CarouselSlide[] }) {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setCurrent((p) => (p + 1) % slides.length);

  return (
    <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h2 className="heading-lg mb-6">{slide.title}</h2>
            <p className="leading-relaxed mb-6">{slide.content}</p>
            <ul className="space-y-3 mb-8">
                 {/* Filter empty bullet points before rendering */}
              {slide.bulletPoints
                .filter((p) => p.text)
                .map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 shrink-0 mt-1" />
                    <span>{point.text}</span>
                  </li>
                ))}
            </ul>
            <div className="flex items-center gap-4 justify-between">
              {/* Button only renders if both text and href are provided */}
              {slide.buttonText && slide.buttonHref && (
                <Button asChild size="lg" variant="white">
                  <Link href={slide.buttonHref}>{slide.buttonText}</Link>
                </Button>
              )}
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous slide"
                  className="p-2 rounded-md border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next slide"
                  className="p-2 rounded-md border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-video md:aspect-4/3 rounded-2xl overflow-hidden">
            <Image
              src={slide.imageSrc}
              alt={slide.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {/* One dot per slide — active dot is taller and fully opaque */}
            <div className="absolute bottom-2 left-3 right-3 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    i === current ? 'h-2 bg-white' : 'h-1 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
