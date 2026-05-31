import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ImageTextBlockProps {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  content: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  buttonText?: string;
  buttonHref?: string;
  sectionClassName?: string;
}

export default function ImageTextBlock({
  title,
  eyebrow,
  subtitle,
  content,
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  buttonText,
  buttonHref,
  sectionClassName,
}: ImageTextBlockProps) {
  return (
    <section className={`py-16 md:py-24 ${sectionClassName ? ` ${sectionClassName}` : ''}`}>
      <div className="container mx-auto px-6">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${
          imagePosition === 'left' ? 'md:grid-flow-dense' : ''
        }`}>

          {/* Text */}
          <div className={imagePosition === 'left' ? 'md:col-start-2' : ''}>
            {eyebrow && (
              <p className="eyebrow text-primary mb-4">
                {eyebrow}
              </p>
            )}
            <h2 className="heading-xl mb-4">{title}</h2>
            {subtitle && <p className="text-xl mb-6">{subtitle}</p>}
            <p className="leading-relaxed mb-8">{content}</p>
            {buttonText && buttonHref && (
              <Button asChild size="lg">
                <Link href={buttonHref}>{buttonText}</Link>
              </Button>
            )}
          </div>

          {/* Image or video */}
          <div className={imagePosition === 'left' ? 'md:col-start-1 md:row-start-1' : ''}>
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}