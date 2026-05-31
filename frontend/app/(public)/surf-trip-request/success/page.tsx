import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Request Sent',
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="flex justify-center mb-6">
          <div className="icon-circle">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-black mb-4">Request sent!</h1>
        <p className="text-muted-foreground mb-8">
          Thanks for completing the quiz. We&apos;ll review your answers and get back to you shortly with your custom surf trip plan.
        </p>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}