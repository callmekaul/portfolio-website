'use client';

import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';

interface BentoImageGridProps {
  images: string[];
  alt: string;
  onImageClick: (index: number) => void;
}

// Grid span definitions per layout: [colSpan, rowSpan]
const LAYOUTS: Record<number, [number, number][]> = {
  1: [[4, 2]],
  2: [[2, 2], [2, 2]],
  3: [[2, 2], [2, 1], [2, 1]],
  4: [[2, 2], [2, 1], [1, 1], [1, 1]],
  5: [[2, 2], [1, 1], [1, 1], [1, 1], [1, 1]],
};

const MOBILE_LAYOUTS: Record<number, [number, number][]> = {
  1: [[2, 2]],
  2: [[2, 1], [2, 1]],
  3: [[2, 1], [1, 1], [1, 1]],
  4: [[2, 1], [1, 1], [1, 1], [2, 1]],
};

export default function BentoImageGrid({ images, alt, onImageClick }: BentoImageGridProps) {
  const isMobile = useIsMobile();
  if (!images.length) return null;

  const maxVisible = isMobile ? 4 : 5;
  const visibleCount = Math.min(images.length, maxVisible);
  const extraCount = images.length - maxVisible + 1; // +1 because the last slot is covered
  const hasOverflow = images.length > maxVisible;

  const layouts = isMobile ? MOBILE_LAYOUTS : LAYOUTS;
  const spans = layouts[visibleCount] ?? layouts[maxVisible]!;

  const cols = isMobile ? 2 : 4;

  return (
    <div
      className="grid gap-2"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: 'repeat(2, 1fr)',
        height: isMobile ? 200 : 280,
      }}
    >
      {spans.map(([colSpan, rowSpan], i) => {
        const isLastSlot = hasOverflow && i === visibleCount - 1;
        const clickIndex = isLastSlot ? maxVisible - 1 : i;

        return (
          <button
            key={i}
            onClick={() => onImageClick(clickIndex)}
            className="group relative overflow-hidden rounded-xl focus:outline-none"
            style={{
              gridColumn: `span ${colSpan}`,
              gridRow: `span ${rowSpan}`,
            }}
          >
            <Image
              src={images[i]}
              alt={`${alt} screenshot ${i + 1}`}
              fill
              sizes={
                colSpan >= 2
                  ? '(max-width: 767px) 100vw, 50vw'
                  : '(max-width: 767px) 50vw, 25vw'
              }
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />

            {/* "+N" overflow overlay */}
            {isLastSlot && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <span className="text-lg font-semibold text-white/90">
                  +{extraCount}
                </span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
