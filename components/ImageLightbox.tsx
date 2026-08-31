'use client';

import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from './ui/dialog';
import { XIcon, ZoomInIcon } from 'lucide-react';

import OptimizedImage from './OptimizedImage';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type { SafeImageProps } from '@/sanity/lib/image';

interface ImageLightboxProps {
  thumbnail: SafeImageProps;
  full: SafeImageProps;
  className?: string;
}

export const ImageLightbox = ({ thumbnail, full, className }: ImageLightboxProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      {/* Thumbnail - clickable image */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'group relative block w-full cursor-zoom-in overflow-hidden rounded-xl',
          'ring-1 ring-black/5 transition-all duration-300',
          'hover:ring-primary/20 hover:shadow-lg hover:shadow-black/5',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className,
        )}
      >
        <OptimizedImage
          src={thumbnail.src}
          alt={thumbnail.alt}
          width={'width' in thumbnail ? thumbnail.width : 0}
          height={'height' in thumbnail ? thumbnail.height : 0}
          sizes={thumbnail.sizes ?? '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px'}
          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          style={{ width: '100%', height: 'auto' }}
        />
        {/* Hover overlay with zoom icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/10">
          <div className="flex size-12 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            <ZoomInIcon className="size-5 text-foreground" />
          </div>
        </div>
      </button>

      {/* Lightbox dialog */}
      <DialogPortal>
        <DialogOverlay
          onClick={() => setOpen(false)}
          className="cursor-zoom-out bg-black/90 backdrop-blur-sm"
        />
        <div
          onClick={() => setOpen(false)}
          className={cn(
            'fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center p-4 sm:p-8',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          )}
        >
          <DialogTitle className="sr-only">{full.alt}</DialogTitle>

          {/* Close button - fixed position, always visible */}
          <DialogClose
            className={cn(
              'fixed ring-4 top-4 z-50 flex size-10 items-center justify-center rounded-full',
              'bg-white/10 text-white backdrop-blur-sm transition-colors',
              'hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white',
            )}
          >
            <XIcon className="size-5" />
            <span className="sr-only">Tanca la imatge</span>
          </DialogClose>

          {/* Full size image */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-[90vw] cursor-default"
          >
            <OptimizedImage
              src={full.src}
              alt={full.alt}
              width={'width' in full ? full.width : 0}
              height={'height' in full ? full.height : 0}
              sizes={full.sizes ?? '90vw'}
              className="h-auto max-h-[90vh] w-auto max-w-[90vw] rounded-lg object-contain shadow-2xl"
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
          </div>

          {/* Click hint */}
          <p className="fixed bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
            Clica fora de la imatge o a la X per tancar
          </p>
        </div>
      </DialogPortal>
    </Dialog>
  );
};
