// Groups of content keys for each page, used by the admin content editor to render
// the right form sections. Each key corresponds to a row in the site_content DB table
// (keyed by the `key` column), following the convention: page_section_field.
// The PAGE_BLOCKS map at the bottom ties a page slug to its block group.

export const GLOBAL_BLOCKS = [
  {
    label: 'Footer',
    keys: ['global_footer_image', 'global_instagram_url', 'global_facebook_url'],
  },
  {
    label: 'Default Session Prices (NZD / person)',
    keys: [
      'global_price_group_adults',
      'global_price_group_kids',
      'global_price_private',
      'global_price_coaching',
    ],
  },
  {
    label: 'Package Prices (NZD total)',
    keys: ['global_price_pack_3', 'global_price_pack_5'],
  },
];

export const HOME_BLOCKS = [
  {
    label: 'Hero',
    keys: ['home_hero_title', 'home_hero_cta_lesson', 'home_hero_cta_trip', 'home_hero_image'],
  },
  {
    label: 'About Coach',
    keys: ['home_coach_title', 'home_coach_bio', 'home_coach_image'],
  },
  {
    label: 'Simple Image',
    keys: ['home_simple_image'],
  },
  {
    label: 'Unique Selling Points',
    keys: [
      'home_usp_main_title',
      'home_usp_1_title',
      'home_usp_1_desc',
      'home_usp_2_title',
      'home_usp_2_desc',
      'home_usp_3_title',
      'home_usp_3_desc',
      'home_usp_4_title',
      'home_usp_4_desc',
    ],
  },
  {
    label: 'Group Lessons',
    keys: [
      'home_lesson_group_title',
      'home_lesson_group_desc',
      'home_lesson_group_b1',
      'home_lesson_group_b2',
      'home_lesson_group_b3',
      'home_lesson_group_image',
    ],
  },
  {
    label: 'Private Lessons',
    keys: [
      'home_lesson_private_title',
      'home_lesson_private_desc',
      'home_lesson_private_b1',
      'home_lesson_private_b2',
      'home_lesson_private_b3',
      'home_lesson_private_image',
    ],
  },
  {
    label: 'Coaching',
    keys: [
      'home_lesson_coaching_title',
      'home_lesson_coaching_desc',
      'home_lesson_coaching_b1',
      'home_lesson_coaching_b2',
      'home_lesson_coaching_b3',
      'home_lesson_coaching_image',
    ],
  },
  {
    label: 'Reviews',
    keys: [
      'home_review_1_name',
      'home_review_1_quote',
      'home_review_2_name',
      'home_review_2_quote',
      'home_review_3_name',
      'home_review_3_quote',
    ],
  },
  {
    label: 'Footer CTA',
    keys: ['home_footer_cta_title', 'home_footer_cta_desc'],
  },
];

export const ABOUT_BLOCKS = [
  {
    label: 'Hero',
    keys: ['about_hero_title', 'about_hero_subtitle', 'about_hero_image'],
  },
  {
    label: 'Meet the Coach',
    keys: [
      'about_coach_title',
      'about_coach_subtitle',
      'about_coach_content',
      'about_coach_image',
      'about_coach_button_text',
      'about_coach_button_url',
    ],
  },
  {
    label: 'Values',
    keys: [
      'about_values_title',
      'about_values_subtitle',
      'about_value_1_title',
      'about_value_1_desc',
      'about_value_2_title',
      'about_value_2_desc',
      'about_value_3_title',
      'about_value_3_desc',
      'about_value_4_title',
      'about_value_4_desc',
    ],
  },
  {
    label: 'Mission',
    keys: [
      'about_mission_title',
      'about_mission_p1',
      'about_mission_p2',
      'about_mission_p3',
      'about_mission_image',
    ],
  },
  {
    label: 'CTA',
    keys: ['about_cta_title', 'about_cta_subtitle'],
  },
];

export const SURF_IN_NZ_BLOCKS = [
  { label: 'Hero', keys: ['snz_hero_title', 'snz_hero_subtitle', 'snz_hero_image'] },
  {
    label: 'Surf Lessons',
    keys: [
      'snz_lessons_eyebrow',
      'snz_lessons_title',
      'snz_lessons_desc',
      'snz_lessons_b1',
      'snz_lessons_b2',
      'snz_lessons_b3',
      'snz_lessons_b4',
    ],
  },
  {
    label: 'Surf Packages',
    keys: [
      'snz_packages_eyebrow',
      'snz_packages_title',
      'snz_packages_desc',
      'snz_packages_b1',
      'snz_packages_b2',
      'snz_packages_b3',
    ],
  },
  {
    label: 'Custom Surf Trips',
    keys: [
      'snz_trips_eyebrow',
      'snz_trips_title',
      'snz_trips_desc',
      'snz_trips_b1',
      'snz_trips_b2',
      'snz_trips_b3',
    ],
  },
];

export const BOOK_SURF_LESSON_BLOCKS = [
  {
    label: 'Hero',
    keys: ['book_hero_title', 'book_hero_subtitle', 'book_hero_image'],
  },
  {
    label: 'Schedule',
    keys: ['book_schedule_title', 'book_schedule_empty'],
  },
  {
    label: 'Contact Section',
    keys: ['book_contact_title', 'book_contact_desc'],
  },
];


export const FAQ_BLOCKS = [
  {
    label: 'Before your lesson',
    keys: [
      'faq_cat1_title',
      'faq_cat1_item1_q',
      'faq_cat1_item1_a',
      'faq_cat1_item2_q',
      'faq_cat1_item2_a',
      'faq_cat1_item3_q',
      'faq_cat1_item3_a',
      'faq_cat1_item4_q',
      'faq_cat1_item4_a',
      'faq_cat1_item5_q',
      'faq_cat1_item5_a',
    ],
  },
  {
    label: 'The lessons',
    keys: [
      'faq_cat2_title',
      'faq_cat2_item1_q',
      'faq_cat2_item1_a',
      'faq_cat2_item2_q',
      'faq_cat2_item2_a',
      'faq_cat2_item3_q',
      'faq_cat2_item3_a',
      'faq_cat2_item4_q',
      'faq_cat2_item4_a',
      'faq_cat2_item5_q',
      'faq_cat2_item5_a',
    ],
  },
  {
    label: 'Packages & booking',
    keys: [
      'faq_cat3_title',
      'faq_cat3_item1_q',
      'faq_cat3_item1_a',
      'faq_cat3_item2_q',
      'faq_cat3_item2_a',
      'faq_cat3_item3_q',
      'faq_cat3_item3_a',
      'faq_cat3_item4_q',
      'faq_cat3_item4_a',
    ],
  },
  {
    label: 'Cancellation & payment',
    keys: [
      'faq_cat4_title',
      'faq_cat4_item1_q',
      'faq_cat4_item1_a',
      'faq_cat4_item2_q',
      'faq_cat4_item2_a',
      'faq_cat4_item3_q',
      'faq_cat4_item3_a',
    ],
  },
];


type ContentBlockGroup = { label: string; keys: string[] }[];

export const PAGE_BLOCKS: Record<string, ContentBlockGroup> = {
  global: GLOBAL_BLOCKS,
  home: HOME_BLOCKS,
  about: ABOUT_BLOCKS,
  'book-surf-lesson': BOOK_SURF_LESSON_BLOCKS,
  'surf-in-new-zealand': SURF_IN_NZ_BLOCKS,
  faq: FAQ_BLOCKS,
};
