'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CameraSnapshotProps {
  src: string;
  alt: string;
  position?: string;
  fit?: 'cover' | 'contain';
  className?: string;
}

export default function CameraSnapshot({
  src,
  alt,
  position,
  fit = 'cover',
  className,
}: CameraSnapshotProps) {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <div className={cn('relative aspect-video overflow-hidden bg-muted', className)}>
      {unavailable ? (
        <p className="absolute inset-0 grid place-items-center px-4 text-center text-sm text-muted-foreground">
          Imatge no disponible
        </p>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          // Let the provider control caching for the latest capture.
          unoptimized
          style={{ objectFit: fit, objectPosition: position }}
          onError={() => setUnavailable(true)}
        />
      )}
    </div>
  );
}
