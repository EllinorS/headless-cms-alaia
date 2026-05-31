import ImageTextBlock from '@/components/web/blocks/ImageTextBlock';
import { PLACEHOLDER_IMG } from '@/lib/utils';
import { BusAccent } from '@/components/web/blocks/BusAccent';

// Expects v (text) and img (image URL) from readContent to fetch content from the DB
type Props = {
  v: (key: string, fallback?: string) => string;
  img: (key: string, fallback?: string) => string;
};

export default function CoachSection({ v, img }: Props) {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative bus illustration in the background */}
      <BusAccent color="yellow" side="right" width={300} className="opacity-[0.2] top-1/4 md:top-auto md:bottom-0 z-0" />
      <div className="relative z-10">
        <ImageTextBlock
          title={v('home_coach_title', 'About coach')}
          content={v('home_coach_bio', '')}
          imageSrc={img('home_coach_image', PLACEHOLDER_IMG)}
          imageAlt="Surf coach"
          imagePosition="left"
          buttonText="About your surf coach →"
          buttonHref="/about"
        />
      </div>
    </div>
  );
}
