import type { Metadata } from 'next';
import { getPageContent, readContent } from '@/lib/get-page-content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for ALAIA Surf Coach — how we collect, use and protect your personal information.',
};

export default async function PrivacyPage() {
  const c = await getPageContent('privacy');
  const { v } = readContent(c);

  const title = v('privacy_title', 'Privacy Policy');
  const lastUpdated = v('privacy_last_updated');
  const body = v('privacy_body');

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black mb-2">{title}</h1>
      {lastUpdated && (
        <p className="text-sm text-muted-foreground mb-10">Last updated: {lastUpdated}</p>
      )}
      {/* whitespace-pre-wrap preserves line breaks from the admin editor */}
      <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap leading-relaxed">
        {body}
      </div>
    </main>
  );
}
