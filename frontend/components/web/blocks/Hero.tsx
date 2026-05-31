import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { isVideo } from '@/lib/utils';

type HeroProps = {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  primaryButton?: { text: string; href: string; show: boolean };
  secondaryButton?: { text: string; href: string; show: boolean };
  overlay?: boolean;
  size?: 'full' | 'medium';
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  primaryButton,
  secondaryButton,
  overlay = true,
  size = 'full'
}: HeroProps) {
  return (
    <section className={`relative w-full overflow-hidden ${size === 'medium' ? 'h-80 md:h-96' : 'h-screen'}`}>
      {/* Background — image or video */}
      {backgroundImage && isVideo(backgroundImage) ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={backgroundImage} type="video/mp4" />
        </video>
      ) : backgroundImage ? (
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      ) : null}

      {overlay && <div className="absolute inset-0 bg-black/40" />}

      <div className={`relative z-10 flex h-full items-end justify-center px-6 ${size === 'medium' ? 'pb-8' : 'pb-30'}`}>
        <div className="max-w-4xl text-center text-white">
          <h1 className="mb-6 text-4xl sm:text-5xl font-black leading-tight md:text-7xl">{title}</h1>
          {subtitle && (
            <p className="mb-8 text-lg md:text-xl opacity-90">{subtitle}</p>
          )}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {primaryButton?.show && (
              <Button asChild size="lg">
                <Link href={primaryButton.href}>{primaryButton.text}</Link>
              </Button>
            )}
            {secondaryButton?.show && (
              <Button asChild size="lg" variant="glass"              >
                <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}