'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function NavbarMobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-6xl
          rounded-md border border-border bg-background backdrop-blur-xl
          shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-4 md:hidden">
          <div className="flex flex-col gap-1 text-sm font-medium">
            <Link href="/about" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors">About</Link>
            <Link href="/surf-in-new-zealand" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors">Surf in NZ</Link>
            <Link href="/book-surf-lesson" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors">Book a lesson</Link>
            <Link href="/surf-trip-request" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors">Request a surf trip</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors">Contact</Link>
          </div>
        </div>
      )}
    </>
  );
}