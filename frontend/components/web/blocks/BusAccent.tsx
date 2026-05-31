import Image from 'next/image';

type BusColor = 'black' | 'blue' | 'green' | 'white' | 'yellow';

type BusAccentProps = {
  color?: BusColor;
  side?: 'left' | 'right';
  width?: number;
  className?: string;
}

export function BusAccent({ color = 'green', side = 'right', width = 280, className = '' }: BusAccentProps) {
  const height = Math.round(width * (130 / 192.51));
  return (
    <div
      aria-hidden
      className={`absolute bottom-0 pointer-events-none select-none
        ${side === 'right' ? 'right-0 translate-x-1/3' : 'left-0 -translate-x-1/3'}
        ${className}`}
    >
      <Image
        src={`/assets/alaia-surf-coach-bus-${color}.svg`}
        alt=""
        width={width}
        height={height}
      />
    </div>
  );
}
