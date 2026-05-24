import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { DomainImage } from '@/domain/shared/image.types';

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}

type ImageSizing =
  | { width: number; height: number; sizes?: string; fill?: never }
  | {
      fill: true;
      sizes: string;
      width?: never;
      height?: never;
      targetWidth?: number;
      targetHeight?: number;
      targetAspectRatio?: number;
    };

const IMAGE_FIT = {
  crop: 'crop',
  clip: 'clip',
  fill: 'fill',
  fillmax: 'fillmax',
  max: 'max',
  scale: 'scale',
  min: 'min',
} as const;

type ImageFit = (typeof IMAGE_FIT)[keyof typeof IMAGE_FIT];

type GetImagePropsOptions = ImageSizing & {
  fit?: ImageFit;
  className?: string;
};

export type SafeImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
} & ({ width: number; height: number } | { fill: true });

const isValidUrl = (value?: string) => {
  if (!value) return false;
  const trimmed = value.trim();
  return trimmed.length > 0;
};

const getFillTargetSize = (
  options: Extract<ImageSizing, { fill: true }>,
): { width: number; height: number } | null => {
  if (options.targetWidth && options.targetHeight) {
    return { width: options.targetWidth, height: options.targetHeight };
  }

  if (options.targetWidth && options.targetAspectRatio) {
    return {
      width: options.targetWidth,
      height: Math.round(options.targetWidth / options.targetAspectRatio),
    };
  }

  if (options.targetHeight && options.targetAspectRatio) {
    return {
      width: Math.round(options.targetHeight * options.targetAspectRatio),
      height: options.targetHeight,
    };
  }

  return null;
};

export const getImageProps = (
  image: DomainImage | null | undefined,
  options: GetImagePropsOptions,
): SafeImageProps | null => {
  if (!image) return null;

  const sanityAsset = image.sanity?.asset;
  const hasSanityRef = Boolean(sanityAsset?._ref || sanityAsset?._id);
  const hasSanityUrl = isValidUrl(sanityAsset?.url);

  let src: string | null = null;

  if (hasSanityRef) {
    const baseSource = image.sanity;

    if (baseSource) {
      const built = urlFor(baseSource as SanityImageSource);
      if (options.fill) {
        const targetSize = getFillTargetSize(options);
        const withTargetSize = targetSize
          ? built.width(targetSize.width).height(targetSize.height)
          : built;

        src = targetSize
          ? withTargetSize.fit(options.fit ?? IMAGE_FIT.crop).url()
          : withTargetSize.url();
      } else {
        src = built
          .width(options.width)
          .height(options.height)
          .fit(options.fit ?? IMAGE_FIT.crop)
          .url();
      }
    }
  }

  if (!src && hasSanityUrl) {
    src = sanityAsset?.url?.trim() ?? null;
  }

  if (!src && isValidUrl(image.url)) {
    src = image.url!.trim();
  }

  if (!src) return null;

  const base = {
    src,
    alt: image.alt,
    className: options.className,
    sizes: options.sizes,
  };

  return options.fill
    ? { ...base, fill: true }
    : { ...base, width: options.width, height: options.height };
}
