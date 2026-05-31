import Link from 'next/link';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import NavbarMobileMenu from './NavbarMobileMenu';


const Navbar = () => {
  return (
    <nav className="fixed top-4 sm:top-6 left-1/2 z-50 w-[94%] sm:w-[92%] max-w-6xl -translate-x-1/2
      flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3
      rounded-md border border-white/20 bg-white/20 backdrop-blur-xl
      shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300">

      <Link href="/">
        <Image src="/assets/alaia-surf-coach-logo-green.svg" alt="ALAIA Surf Coach" width={120} height={23} priority className="h-10 w-auto dark:hidden" />
        <Image src="/assets/alaia-surf-coach-logo-white.svg" alt="ALAIA Surf Coach" width={120} height={23} className="h-10 w-auto hidden dark:block" />
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link href="/about">About</Link>
        <Link href="/surf-in-new-zealand">Surf in NZ</Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1">
            Book <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white/20 backdrop-blur-xl">
            <DropdownMenuItem asChild>
              <Link href="/book-surf-lesson">Book a lesson</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/surf-trip-request">Request a surf trip</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/contact">Contact</Link>
        <ThemeToggle />
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center gap-2">
        <ThemeToggle />
        <NavbarMobileMenu />
      </div>
    </nav>
  )
}

export default Navbar
