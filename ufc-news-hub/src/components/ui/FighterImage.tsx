'use client';

import { useState } from 'react';
import Image from 'next/image';

interface FighterImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  fallbackInitials?: string;
}

/**
 * Smart image component for fighter photos.
 * UFC.com CDN blocks server-side requests (Next.js image proxy gets 403).
 * For UFC URLs we use plain <img> so the browser loads directly.
 * If any image fails (403/404), shows initials fallback.
 */
export default function FighterImage({ src, alt, fill, width, height, sizes, className, priority, fallbackInitials }: FighterImageProps) {
  const isInvalidUrl = !src.startsWith('http');
  const [failed, setFailed] = useState(isInvalidUrl);

  if (failed) {
    // Show initials fallback
    const initials = fallbackInitials || alt.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
    if (fill) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3a1c1c] via-[#2a2a2a] to-[#1a1a2e]" style={{ position: 'absolute', inset: 0 }}>
          <span className="text-2xl sm:text-3xl font-bold text-white/40 select-none">{initials}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center bg-gradient-to-br from-[#3a1c1c] via-[#2a2a2a] to-[#1a1a2e] rounded-full" style={{ width: width || 40, height: height || 40 }}>
        <span className="text-sm font-bold text-white/40 select-none">{initials}</span>
      </div>
    );
  }

  const isUfcUrl = src.includes('ufc.com');

  if (isUfcUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setFailed(true)}
        style={fill ? {
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top',
        } : {
          objectFit: 'cover',
          objectPosition: 'top',
        }}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
