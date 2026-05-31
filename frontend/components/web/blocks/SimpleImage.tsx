import Image from 'next/image';

type SimpleImageProps = {
  src: string;
  alt: string;
  // Only these 4 values are accepted — TypeScript will error on anything else
  aspectRatio?: 'square' | 'video' | 'wide' | 'portrait';
  className?: string;
};

// Maps each ratio name to its Tailwind class
const aspectRatios = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[21/9]',
  portrait: 'aspect-[3/4]',
};

export default function SimpleImage({ src, alt, aspectRatio = 'video', className = '' }: SimpleImageProps) {
  return (
    // Parent div controls the dimensions via aspect ratio, Image fills it with object-cover
    <div className={`relative ${aspectRatios[aspectRatio]} rounded-2xl overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}