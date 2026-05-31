import Image from 'next/image';

type NzVariant = 'full' | 'line';
type NzFullColor = 'blue' | 'green' | 'white';
type NzLineColor = 'black' | 'blue' | 'green' | 'yellow';

type NzAccentProps = {
  variant?: NzVariant;
  color?: NzFullColor | NzLineColor;
  side?: 'left' | 'right';
  width?: number;
  className?: string;
}

// SVG viewBox: 1536 × 2000
export function NzAccent({
  variant = 'line',
  color = 'green',
  side = 'left',
  width = 280,
  className = '',
}: NzAccentProps) {
  const height = Math.round(width * (2000 / 1536));
  return (
    <div
      aria-hidden
      className={`absolute pointer-events-none select-none
        ${side === 'right' ? 'right-0' : 'left-0'}
        ${className}`}
    >
      <Image
        src={`/assets/alaia-surf-coach-nz-${variant}-${color}.svg`}
        alt=""
        width={width}
        height={height}
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
}
