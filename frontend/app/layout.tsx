import type { Metadata } from 'next';
import '@/app/globals.css';
import { Poppins, Rubik } from "next/font/google"
import { ThemeProvider } from '@/components/ui/theme-provider';
import { PageLoader } from '@/components/web/layout/PageLoader';
import { Toaster } from 'sonner';

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
})

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["900"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001'),
  title: {
    default: 'ALAIA Surf Coach | Raglan, New Zealand',
    template: '%s | ALAIA Surf Coach',
  },
  description: 'Professional surf lessons, private coaching and custom surf road trips in Raglan, New Zealand. Group sessions, packages and personalised coaching for all levels.',
  keywords: ['surf lessons Raglan', 'surf coach New Zealand', 'group surf lessons', 'private surf lessons', 'surf road trip NZ', 'learn to surf Raglan'],
  authors: [{ name: 'ALAIA Surf Coach' }],
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    siteName: 'ALAIA Surf Coach',
    title: 'ALAIA Surf Coach | Raglan, New Zealand',
    description: 'Professional surf lessons and custom surf road trips in Raglan, New Zealand.',
    images: [{ url: '/assets/surfer-ocean-new-zealand.webp', width: 1200, height: 630, alt: 'Surfer riding a wave in Raglan, New Zealand' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALAIA Surf Coach | Raglan, New Zealand',
    description: 'Professional surf lessons and custom surf road trips in Raglan, New Zealand.',
    images: ['/assets/surfer-ocean-new-zealand.webp'],
  },
  icons: {
    icon: '/assets/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.alaiasurf.co.nz/#organization',
      name: 'ALAIA Surf Coach',
      url: 'https://www.alaiasurf.co.nz',
      logo: 'https://www.alaiasurf.co.nz/assets/alaia-surf-coach-logo-green.svg',
      sameAs: [],
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.alaiasurf.co.nz/#business',
      name: 'ALAIA Surf Coach',
      description: 'Professional surf lessons, private coaching and custom surf road trips in Raglan, New Zealand.',
      url: 'https://www.alaiasurf.co.nz',
      image: 'https://www.alaiasurf.co.nz/assets/surfer-ocean-new-zealand.webp',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Raglan',
        addressRegion: 'Waikato',
        addressCountry: 'NZ',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -37.8009,
        longitude: 174.8860,
      },
      priceRange: '$60–$250',
      currenciesAccepted: 'NZD',
      paymentAccepted: 'Cash, Credit Card',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${poppins.variable} ${rubik.variable} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PageLoader />
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
