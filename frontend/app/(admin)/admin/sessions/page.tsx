import SessionEditor from './_components/SessionEditor';
import { getPageContent, readContent } from '@/lib/get-page-content';

export default async function SessionsPage() {
  const c = await getPageContent('global');
  const { v } = readContent(c);

  // Map each session type to its CMS-managed default price
  const defaultPrices: Record<string, number> = {
    'Group - Adults': Number(v('global_price_group_adults')) || 0,
    'Group - Kids':   Number(v('global_price_group_kids'))   || 0
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Sessions</h1>
        <p className="text-muted-foreground mt-1">Manage upcoming surf lesson sessions</p>
      </div>
      <div className="bg-background rounded-lg border px-4 py-3">
        <SessionEditor defaultPrices={defaultPrices} />
      </div>
    </div>
  );
}
