import ReviewCard from '@/components/web/blocks/ReviewCard';
import { Waves, Wind, Sun } from 'lucide-react';

// Each review slot pairs a decorative icon with its content keys from the DB
const REVIEWS = [
  { icon: Waves, nameKey: 'home_review_1_name', quoteKey: 'home_review_1_quote' },
  { icon: Wind,  nameKey: 'home_review_2_name', quoteKey: 'home_review_2_quote' },
  { icon: Sun,   nameKey: 'home_review_3_name', quoteKey: 'home_review_3_quote' },
];

// Expects the v function from readContent to fetch text from the DB
type Props = { v: (key: string, fallback?: string) => string };

export default function ReviewsSection({ v }: Props) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h2 className="heading-xl mb-12">Reviews</h2>
        {/* Loop over each review slot and render a card */}
        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map(({ icon, nameKey, quoteKey }) => (
            <ReviewCard
              key={nameKey}
              icon={icon}
              name={v(nameKey)}
              quote={v(quoteKey)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
