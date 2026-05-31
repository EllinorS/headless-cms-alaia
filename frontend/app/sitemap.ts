import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://alaia-surf-coach.vercel.app', lastModified: new Date() },
    { url: 'https://alaia-surf-coach.vercel.app/about', lastModified: new Date() },
    { url: 'https://alaia-surf-coach.vercel.app/contact', lastModified: new Date() },
    { url: 'https://alaia-surf-coach.vercel.app/book-surf-lesson', lastModified: new Date() },
    { url: 'https://alaia-surf-coach.vercel.app/surf-trip-request', lastModified: new Date() },
    { url: 'https://alaia-surf-coach.vercel.app/surf-in-new-zealand', lastModified: new Date() },
    { url: 'https://alaia-surf-coach.vercel.app/faq', lastModified: new Date() },
  ];
}
