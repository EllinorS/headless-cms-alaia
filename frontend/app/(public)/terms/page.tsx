import type { Metadata } from 'next';
import { getPageContent, readContent } from '@/lib/get-page-content';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for ALAIA Surf Coach.',
};

export default async function TermsPage() {
  const c = await getPageContent('terms');
  const { v } = readContent(c);

  const title = v('terms_title', 'Terms & Conditions');
  const lastUpdated = v('terms_last_updated');
  const body = v('terms_body');

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-black mb-2">{title}</h1>
      {lastUpdated && (
        <p className="text-sm text-muted-foreground mb-10">Last updated: {lastUpdated}</p>
      )}
      <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap leading-relaxed">
        {body}
      </div>
    </main>
  );
}