import CarouselBlock from '@/components/web/blocks/CarouselBlock';
import { PLACEHOLDER_IMG } from '@/lib/utils';

// Expects v (text) and img (image URL) from readContent to fetch content from the DB
type Props = {
  v: (key: string, fallback?: string) => string;
  img: (key: string, fallback?: string) => string;
};

export default function CarouselSection({ v, img }: Props) {
  return (
    // Each slide maps to a lesson type — content comes from the DB via v() and img()
    <CarouselBlock
      slides={[
        {
          title: v('home_lesson_group_title', 'Group Lessons'),
          content: v('home_lesson_group_desc'),
          bulletPoints: [
            { text: v('home_lesson_group_b1') },
            { text: v('home_lesson_group_b2') },
            { text: v('home_lesson_group_b3') },
          ],
          imageSrc: img('home_lesson_group_image', PLACEHOLDER_IMG),
          imageAlt: v('home_lesson_group_title', 'Group Lessons'),
          buttonText: 'Discover More',
          buttonHref: '/surf-in-new-zealand',
        },
        {
          title: v('home_lesson_private_title', 'Private Lessons'),
          content: v('home_lesson_private_desc'),
          bulletPoints: [
            { text: v('home_lesson_private_b1') },
            { text: v('home_lesson_private_b2') },
            { text: v('home_lesson_private_b3') },
          ],
          imageSrc: img('home_lesson_private_image', PLACEHOLDER_IMG),
          imageAlt: v('home_lesson_private_title', 'Private Lessons'),
          buttonText: 'Discover More',
          buttonHref: '/surf-in-new-zealand',
        },
        {
          title: v('home_lesson_coaching_title', 'Coaching'),
          content: v('home_lesson_coaching_desc'),
          bulletPoints: [
            { text: v('home_lesson_coaching_b1') },
            { text: v('home_lesson_coaching_b2') },
            { text: v('home_lesson_coaching_b3') },
          ],
          imageSrc: img('home_lesson_coaching_image', PLACEHOLDER_IMG),
          imageAlt: v('home_lesson_coaching_title', 'Coaching'),
          buttonText: 'Discover More',
          buttonHref: '/surf-in-new-zealand',
        },
      ]}
    />
  );
}
