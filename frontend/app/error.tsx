'use client';

import { useEffect } from 'react';
import Navbar from '@/components/web/layout/Navbar';
import Footer from '@/components/web/layout/Footer';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center min-h-[70vh] text-center px-6 py-24">
        <p className="text-8xl font-black text-primary mb-6">Oops</p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-muted-foreground max-w-md mb-10">
          A wipeout on our end. Try again and it should sort itself out.
        </p>
        <Button onClick={reset} size="lg">Try again</Button>
      </main>
      <Footer />
    </>
  );
}
