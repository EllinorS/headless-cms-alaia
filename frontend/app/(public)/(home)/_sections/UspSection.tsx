import { WavesHorizontal, TrendingUp, Smile, Users } from 'lucide-react';

// Each item pairs an icon with its content keys from the DB
const USP_ITEMS = [
  { icon: WavesHorizontal, titleKey: 'home_usp_1_title', descKey: 'home_usp_1_desc' },
  { icon: TrendingUp, titleKey: 'home_usp_2_title', descKey: 'home_usp_2_desc' },
  { icon: Smile, titleKey: 'home_usp_3_title', descKey: 'home_usp_3_desc' },
  { icon: Users, titleKey: 'home_usp_4_title', descKey: 'home_usp_4_desc' },
];

// Expects the v function from readContent to fetch text from the DB
type Props = { v: (key: string, fallback?: string) => string };

export default function UspSection({ v }: Props) {
  return (
    <section className="py-16 md:py-24 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6">
        <h2 className="heading-xl mb-4">
          {v('home_usp_main_title', 'Come catch some waves.')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {/* Loop over each item and render its icon, title and description */}
          {USP_ITEMS.map(({ icon: Icon, titleKey, descKey }) => (
            // key={titleKey} is required by React to track each item in the list
            <div key={titleKey}>
              <Icon className="w-8 h-8 mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-3">{v(titleKey)}</h3>
              <p>{v(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
