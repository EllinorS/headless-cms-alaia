import Link from 'next/link';
import Navbar from '@/components/web/layout/Navbar';
import Footer from '@/components/web/layout/Footer';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center min-h-[70vh] text-center px-6 py-24">
        <p className="text-8xl font-black text-primary mb-6">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-muted-foreground max-w-md mb-10">
          Looks like this wave has already broken. The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Button asChild size="lg">
          <Link href="/">Back to home</Link>
        </Button>
      </main>
      <Footer />
    </>
  );
}
